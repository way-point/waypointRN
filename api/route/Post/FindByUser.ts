import {fetcher} from '../../config/fetcher';

const findUser = fetcher.path('/api/post/findByUser').method('get').create();

const findByUser = (uid: string) => {
  return findUser({uid})
    .then(response => {
      return response.data;
    })
    .catch(e => {
      if (e instanceof findUser.Error) {
        const error = e.getActualType();
        throw error.data;
      }
      const err = {
        errors: ['Service Error'],
      };
      throw err;
    });
};

export default findByUser;
