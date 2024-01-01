import React, {FC} from 'react';
import {View, I18nManager} from 'react-native';
import {
  ArrowBackIcon,
  Box,
  CircleIcon,
  HStack,
  Pressable,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {AuthNavigationProps} from '../../navigation/types';

type Props = {
  heading?: string;
  children?: React.ReactNode;
  tag?: boolean;
};

export const Header: FC<Props> = ({heading, children, tag}) => {
  const navigation = useNavigation<AuthNavigationProps>();

  return (
    <>
      <HStack alignItems={'center'} p={3} justifyContent={'space-between'}>
        <Pressable w={'12.5%'} onPress={() => navigation.goBack()}>
          {/* <View  > */}
          <ArrowBackIcon
            color="white"
            size="5"
            mr={3}
            style={{
              transform: [
                {
                  scaleX: I18nManager.isRTL ? -1 : 1,
                },
              ],
            }}
          />
          {/* </View> */}
        </Pressable>
        <Box w={'75%'}>
          <Text
            fontFamily={'heading'}
            fontStyle={'italic'}
            color={'white'}
            textAlign={'center'}
            fontWeight={'100'}
            fontSize={'md'}>
            {tag && <CircleIcon size={'2'} color={'red.600'} />} {heading}
          </Text>
        </Box>
        <HStack w={'12.5%'} justifyContent={'flex-end'}>
          {children}
        </HStack>
      </HStack>
    </>
  );
};
