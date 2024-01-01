import React, {FC} from 'react';
import {ArrowBackIcon, HStack, Input, SearchIcon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {AuthNavigationProps} from '../../navigation/types';
import {useTranslation} from 'react-i18next';

export const LocationHeader: FC = () => {
  const {t} = useTranslation();

  const navigation = useNavigation<AuthNavigationProps>();
  return (
    <HStack alignItems={'center'} p={3}>
      <ArrowBackIcon
        color="white"
        size="5"
        mr={3}
        onPress={() => navigation.goBack()}
      />
      <Input
        colorScheme={'primary'}
        size={'md'}
        variant="outline"
        w={'90%'}
        color={'white'}
        backgroundColor={'rgba(138,202,255,0.10)'}
        focusOutlineColor={'secondary.400'}
        InputLeftElement={<SearchIcon size="5" ml={3} color={'gray.400'} />}
        placeholder={String(t('Type here to search'))}
        placeholderTextColor={'gray.400'}
      />
    </HStack>
  );
};
