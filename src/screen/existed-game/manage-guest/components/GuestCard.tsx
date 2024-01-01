import React, {FC} from 'react';
import {HStack, Image, Pressable, Text} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';

import {Trophy} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import {useTranslation} from 'react-i18next';

type GuestCardType = {
  index: number;
  guestName: string;
  id: number;
  img: ImageSourcePropType;
  matchReward: number;
  onPressHandler: (id: number) => void;
  selectedPlayerList: number[];
};

const WIDTH = Dimensions.get('screen').width;

export const GuestCard: FC<GuestCardType> = ({
  index,
  id,
  guestName,
  img,
  matchReward,
  onPressHandler,
  selectedPlayerList,
}) => {
  const {t} = useTranslation();
  return (
    <Pressable
      onPress={() => onPressHandler(id)}
      bg={selectedPlayerList.includes(id) ? 'yellow.400' : 'background.400'}
      mb={5}
      w={WIDTH - 40}
      borderColor={'yellow.400'}
      borderWidth={selectedPlayerList.includes(id) ? 1 : 0}
      alignSelf={'center'}
      mt={index === 0 ? 5 : 0}>
      <HStack alignItems={'center'} p={2}>
        <Image
          alt={'no img'}
          rounded={100}
          source={img}
          w={44}
          h={44}
          resizeMode={'cover'}
        />
        <Text
          fontFamily={'body'}
          fontSize={'sm'}
          fontWeight={'200'}
          fontStyle={'normal'}
          ml={2}
          color={selectedPlayerList.includes(id) ? 'primary.400' : 'white'}>
          {guestName}
        </Text>
      </HStack>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={selectedPlayerList.includes(id) ? 'primary.400' : '#263C59'}
        p={2}>
        <HStack>
          <Trophy
            height={15}
            width={15}
            color={selectedPlayerList.includes(id) ? 'white' : Colors.secondary}
          />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {t('Player of the match award')}- {matchReward}
          </Text>
        </HStack>
        <Text
          color={selectedPlayerList.includes(id) ? 'white' : 'secondary.400'}
          fontSize={'xs'}
          ml={1}>
          {t('View profile')}
        </Text>
      </HStack>
    </Pressable>
  );
};
