import {fetcher} from '../../config/fetcher';
import {Cache} from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cache = new Cache({
  namespace: 'fetchUsers',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
  },
  backend: AsyncStorage,
});

const uidFind = fetcher.path('/api/user/uidFind').method('get').create();

const UidFind = async (uid: string) => {
  const value = await cache.get(uid);
  if (value === undefined) {
    return uidFind({uid})
      .then(response => {
        cache.set(uid, JSON.stringify(response.data));
        return response.data;
      })
      .catch(e => {
        if (e instanceof uidFind.Error) {
          const error = e.getActualType();
          return error.data;
        }
        const err = {
          errors: ['Service Error'],
        };
        return err;
      });
  } else {
    return JSON.parse(value);
  }
};

export default UidFind;
