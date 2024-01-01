import React, {FC} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {Dimensions} from 'react-native';

import {Map, MapPin} from '../../../../component/svg';
import {t} from 'i18next';

type VenueCardType = {
  index: number;
  venueName: string;
  address: string;
  distance: string;
  onPressHandler: () => void;
  value?: string;
  id?: string;
};

const WIDTH = Dimensions.get('screen').width;

export const VenueCard: FC<VenueCardType> = ({
  index,
  venueName,
  address,
  distance,
  onPressHandler,
  value,
  id,
}) => {
  return (
    <Pressable
      onPress={onPressHandler}
      bg={value === id ? 'yellow.400' : 'background.400'}
      mb={5}
      w={WIDTH - 40}
      borderColor={'yellow.400'}
      borderWidth={value === id ? 1 : 0}
      alignSelf={'center'}
      mt={index === 0 ? 5 : 0}>
      <Box p={2}>
        <Text
          textAlign={'left'}
          fontFamily={'body'}
          fontSize={'lg'}
          fontWeight={'200'}
          fontStyle={'normal'}
          color={value === id ? 'primary.400' : 'white'}>
          {venueName}
        </Text>
      </Box>

      <HStack justifyContent={'space-between'} bg={'#263C59'} p={2}>
        <HStack alignItems={'center'} width={'40%'}>
          <Map height={15} width={15} />
          <Text noOfLines={1} color={'white'} fontSize={'xs'} ml={1}>
            {address}
          </Text>
        </HStack>
        <HStack>
          <MapPin width={15} height={15} />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {distance} {t('km')}
          </Text>
        </HStack>
      </HStack>
    </Pressable>
  );
};
