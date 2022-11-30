import {configureFetcher, fetcher} from '../../config/fetcher';

const unfollow = fetcher.path('/api/user/unFollow').method('post').create();

const UnFollow = (uid: string) => {
  return configureFetcher().then(() => {
    return unfollow({uid})
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e instanceof unfollow.Error) {
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

export default UnFollow;
