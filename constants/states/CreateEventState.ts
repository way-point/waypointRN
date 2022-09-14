import {actions, createMachine} from 'xstate';

const initialContext = {
  message: '',
  attachment: {
    type: '' as '' | 'photo' | 'video',
    uri: '',
    duration: 0,
  },
};

const CreateEventMachine = createMachine(
  {
    id: 'createEvent',
    context: initialContext,
    predictableActionArguments: true,
    initial: 'dataEntry',
    states: {
      dataEntry: {
        on: {
          ENTER_MESSAGE: {
            actions: 'cacheMessage',
            target: 'dataEntry',
          },
          ENTER_ATTACHMENT: {
            actions: 'cacheAttachment',
            target: 'dataEntry',
          },
        },
      },
    },
  },
  {
    actions: {
      cacheMessage: actions.assign((ctx, evt: any) => ({
        message: evt.value,
      })),
      cacheAttachment: actions.assign((ctx, evt: any) => ({
        attachment: {
          uri: evt.value.uri,
          type: evt.value.attachmentType,
          duration: evt.value.duration || 0,
        },
      })),
    },
  },
);

export default CreateEventMachine;
