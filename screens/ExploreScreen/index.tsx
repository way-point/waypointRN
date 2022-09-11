import {
  Box,
  FlatList,
  Heading,
  Image,
  Pressable,
  Text,
  useTheme,
} from 'native-base';
import React from 'react';
import AvatarGroup from '../../components/AvatarGroup';
import Menu from '../../components/Menu';
import {feedDataProps, menuOptionProps} from '../../constants/types';
import feedData from '../../data/feedData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface feedDataItemProps {
  item: feedDataProps;
}

const menuOptions: menuOptionProps[] = [
  {
    onPress: () => {
      console.log('testing....');
    },
    menuAction: {title: 'Save Photo', systemIcon: 'square.and.arrow.down'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Share With...', systemIcon: 'square.and.arrow.up'},
  },
];

const ExploreScreen = () => {
  const {colors} = useTheme();
  const renderItem = ({item}: feedDataItemProps) => {
    return (
      <Box alignSelf="center" mb={5} borderRadius={10} w="90%" p={3}>
        <Heading>{item.title}</Heading>
        <Box flexDirection="row">
          <Text mb={5} mr={1} color="constants.primary">
            Santa Cruz Broadwalk
          </Text>
          <FontAwesome5
            name="map-marker-alt"
            size={15}
            color={colors.constants.primary}
          />
        </Box>
        <Box
          mb={3}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <AvatarGroup userImages={item.subscribers} />
          <Pressable bg="constants.primary" px={2} py={2} borderRadius={10}>
            <Text>Join Event</Text>
          </Pressable>
        </Box>
        <Menu menuOptions={menuOptions}>
          <Image
            source={{uri: item.image}}
            alt={item.host.username + ' image'}
            w="100%"
            borderRadius={10}
            resizeMode="cover"
            height={200}
            alignSelf="center"
          />
        </Menu>
      </Box>
    );
  };

  return (
    <FlatList
      data={feedData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ExploreScreen;
