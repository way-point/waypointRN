import {paths} from '../../api/generated/schema';
import {Fetcher} from 'openapi-typescript-fetch';
import auth from '@react-native-firebase/auth';

export const fetcher = Fetcher.for<paths>();

export const configureFetcher = async () => {
  const jwt_token = await auth().currentUser?.getIdToken();
  fetcher.configure({
    baseUrl: 'http://100.64.16.136:8080',
    init: {
      headers: {
        authorization_bearer: jwt_token || '',
      },
    },
  });
};
