import {ContextMenuAction} from 'react-native-context-menu-view';

export interface userImageProps {
  username: string;
  profileURL: string;
  id: string;
}

export interface menuOptionProps {
  onPress: () => void;
  menuAction: ContextMenuAction;
}
export interface feedDataProps {
  id: string;
  host: userImageProps;
  title: string;
  description: string;
  image: string;
  subscribers: userImageProps[];
}
