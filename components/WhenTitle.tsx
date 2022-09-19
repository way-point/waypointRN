import {intervalToDuration} from 'date-fns';
import {Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import {feedDataItemProps} from '../constants/types';

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
      <Text fontWeight={600} fontSize={20}>
        Expired
      </Text>
    );
  }

  if (new Date(Date.now()) >= item.eventDetails.when.startDate) {
    return (
      <Text fontWeight={600} fontSize={20}>
        Live
      </Text>
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
        <Text fontWeight={600} fontSize={20}>{`${timeLeft.minutes}:${
          timeLeft.seconds >= 10 ? timeLeft.seconds : '0' + timeLeft.seconds
        }`}</Text>
      );
    }
  }
};

export default TimeState;
