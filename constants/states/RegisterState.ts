import {actions, createMachine} from 'xstate';
import auth from '@react-native-firebase/auth';
import {configureFetcher} from '../../api/config/fetcher';
import UidFind from '../../api/route/User/UidFind';

const initialContext = {
  email: '',
  password: '',
  confirmPassword: '',
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

const RegisterMachine = createMachine(
  {
    context: initialContext,
    predictableActionArguments: true,
    id: 'RegisterMachine',
    initial: 'dataEntry',
    states: {
      dataEntry: {
        on: {
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
        },
      },
      errors: {
        initial: 'authFailed',
        states: {
          invalidEmail: {},
          emailAlreadyInUse: {},
          invalidPassword: {},
          passwordsNotMatch: {},
          authFailed: {},
        },
        on: {
          ENTER_EMAIL: {
            target: 'dataEntry',
            actions: 'cacheEmail',
          },
          ENTER_PASSWORD: {
            target: 'dataEntry',
            actions: 'cachePassword',
          },
          ENTER_CONFIRM_PASSWORD: {
            target: 'dataEntry',
            actions: 'cacheConfirmPassword',
          },
        },
      },
      attachUsername: {},
      emailVerify: {},
      signedIn: {},
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
              target: 'dataEntry',
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
              target: 'dataEntry',
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
      authenticating: ctx => {
        return authenticate(ctx.email, ctx.password)
          .then(() => {
            if (auth().currentUser && !auth().currentUser?.emailVerified) {
              Promise.resolve('email-not-verified');
            }
            UidFind(auth().currentUser?.uid || '').then(res => {
              if (res === true) {
                // go to home page
                Promise.resolve('uidFind/username-found');
              }
              if (res === false) {
                // go to username page
                Promise.resolve('uidFind/username-not-found');
              } else {
                // unexpected validation/service error
                Promise.reject(0);
              }
            });
          })
          .catch(err => {
            return Promise.reject(err.code);
          });
      },
    },
  },
);

export default RegisterMachine;
