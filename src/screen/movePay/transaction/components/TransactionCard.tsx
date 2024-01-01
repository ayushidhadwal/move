import React from 'react';
import {HStack, Pressable, Text} from 'native-base';
import {TopUpListItem} from '../../../../data/TopUpList';
import {TransactionItem} from '../../../../data/TransactionList';
import {useTranslation} from 'react-i18next';

export const TransactionCard = ({
  item,
  index,

  dateValue,
  refrenceValue,
  amountValue,
  typeValue,
}: {
  item: TransactionItem;
  index: number;
  dateValue: string;
  refrenceValue: string;
  amountValue: string;
  typeValue: string;
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
      <HStack justifyContent={'space-between'} px={5} pt={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Reference ID')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {refrenceValue}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} pt={3} pb={1}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Type')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {typeValue}
        </Text>
      </HStack>
    </Pressable>
  );
};
