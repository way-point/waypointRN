import {Box, Text, useTheme} from 'native-base';
import React from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {feedDataItemProps} from '../constants/types';

const WhereTitle = ({item}: feedDataItemProps) => {
  const {colors} = useTheme();
  return (
    <Box flexDirection="row" bg="transparent">
      <Text
        mb={5}
        mr={1}
        color="constants.primary"
        maxWidth="95%"
        numberOfLines={1}>
        {item.eventDetails.where.address}
      </Text>
      <FontAwesome5
        name="map-marker-alt"
        size={15}
        color={colors.constants.primary}
      />
    </Box>
  );
};

export default WhereTitle;
