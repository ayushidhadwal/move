import * as React from 'react';
import {Box, HStack} from 'native-base';

type Props = {
  data: any[];
  activeIndex: number;
};

export const SliderDots: React.FC<Props> = ({data, activeIndex}) => {
  return (
    <HStack
      h={8}
      w="30%"
      alignSelf={'center'}
      alignItems={'center'}
      justifyContent={'center'}
      key={activeIndex}>
      {data.map((_, index) => {
        if (index === activeIndex) {
          return (
            <Box
              bg={'secondary.400'}
              h={2}
              w={5}
              mr={1.5}
              rounded={10}
              key={index}
            />
          );
        }
        return (
          <Box
            bg={'background.300'}
            h={2}
            w={2}
            mr={1.5}
            rounded={10}
            key={index}
          />
        );
      })}
    </HStack>
  );
};
