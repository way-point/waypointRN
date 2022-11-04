import {fetcher} from '../../config/fetcher';
import {definitions} from '../../generated/schema';
const createUser = fetcher.path('/api/user/userCreate').method('post').create();

const UserCreate = (username: string) => {
  createUser({username})
    .then(response => {
      return response;
    })
    .catch(e => {
      if (e instanceof createUser.Error) {
        const error = e.getActualType();
        return error;
      }
      const err: definitions['GenericErrorSchema'] = {
        errors: ['Service Error'],
      };
      return err;
    });
};

export default UserCreate;
