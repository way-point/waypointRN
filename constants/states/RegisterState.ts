import {actions, createMachine} from 'xstate';

const initialContext = {
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterMachine = createMachine(
  {
    id: 'RegisterMachine',
    predictableActionArguments: true,
    context: initialContext,
    initial: 'dataEntry',
    states: {
      dataEntry: {
        on: {
          ENTER_EMAIL: {
            actions: 'cacheEmail',
            target: 'dataEntry',
          },
          ENTER_PASSWORD: {
            actions: 'cachePassword',
            target: 'dataEntry',
          },
          ENTER_CONFIRM_PASSWORD: {
            actions: 'cacheConfirmPassword',
            target: 'dataEntry',
          },
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
  },
);

export default RegisterMachine;
