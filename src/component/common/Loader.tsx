import React from 'react';
import {VStack, Text} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

export const Loader = () => {
  const {t} = useTranslation();

  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator size="large" color={Colors.secondary} />
      <Text
        fontFamily={'body'}
        fontWeight={'100'}
        fontSize={'md'}
        fontStyle={'normal'}
        color={'white'}>
        {t('Loading...')}
      </Text>
    </VStack>
  );
};
