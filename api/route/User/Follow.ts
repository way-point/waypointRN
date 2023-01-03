import {configureFetcher, fetcher} from '../../config/fetcher';

const followBack = fetcher.path('/api/user/follow').method('post').create();

const Follow = (uid: string) => {
  return configureFetcher().then(() => {
    return followBack({uid})
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e instanceof followBack.Error) {
          const error = e.getActualType();
          throw error.data;
        }
        const err = {
          errors: ['Service Error'],
        };
        throw err;
      });
  });
};

export default Follow;
