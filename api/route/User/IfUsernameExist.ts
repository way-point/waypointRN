import {fetcher} from '../../config/fetcher';

const uidFind = fetcher
  .path('/api/user/ifUsernameExist')
  .method('get')
  .create();

const IfUsernameExist = (username: string) => {
  return uidFind({username})
    .then(response => {
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
};

export default IfUsernameExist;
