import {fetcher} from '../../config/fetcher';
import {definitions} from '../../generated/schema';
const createUser = fetcher.path('/api/user/userCreate').method('post').create();

const UserCreate = (username: string, profile_uri?: string) => {
  return createUser({username, profile_uri})
    .then(response => {
      return response.data;
    })
    .catch(e => {
      if (e instanceof createUser.Error) {
        const error = e.getActualType();
        return error.data;
      }
      const err: definitions['GenericErrorSchema'] = {
        errors: ['Service Error'],
      };
      return err;
    });
};

export default UserCreate;
