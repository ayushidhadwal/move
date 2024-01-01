import React, {FC} from 'react';
import {Box, HStack} from 'native-base';
import {Colors} from '../../../../../styles';
import {Star} from '../../../../../component/svg';

type Props = {
  width: number;
  height: number;
  rating: number;
};

export const Stars: FC<Props> = ({width, height, rating}) => {
  return (
    <Box>
      {rating === 5 ? (
        <HStack>
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
        </HStack>
      ) : rating === 4 ? (
        <HStack>
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={'#fff'} />
        </HStack>
      ) : rating === 3 ? (
        <HStack>
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
        </HStack>
      ) : rating === 2 ? (
        <HStack>
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
        </HStack>
      ) : rating === 1 ? (
        <HStack>
          <Star width={width} height={height} color={Colors.yellow} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
        </HStack>
      ) : rating === 0 ? (
        <HStack>
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
          <Star width={width} height={height} color={'#fff'} />
        </HStack>
      ) : null}
    </Box>
  );
};
