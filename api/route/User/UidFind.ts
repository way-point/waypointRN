import {fetcher} from '../../config/fetcher';
import {definitions} from '../../generated/schema';
import auth from '@react-native-firebase/auth';

const uidFind = fetcher.path('/api/user/uidFind').method('get').create();

const UidFind = (uid: string) => {
  return uidFind({uid})
    .then(response => {
      return response.data.uid === (auth().currentUser?.uid || '');
    })
    .catch(e => {
      if (e instanceof uidFind.Error) {
        const error = e.getActualType();
        return error;
      }
      const err: definitions['GenericErrorSchema'] = {
        errors: ['Service Error'],
      };
      return err;
    });
};

export default UidFind;
