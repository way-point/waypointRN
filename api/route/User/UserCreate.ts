import {configureFetcher, fetcher} from '../../config/fetcher';
import {definitions} from '../../generated/schema';
const createUser = fetcher.path('/api/user/userCreate').method('post').create();

const UserCreate = (username: string, profile_uri?: string) => {
  return configureFetcher().then(() => {
    return createUser({username, profile_uri})
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e instanceof createUser.Error) {
          const error = e.getActualType();
          throw error.data;
        }
        const err: definitions['GenericErrorSchema'] = {
          errors: ['Service Error'],
        };
        throw err;
      });
  });
};

export default UserCreate;
