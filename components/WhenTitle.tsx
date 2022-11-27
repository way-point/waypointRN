import {intervalToDuration} from 'date-fns';
import {Spinner, Text, useTheme} from 'native-base';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
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

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    t: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.constants.primary,
    },
  });

  useEffect(() => {
    if (
      new Date(Date.now()) <
      new Date(item.event_details?.time_of_event.start_time || '')
    ) {
      const intervalID = setInterval(() => {
        const data = intervalToDuration({
          start: new Date(Date.now()),
          end: new Date(item.event_details?.time_of_event.start_time || ''),
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
  }, [item?.event_details?.time_of_event.start_time]);

  if (
    new Date(Date.now()) >=
    new Date(item.event_details?.time_of_event.end_time || '')
  ) {
    return <Text style={styles.t}>Expired</Text>;
  }

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return <Spinner />;
  }

  if (
    new Date(Date.now()) >=
    new Date(item.event_details?.time_of_event.start_time || '')
  ) {
    return <Text style={styles.t}>Live</Text>;
  }

  if (timeLeft.days > 1) {
    return <Text style={styles.t}>{`${timeLeft.days} days`}</Text>;
  } else {
    if (timeLeft.hours > 1) {
      return <Text style={styles.t}>{`${timeLeft.hours} hours`}</Text>;
    } else {
      return (
        <Text style={styles.t}>{`${timeLeft.minutes}:${
          timeLeft.seconds >= 10 ? timeLeft.seconds : '0' + timeLeft.seconds
        }`}</Text>
      );
    }
  }
};

export default TimeState;
