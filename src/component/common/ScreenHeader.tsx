import React, {FC, useState} from 'react';
import {Box, CloseIcon, HStack, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {AuthNavigationProps} from '../../navigation/types';
import {AlertModal} from './AlertModal';

type Props = {
  heading?: string;
  matchCreating?: boolean;
};

export const ScreenHeader: FC<Props> = ({heading, matchCreating = false}) => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <HStack alignItems={'center'} p={3} justifyContent={'space-between'}>
        <Pressable
          w={'20%'}
          onPress={() =>
            !matchCreating ? navigation.goBack() : setVisible(true)
          }>
          <CloseIcon color="white" size="5" mr={3} />
        </Pressable>
        <Box w={'60%'}>
          <Text
            fontFamily={'heading'}
            fontStyle={'italic'}
            color={'white'}
            textAlign={'center'}
            fontWeight={'100'}
            fontSize={'md'}>
            {heading}
          </Text>
        </Box>
        {/*<HStack w={'20%'} justifyContent={'flex-end'}>*/}
        {/*  {children}*/}
        {/*</HStack>*/}
        <Box w={'20%'} />
      </HStack>
      <AlertModal
        onClose={() => setVisible(false)}
        visible={visible}
        yesHandler={() => {
          navigation.navigate('Home');
        }}
      />
    </>
  );
};
