import { RouteProp, useRoute } from '@react-navigation/native';
import Comment from '../../../components/Comment';
import { ScrollView } from 'native-base';
import React from 'react';
import Post from '../../../components/Post';
import { feedDataProps } from '../../../constants/types';
import { RootStackParamList } from '../../../navigation/types';

interface EventDetailsProps {
  event: feedDataProps;
}

export const EventDetails = ({ event }: EventDetailsProps) => {
  return (
    <ScrollView bg="transparent">
      <Post item={event} />
      <Comment host_id={event.host_id as string} description={event.description} />
    </ScrollView>
  );
};

export const EventDetailsScreen = () => {
  const { event } =
    useRoute<RouteProp<RootStackParamList, 'EventDetails'>>().params;
  return <EventDetails event={event} />;
};
