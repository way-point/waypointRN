import {fetcher} from '../../config/fetcher';
import {definitions} from '../../generated/schema';
const createPost = fetcher.path('/api/post/postCreate').method('post').create();

interface PostCreateInterface {
  data: definitions['PostSchema'];
}

const PostCreate = ({data}: PostCreateInterface) => {
  return createPost(data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      if (e instanceof createPost.Error) {
        const error = e.getActualType();
        return error.data;
      }
      const err: definitions['GenericErrorSchema'] = {
        errors: ['Service Error'],
      };
      return err;
    });
};

export default PostCreate;
