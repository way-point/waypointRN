import {actions, createMachine} from 'xstate';

interface contextProps {
  message: string;
  attachment: {
    type: '' | 'photo' | 'video';
    uri: string;
    duration: number;
  };
  eventDate: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    repeat: string[];
  };
}

const initialContext: contextProps = {
  message: '',
  attachment: {
    type: '',
    uri: '',
    duration: 0,
  },
  eventDate: {
    startDate: undefined,
    endDate: undefined,
    repeat: [],
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
          ENTER_START_DATE: {
            actions: 'cacheStartDate',
            target: 'dataEntry',
          },
          ENTER_END_DATE: {
            actions: 'cacheEndDate',
            target: 'dataEntry',
          },
          ENTER_REPEAT: {
            actions: 'cacheRepeat',
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
      cacheStartDate: actions.assign((ctx, evt: any) => ({
        eventDate: {
          startDate: evt.value.startDate,
          endDate: ctx.eventDate.endDate,
          repeat: ctx.eventDate.repeat,
        },
      })),
      cacheEndDate: actions.assign((ctx, evt: any) => ({
        eventDate: {
          startDate: ctx.eventDate.startDate,
          endDate: evt.value.endDate,
          repeat: ctx.eventDate.repeat,
        },
      })),
      cacheRepeat: actions.assign((ctx, evt: any) => ({
        eventDate: {
          startDate: ctx.eventDate.startDate,
          endDate: ctx.eventDate.endDate,
          repeat: evt.value.repeat,
        },
      })),
    },
  },
);

export default CreateEventMachine;
