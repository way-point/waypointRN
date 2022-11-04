import {paths} from '../../api/generated/schema';
import {Fetcher} from 'openapi-typescript-fetch';
import auth from '@react-native-firebase/auth';

export const fetcher = Fetcher.for<paths>();

export const configureFetcher = async () => {
  const jwt_token = await auth().currentUser?.getIdToken();
  fetcher.configure({
    baseUrl: 'http://127.0.0.1:8080',
    init: {
      headers: {
        authorization_bearer: jwt_token || '',
      },
    },
  });
};
