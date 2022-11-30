import {fetcher} from '../../config/fetcher';

const CheckRelationshipToUser = fetcher
  .path('/api/user/checkRelationshipToUser')
  .method('get')
  .create();

const checkRelationshipToUser = (uid: string) => {
  return CheckRelationshipToUser({uid})
    .then(response => {
      return response.data;
    })
    .catch(e => {
      if (e instanceof CheckRelationshipToUser.Error) {
        const error = e.getActualType();
        throw error.data;
      }
      const err = {
        errors: ['Service Error'],
      };
      throw err;
    });
};

export default checkRelationshipToUser;
