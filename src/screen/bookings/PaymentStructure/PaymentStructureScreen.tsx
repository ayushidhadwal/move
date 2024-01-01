import React, {FC} from 'react';
import {Box, Button, HStack, Text} from 'native-base';

import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {RootStackScreenProps} from '../../../navigation/types';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';

type Props = RootStackScreenProps<'PaymentStructure'>;

export const PaymentStructureScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const locale = i18n.language;

  const {paymentStructure} = route.params;
  return (
    <AppLayout>
      <Header heading={String(t('Payment structure'))} />
      <Box flex={1}>
        <Text
          mt={6}
          px={3}
          fontFamily={'heading'}
          fontWeight={'100'}
          fontStyle={'italic'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Game payment structure')}
        </Text>
        <Box mx={3} mt={3} bg={'background.400'}>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            px={3}
            pt={3}>
            <Text
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {locale === 'en'
                ? paymentStructure?.game_value?.title_en
                : paymentStructure?.game_value?.title_ar}
            </Text>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'yellow.400'}>
              {paymentStructure?.game_value?.value_en
                ? paymentStructure?.game_value.value_en + ' ' + 'KD'
                : 'O KD'}
            </Text>
          </HStack>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            px={3}
            pt={3}>
            <Text
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {paymentStructure?.number_of_player?.title_en}
            </Text>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'white'}>
              {paymentStructure?.number_of_player?.value_en + ' Players'}
            </Text>
          </HStack>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            px={3}
            pt={3}>
            <Text
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {paymentStructure?.price_per_player?.title_en}
            </Text>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'white'}>
              {paymentStructure?.price_per_player?.value_en + ' KD'}
            </Text>
          </HStack>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            px={3}
            pt={3}>
            <Text
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {paymentStructure?.move_commission?.title_en}
              <Text fontSize={10}> {t('per player')}</Text>
            </Text>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'white'}>
              {paymentStructure?.move_commission?.value_en} KD
            </Text>
          </HStack>
          <Box borderWidth={1} borderColor={'yellow.400'} mt={3} mx={3} p={2}>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'md'}
              textAlign={'center'}
              color={'white'}>
              {t(
                `Amount receivable ${paymentStructure?.amount_receivable.value_en} KWD`,
              )}
            </Text>
          </Box>
          <Box bg={'secondary.400'} mt={3} mx={3} p={2}>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'md'}
              textAlign={'center'}
              color={'primary.400'}>
              Amount paid {paymentStructure?.amount_paid?.value_en} KWD
            </Text>
          </Box>
          <HStack alignItems={'center'} p={3}>
            <Text
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'sm'}
              textAlign={'center'}
              color={'secondary.400'}>
              {paymentStructure?.refrence_id?.title_en}
            </Text>
            <Text
              ml={3}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'sm'}
              textAlign={'center'}
              color={'white'}>
              {paymentStructure?.refrence_id?.value_en}
            </Text>
          </HStack>
        </Box>
        <Button
          variant={'outline'}
          w={'90%'}
          rounded={0}
          bg={'#FD0101'}
          position={'absolute'}
          bottom={0}
          alignSelf={'center'}
          m={5}
          borderColor={'#FD0101'}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'white',
          }}
          onPress={() => navigation.navigate('SelectPlayer')}
          colorScheme={'#FD0101'}>
          {t('Cancel Booking')}
        </Button>
      </Box>
    </AppLayout>
  );
};
