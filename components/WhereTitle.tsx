import {Box, Text, useTheme} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {feedDataItemProps} from '../constants/types';
import {intervalToDuration} from 'date-fns';

interface timeLeftProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeState = ({item}: feedDataItemProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  } as timeLeftProps);

  useEffect(() => {
    if (new Date(Date.now()) < item.eventDetails.when.startDate) {
      const intervalID = setInterval(() => {
        const data = intervalToDuration({
          start: new Date(Date.now()),
          end: item.eventDetails.when.startDate,
        });
        setTimeLeft({
          days: data.days || 0,
          hours: data.hours || 0,
          minutes: data.minutes || 0,
          seconds: data.seconds || 0,
        });
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [item.eventDetails.when.startDate]);

  if (new Date(Date.now()) >= item.eventDetails.when.endDate) {
    return (
      <Box>
        <Text fontWeight={600} fontSize={20}>
          Expired
        </Text>
      </Box>
    );
  }

  if (new Date(Date.now()) >= item.eventDetails.when.startDate) {
    return (
      <Box>
        <Text fontWeight={600} fontSize={20}>
          Live
        </Text>
      </Box>
    );
  }

  if (timeLeft.days > 1) {
    return (
      <Text fontWeight={600} fontSize={20}>{`${timeLeft.days} days`}</Text>
    );
  } else {
    if (timeLeft.hours > 1) {
      return (
        <Text fontWeight={600} fontSize={20}>{`${timeLeft.hours} hours`}</Text>
      );
    } else {
      return (
        <Text
          fontWeight={600}
          fontSize={20}>{`${timeLeft.minutes}:${timeLeft.seconds}`}</Text>
      );
    }
  }
};

const WhereTitle = ({item}: feedDataItemProps) => {
  const {colors} = useTheme();
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flexDirection="row" bg="transparent">
        <Text
          mb={5}
          mr={1}
          color="constants.primary"
          maxWidth="83%"
          numberOfLines={1}>
          {item.eventDetails.where.address}
        </Text>
        <FontAwesome5
          name="map-marker-alt"
          size={15}
          color={colors.constants.primary}
        />
      </Box>
      <TimeState item={item} />
    </Box>
  );
};

export default WhereTitle;
