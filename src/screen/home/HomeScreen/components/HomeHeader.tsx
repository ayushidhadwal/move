import React, {FC} from 'react';
import {Box, HStack, Image, Pressable} from 'native-base';
import {Notification, WhiteMapPin} from '../../../../component/svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../../navigation/types';

export const HomeHeader: FC = () => {
  const navigation = useNavigation<RootNavigationProps>();

  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
      ml={5}
      mr={2}>
      <Box w={'16%'} />
      <Box w={'68%'} alignItems={'center'}>
        <Image
          source={require('../../../../assets/move.png')}
          alt={'no img'}
          w={'50%'}
          h={50}
          resizeMode={'contain'}
        />
      </Box>
      <HStack w={'16%'} justifyContent={'space-between'} alignItems={'center'}>
        <Pressable onPress={() => navigation.navigate('UpdateLocation')}>
          <WhiteMapPin width={20} height={20} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Notification')}>
          <Notification width={20} height={20} />
        </Pressable>
      </HStack>
    </HStack>
  );
};
