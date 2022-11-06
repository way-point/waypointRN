import {actions, assign, createMachine} from 'xstate';
import auth from '@react-native-firebase/auth';
import {configureFetcher} from '../../api/config/fetcher';
import UidFind from '../../api/route/User/UidFind';

const initialContext = {
  email: '',
  password: '',
  confirmPassword: '',
};

// All possible actions that can be done by user
// under both login and register screens.
const act = {
  ENTER_EMAIL: {
    target: 'dataEntry',
    actions: 'cacheEmail',
    internal: false,
  },
  ENTER_PASSWORD: {
    target: 'dataEntry',
    actions: 'cachePassword',
    internal: false,
  },
  ENTER_CONFIRM_PASSWORD: {
    target: 'dataEntry',
    actions: 'cacheConfirmPassword',
    internal: false,
  },
  RESET: {
    target: 'dataEntry',
    actions: assign(() => {
      return initialContext;
    }),
  },
  ENTER_SUBMIT_LOGIN: [
    {
      target: '#RegisterMachine.errors.invalidEmail',
      cond: 'checkEmail',
    },
    {
      target: '#RegisterMachine.errors.invalidPassword',
      cond: 'checkPassword',
    },
    {
      target: 'authenticating_login',
    },
  ],
  ENTER_SOCIAL_PROVIDER: {
    target: 'checkIfUserExists',
  },
  ENTER_SUBMIT: [
    {
      target: '#RegisterMachine.errors.invalidEmail',
      cond: 'checkEmail',
    },
    {
      target: '#RegisterMachine.errors.invalidPassword',
      cond: 'checkPassword',
    },
    {
      target: '#RegisterMachine.errors.passwordsNotMatch',
      cond: 'checkPasswordsMatch',
    },
    {
      target: 'authenticating',
    },
  ],
};

// taken from https://www.w3resource.com/javascript/form/email-validation.php
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const authenticate = (email: string, password: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      configureFetcher();
      return Promise.resolve(1);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const authenticate_login = (email: string, password: string) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      configureFetcher();
      return Promise.resolve(1);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const RegisterMachine = createMachine(
  {
    context: initialContext,
    predictableActionArguments: true,
    id: 'RegisterMachine',
    initial: 'dataEntry',
    states: {
      dataEntry: {
        on: act,
      },
      errors: {
        initial: 'authFailed',
        states: {
          invalidEmail: {},
          emailAlreadyInUse: {},
          userDisabled: {},
          userNotFound: {},
          invalidPassword: {},
          wrongPassword: {},
          passwordsNotMatch: {},
          authFailed: {},
        },
        on: act,
      },
      attachUsername: {
        on: {
          SIGN_IN: {target: '#RegisterMachine.signedIn'},
        },
      },
      emailVerify: {
        on: {
          ENTER_VERIFY: [
            {
              cond: () => auth().currentUser?.emailVerified || false,
              target: 'checkIfUserExists',
            },
          ],
        },
      },
      signedIn: {
        on: {
          RESET: {
            target: 'dataEntry',
            actions: assign(() => {
              return initialContext;
            }),
          },
        },
      },
      checkIfUserExists: {
        invoke: {
          src: 'checkIfUserExists',
          onDone: [
            {
              cond: (_, event) => {
                console.log(event);
                return event.data === 'email-not-verified';
              },
              target: '#RegisterMachine.emailVerify',
            },
            {
              cond: (_, event) => {
                return event.data === 'uidFind/username-not-found';
              },
              target: '#RegisterMachine.attachUsername',
            },
            {
              cond: (_, event) => {
                return event.data === 'uidFind/username-found';
              },
              target: '#RegisterMachine.signedIn',
            },
            {
              cond: (_, event) => {
                return event.data === 'service-error';
              },
              target: '#RegisterMachine.errors.authFailed',
            },
          ],
        },
      },
      authenticating_login: {
        invoke: {
          src: 'authenticating_login',
          onDone: [
            {
              cond: (_, event) => {
                console.log(event);
                return event.data === 'email-not-verified';
              },
              target: '#RegisterMachine.emailVerify',
            },
            {
              target: 'checkIfUserExists',
            },
          ],
          onError: [
            {
              cond: (_, event) => {
                return event.data === 'auth/invalid-email';
              },
              target: '#RegisterMachine.errors.invalidEmail',
            },
            {
              cond: (_, event) => {
                return event.data === 'auth/user-disabled';
              },
              target: '#RegisterMachine.errors.userDisabled',
            },
            {
              cond: (_, event) => {
                return event.data === 'auth/user-not-found';
              },
              target: '#RegisterMachine.errors.userNotFound',
            },
            {
              cond: (_, event) => {
                return event.data === 'auth/wrong-password';
              },
              target: '#RegisterMachine.errors.wrongPassword',
            },
            {
              target: '#RegisterMachine.errors.authFailed',
            },
          ],
        },
      },
      authenticating: {
        invoke: {
          src: 'authenticating',
          onDone: [
            {
              cond: (_, event) => {
                return event.data === 'email-not-verified';
              },
              target: '#RegisterMachine.emailVerify',
            },
            {
              target: 'checkIfUserExists',
            },
          ],
          onError: [
            {
              cond: (_, event) => {
                return event.data === 'auth/email-already-in-use';
              },
              target: '#RegisterMachine.errors.emailAlreadyInUse',
            },
            {
              cond: (_, event) => {
                return event.data === 'auth/invalid-email';
              },
              target: '#RegisterMachine.errors.invalidEmail',
            },
            {
              cond: (_, event) => {
                return event.data === 'auth/weak-password';
              },
              target: '#RegisterMachine.errors.invalidPassword',
            },
            {
              target: '#RegisterMachine.errors.authFailed',
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      cacheEmail: actions.assign((ctx, evt: any) => ({
        email: evt.value,
      })),
      cachePassword: actions.assign((ctx, evt: any) => ({
        password: evt.value,
      })),
      cacheConfirmPassword: actions.assign((ctx, evt: any) => ({
        confirmPassword: evt.value,
      })),
    },
    guards: {
      checkEmail: (ctx, _) => !emailReg.test(ctx.email),
      checkPassword: (ctx, _) => ctx.password.length < 6,
      checkPasswordsMatch: (ctx, _) => ctx.confirmPassword !== ctx.password,
    },
    services: {
      checkIfUserExists: () => {
        console.log(auth().currentUser?.uid);
        return UidFind(auth().currentUser?.uid || '')
          .then(res => {
            console.log(res);
            console.log('---------');
            if ('username' in res) {
              return 'uidFind/username-found';
            } else if (
              'errors' in res &&
              res.errors?.length === 1 &&
              res.errors[0] === 'user not found'
            ) {
              return 'uidFind/username-not-found';
            }
            return 'service-error';
          })
          .catch(err => {
            console.log(err);
            return 'service-error';
          });
      },
      authenticating: ctx => {
        return authenticate(ctx.email, ctx.password)
          .then(() => {
            if (auth().currentUser && !auth().currentUser?.emailVerified) {
              auth().currentUser?.sendEmailVerification();
              return 'email-not-verified';
            }
            Promise.resolve(1);
          })
          .catch(err => {
            return Promise.reject(err.code);
          });
      },
      authenticating_login: ctx => {
        return authenticate_login(ctx.email, ctx.password)
          .then(() => {
            if (auth().currentUser && !auth().currentUser?.emailVerified) {
              auth().currentUser?.sendEmailVerification();
              return 'email-not-verified';
            }
            Promise.resolve(1);
          })
          .catch(err => {
            return Promise.reject(err.code);
          });
      },
    },
  },
);

export default RegisterMachine;
