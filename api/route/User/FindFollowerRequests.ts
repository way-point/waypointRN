import {configureFetcher, fetcher} from '../../config/fetcher';

const FindFollowerRequests = fetcher
  .path('/api/user/findFollowerRequests')
  .method('post')
  .create();

const findFollowerRequests = (date: string | undefined) => {
  return configureFetcher().then(() => {
    return FindFollowerRequests({date})
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e instanceof FindFollowerRequests.Error) {
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

export default findFollowerRequests;
