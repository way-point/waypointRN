import {Box, Text, useTheme} from 'native-base';
import React from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {feedDataItemProps} from '../constants/types';

const WhereTitle = ({item}: feedDataItemProps) => {
  const {colors} = useTheme();
  return (
    <Box flexDirection="row" alignItems="center">
      <Box w="75%" flexDir="row">
        <Text mr={1} numberOfLines={1} color="constants.primary">
          {item.eventDetails.where.address}
        </Text>
        <FontAwesome5
          name="map-marker-alt"
          size={15}
          color={colors.constants.primary}
        />
      </Box>
    </Box>
  );
};

export default WhereTitle;
