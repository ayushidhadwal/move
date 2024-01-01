import React from 'react';
import {Box, Button} from 'native-base';

type Props = {
  title: string;
  onPressHandler: () => void;
  background?: boolean;
};

export const MoveButton = ({title, onPressHandler, background}: Props) => {
  return (
    <>
      {background ? (
        <Box mt={3} px={5} pt={8} pb={12} bg={'background.400'}>
          <Button
            variant={'solid'}
            w={'100%'}
            rounded={0}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}
            onPress={onPressHandler}>
            {title}
          </Button>
        </Box>
      ) : (
        <Button
          variant={'solid'}
          w={'100%'}
          rounded={0}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'md',
            color: 'primary.400',
          }}
          colorScheme={'secondary'}
          onPress={onPressHandler}>
          {title}
        </Button>
      )}
    </>
  );
};
