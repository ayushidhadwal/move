import React, {FC} from 'react';
import {Box, HStack, Text} from 'native-base';
import {number} from 'yup';

export type Props = {
  value: number;
};

const arr = [1, 2, 3];

export const Progress: FC<Props> = ({value}) => {
  return (
    <HStack
      w={'45%'}
      my={3}
      justifyContent={'space-between'}
      alignSelf={'center'}>
      {arr.map(m => (
        <Box
          key={m}
          w={10}
          h={10}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={100}
          borderWidth={2}
          borderColor={
            value > m
              ? 'secondary.400'
              : value === m
              ? 'yellow.400'
              : 'background.400'
          }
          bg={value === m ? 'yellow.400' : 'background.400'}
          borderStyle={value > m ? 'dashed' : 'solid'}>
          <Text
            fontFamily={'heading'}
            fontWeight={'100'}
            fontStyle={'normal'}
            fontSize={'md'}
            color={
              value === m
                ? 'primary.400'
                : value > m
                ? 'secondary.400'
                : 'white'
            }>
            {m}
          </Text>
        </Box>
      ))}
    </HStack>
  );
};
