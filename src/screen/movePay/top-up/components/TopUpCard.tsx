import React from 'react';
import {HStack, Pressable, Text} from 'native-base';
import {TopUpListItem} from '../../../../data/TopUpList';
import {useTranslation} from 'react-i18next';

export const TopUpCard = ({
  item,
  id,
  index,
  dateValue,
  amountValue,
  transactionValue,
}: {
  item: TopUpListItem;
  id: number;
  index: number;
  dateValue: string;
  amountValue: string;
  transactionValue: string;
}) => {
  const {t} = useTranslation();
  return (
    <Pressable bg={'background.400'} mx={5} mb={3} mt={index === 0 ? 5 : 0}>
      <HStack justifyContent={'space-between'} px={5} pt={5}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Date')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {dateValue}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} pt={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Transaction id')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {transactionValue}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} py={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Amount')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {amountValue}
        </Text>
      </HStack>
    </Pressable>
  );
};
