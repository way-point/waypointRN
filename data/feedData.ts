import { feedDataProps } from '../constants/types';

const url =
  'https://media-exp1.licdn.com/dms/image/C5603AQEQZuyIujt9xA/profile-displayphoto-shrink_200_200/0/1640233246542?e=2147483647&v=beta&t=06q_FRXOtNMMPTnZmHt7CDL6g3C6tC_0erJ4JaWTNgo';

const feedData: feedDataProps[] = [
  {
    attachment: {
      attachment_type: 'photo',
      url: url,
    },
    host_id: 'Zu8GTOSxbhb1yZZ0niQz6xeWBiw1',
    description: 'testing...',
    date_created: '2022-11-23T01:11:57.082Z',
    event_details: {
      address: 'string',
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      time_of_event: {
        end_time: '2022-11-23',
        start_time: '2022-11-23T01:11:57.082Z',
      },
    },
  },
];

export default feedData;
