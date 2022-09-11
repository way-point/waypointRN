import {Box, Text, useTheme} from 'native-base';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {feedDataItemProps} from '../constants/types';

const WhereTitle = ({item}: feedDataItemProps) => {
  const {colors} = useTheme();
  return (
    <Box flexDirection="row">
      <Text mb={5} mr={1} color="constants.primary">
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
