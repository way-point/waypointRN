import React, {useCallback, useEffect, useState} from 'react';
import checkRelationshipToUser from '../api/route/User/checkRelationshipToUser';
import Follow from '../api/route/User/Follow';
import UnFollow from '../api/route/User/UnFollow';
import {Text, Pressable, HStack, Spinner} from 'native-base';

interface StatusOfUserButtonProps {
  uid: string;
}

const StatusOfUserButton = ({uid}: StatusOfUserButtonProps) => {
  const [status, setStatus] = useState(
    'loading' as 'not following' | 'following' | 'loading',
  );

  const checkRelation = useCallback(async () => {
    const data = await checkRelationshipToUser(uid);
    if (data.status === 'could follow back') {
      setStatus('not following');
    } else {
      setStatus(data.status || status);
    }
  }, [uid, status]);

  useEffect(() => {
    checkRelation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pressable
      onPress={async () => {
        setStatus('loading');
        if (status !== 'following') {
          await Follow(uid).then(() => {
            setStatus('following');
          });
        } else {
          await UnFollow(uid).then(() => {
            setStatus('not following');
          });
        }
      }}
      my="auto"
      ml={3}
      backgroundColor={
        status === 'following' ? 'gray.700' : 'constants.primary'
      }
      h={8}
      w={20}
      _disabled={{opacity: 0.8}}
      p={1}
      borderRadius={8}>
      {status === 'loading' ? (
        <HStack backgroundColor="transparent" space={2} justifyContent="center">
          <Spinner color="white" />
        </HStack>
      ) : (
        <Text my="auto" fontSize={15} textAlign="center" color="white">
          {status === 'following' ? 'Following' : 'Follow'}
        </Text>
      )}
    </Pressable>
  );
};

export default StatusOfUserButton;
