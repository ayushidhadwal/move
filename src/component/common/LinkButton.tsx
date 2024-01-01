import React from 'react';
import {Button} from 'native-base';

type Props = {
  title: string;
  onPressHandler: () => void;
};

export const LinkButton = ({title, onPressHandler}: Props) => {
  return (
    <Button
      variant="link"
      colorScheme={'yellow'}
      onPress={onPressHandler}
      _text={{
        fontFamily: 'body',
        fontWeight: '200',
        fontStyle: 'normal',
        fontSize: 'sm',
      }}>
      {title}
    </Button>
  );
};
