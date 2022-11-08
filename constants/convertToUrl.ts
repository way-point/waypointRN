import storage from '@react-native-firebase/storage';

const get_url_extension = (url: string) => {
  return url.split(/[#?]/)[0].split('.').pop()?.trim() || '';
};

const convertToUrl = async (localUri: string, path: string) => {
  if (localUri.slice(-1) === '/') {
    return undefined;
  }
  const extension = get_url_extension(localUri);

  if (extension === '') {
    return undefined;
  }
  const contructedPath = path + '/' + Date.now().toString();
  const reference = storage().ref(contructedPath);
  await reference.putFile(localUri);
  const gen_url = await storage().ref(contructedPath).getDownloadURL();
  return gen_url;
};

export default convertToUrl;
