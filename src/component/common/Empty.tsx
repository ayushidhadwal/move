import React from 'react';
import {Box, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

export const Empty = () => {
  const {t} = useTranslation();

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text
        fontFamily={'body'}
        fontSize={'sm'}
        fontStyle={'normal'}
        color={'white'}
        fontWeight={'100'}>
        {t('No Data')}
      </Text>
    </Box>
  );
};
