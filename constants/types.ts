import {definitions} from '../api/generated/schema';
export interface userImageProps {
  username: string;
  profileURL?: string;
  id: string;
}

export type feedDataProps = definitions['PostSchema'];
export interface feedDataItemProps {
  item: feedDataProps;
}
