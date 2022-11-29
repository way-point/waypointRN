import {fetcher} from '../../config/fetcher';

const numFollowerAndFollowing = fetcher
  .path('/api/user/numFollowerAndFollowing')
  .method('get')
  .create();

const NumFollowerAndFollowing = (uid: string) => {
  return numFollowerAndFollowing({uid})
    .then(response => {
      return response.data;
    })
    .catch(e => {
      if (e instanceof numFollowerAndFollowing.Error) {
        const error = e.getActualType();
        throw error.data;
      }
      const err = {
        errors: ['Service Error'],
      };
      throw err;
    });
};

export default NumFollowerAndFollowing;
