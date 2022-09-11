import {feedDataProps} from '../constants/types';

const url =
  'https://media-exp1.licdn.com/dms/image/C5603AQEQZuyIujt9xA/profile-displayphoto-shrink_200_200/0/1640233246542?e=2147483647&v=beta&t=06q_FRXOtNMMPTnZmHt7CDL6g3C6tC_0erJ4JaWTNgo';

const feedData: feedDataProps[] = [
  {
    id: '1',
    host: {
      username: 'Aankur01',
      profileURL: url,
      id: '1',
    },
    eventDetails: {
      where: {
        latitude: 120,
        longitude: 120,
        address: '5923 River Creek Rd.',
      },
    },
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.lifestyleasia.com%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F11%2F03175949%2FBored-Ape-1.jpg&f=1&nofb=1',
    title: 'NFT project (Monkey Apes the sequel)',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    subscribers: [
      {
        profileURL:
          'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        username: 'Aankur01',
        id: '2',
      },
      {
        profileURL:
          'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        username: 'Aankur01',
        id: '3',
      },
      {
        profileURL:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        username: 'Susan',
        id: '45',
      },
      {
        profileURL:
          'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        username: 'among',
        id: '4345',
      },
    ],
  },
  {
    id: '2',
    host: {
      username: 'Aankur02',
      profileURL: url,
      id: '4',
    },
    eventDetails: {
      where: {
        latitude: 120,
        longitude: 120,
        address: '5923 River Creek Rd.',
      },
    },
    title: 'Skating ring near Dallas Park',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nZ9yqbFez-PvOsJSIvwn1gHaEK%26pid%3DApi&f=1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    subscribers: [{profileURL: url, username: 'Aankur01', id: '5'}],
  },
];

export default feedData;
