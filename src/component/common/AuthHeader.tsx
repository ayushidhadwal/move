import React, {FC} from 'react';
import {ArrowBackIcon, HStack, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {AuthNavigationProps} from '../../navigation/types';

type Props = {
  heading?: string;
};

export const AuthHeader: FC<Props> = ({heading}) => {
  const navigation = useNavigation<AuthNavigationProps>();
  return (
    <>
      <HStack alignItems={'center'} p={3}>
        <Pressable w={'10%'} onPress={() => navigation.goBack()}>
          <ArrowBackIcon color="white" size="5" ml={2} />
        </Pressable>
        <Text
          ml={2.5}
          textAlign={'left'}
          fontFamily={'heading'}
          fontStyle={'italic'}
          color={'white'}
          fontWeight={'100'}
          fontSize={17}>
          {heading}
        </Text>
      </HStack>
    </>
  );
};
