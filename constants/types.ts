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
  description: string;
  image?: string;
  video?: {
    uri: string;
    duration: number;
  };
  type: 'photo' | 'video';
  eventDetails: {
    where: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  subscribers: userImageProps[];
}

export interface feedDataItemProps {
  item: feedDataProps;
}
