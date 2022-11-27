import {fetcher} from '../../config/fetcher';

const uidFind = fetcher.path('/api/user/uidFind').method('get').create();

const UidFind = (uid: string) => {
  return uidFind({uid})
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

export default UidFind;
