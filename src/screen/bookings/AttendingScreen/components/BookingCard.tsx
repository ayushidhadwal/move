import React from 'react';
import {HStack, Pressable, Text} from 'native-base';
import {Download} from '../../../../component/svg';
import {useTranslation} from 'react-i18next';

export const BookingCard = ({
  index,
  date,
  transactionId,
  amountPaid,
  venueIcon,
  onPressHandler,
}: {
  date: string;
  transactionId: string;
  amountPaid: string;
  venueIcon: string;
  index: number;
  onPressHandler?: () => void;
}) => {
  const {t} = useTranslation();
  return (
    <Pressable
      bg={'background.400'}
      mx={5}
      mb={3}
      mt={index === 0 ? 5 : 0}
      onPress={onPressHandler}>
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
          {date}
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
          {transactionId}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} pt={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Amount paid')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {amountPaid}
        </Text>
      </HStack>
      <HStack
        bg={'rgba(138,202,255,0.1)'}
        alignItems={'center'}
        p={2}
        mt={3}
        justifyContent={'center'}>
        <Download width={20} height={20} />
        <Text
          ml={2}
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'yellow.400'}>
          {venueIcon}
        </Text>
      </HStack>
    </Pressable>
  );
};
