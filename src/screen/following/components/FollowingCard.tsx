import React, {FC} from 'react';
import {HStack, Image, Pressable, Text} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';

import {Colors} from '../../../styles';
import {Trophy} from '../../../component/svg';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

type FollowerCardType = {
  index: number;
  guestName: string;
  id: string;
  img: ImageSourcePropType;
  onClickHandler: (id: string) => void;
  matchReward: number;
  followerId: number;
};

const WIDTH = Dimensions.get('screen').width;

export const FollowingCard: FC<FollowerCardType> = ({
  index,
  id,
  guestName,
  img,
  onClickHandler,
  matchReward,
  followerId,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationProps>();
  const {userId} = useSelector((state: RootState) => state.auth);
  return (
    <Pressable
      onPress={() => navigation.navigate('PlayerProfile', {userId: Number(id)})}
      bg={'background.400'}
      mb={5}
      w={WIDTH - 40}
      borderColor={'yellow.400'}
      alignSelf={'center'}
      mt={index === 0 ? 5 : 0}>
      <HStack justifyContent={'space-between'}>
        <HStack alignItems={'center'} p={2}>
          <Image
            alt={'no img'}
            source={img}
            w={30}
            h={30}
            resizeMode={'cover'}
            rounded={100}
          />
          <Text
            fontFamily={'body'}
            fontSize={'sm'}
            fontWeight={'100'}
            fontStyle={'normal'}
            ml={2}
            color={'white'}>
            {guestName}
          </Text>
        </HStack>
        {userId === followerId && (
          <Text
            onPress={() => onClickHandler(id)}
            bg={'secondary.400'}
            fontFamily={'heading'}
            fontSize={9}
            width={'20%'}
            textAlign={'center'}
            fontWeight={'100'}
            fontStyle={'normal'}
            ml={2}
            mt={2}
            mr={1}
            h={3.5}
            color={'primary.400'}>
            {t('Unfollow')}
          </Text>
        )}
      </HStack>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'#263C59'}
        p={2}>
        <HStack>
          <Trophy height={15} width={15} color={Colors.secondary} />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {t('Player of the match award')}- {matchReward}
          </Text>
        </HStack>
        <Text color={'white'} fontSize={'xs'} ml={1}>
          {t('View profile')}
        </Text>
      </HStack>
    </Pressable>
  );
};
