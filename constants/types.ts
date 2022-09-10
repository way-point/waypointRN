export interface userImageProps {
  username: string;
  profileURL: string;
  id: string;
}

export interface feedDataProps {
  id: string;
  host: userImageProps;
  title: string;
  description: string;
  image: string;
  subscribers: userImageProps[];
}
