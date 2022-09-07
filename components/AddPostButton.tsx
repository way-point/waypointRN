import {Box, Popover, Pressable} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
// import {MenuView} from '@react-native-menu/menu';
// import {Platform} from 'react-native';

const AddPostButton = () => {
  return (
    <Box position="absolute" zIndex={1} bottom={0}>
      <Popover
        trigger={triggerProps => {
          return (
            <Pressable
              {...triggerProps}
              borderRadius={30}
              width={60}
              height={60}
              backgroundColor="constants.primary">
              <Feather
                name="plus"
                size={30}
                color="white"
                style={{
                  alignSelf: 'center',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            </Pressable>
          );
        }}>
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Delete Customer</Popover.Header>
          <Popover.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

export default AddPostButton;
