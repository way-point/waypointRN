import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {Text, useTheme} from 'native-base';
import {currentTheme} from '../constants/atoms';
import {LinkPreview} from '@flyerhq/react-native-link-preview';

interface LinkPreviewBoxProps {
  message: string;
}

const LinkPreviewBox = ({message}: LinkPreviewBoxProps) => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  const [ifShow, setIfShow] = useState(false);

  return (
    <LinkPreview
      onPreviewDataFetched={previewData => {
        setIfShow(
          previewData.description !== undefined ||
            previewData.image !== undefined,
        );
      }}
      renderDescription={description => {
        return <Text>{description}</Text>;
      }}
      renderText={text => {
        return <Text>{text}</Text>;
      }}
      renderTitle={title => {
        return (
          <Text fontWeight={600} color="constants.primary">
            {title}
          </Text>
        );
      }}
      renderHeader={header => {
        return <Text fontWeight={600}>{header}</Text>;
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
        backgroundColor: colors[currTheme].textField,
        borderRadius: 10,
        overflow: 'hidden',
        opacity: ifShow ? 1 : 0,
      }}
      enableAnimation
      text={message}
    />
  );
};

export default LinkPreviewBox;
