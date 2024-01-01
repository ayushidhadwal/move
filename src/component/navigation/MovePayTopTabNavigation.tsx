import React, {FC, useEffect, useState} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';

import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../common/Header';
import {Movepay} from '../svg';
import {AppLayout} from '../common/AppLayout';
import {TopUpScreen} from '../../screen/movePay/top-up/TopUpScreen';
import {TransactionsScreen} from '../../screen/movePay/transaction/TransactionsScreen';
import {BlurView} from '@react-native-community/blur';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {TopUpList, TopUpListItem} from '../../data/TopUpList';

type Props = RootStackScreenProps<'MovePayTopTab'>;

export const MovePayTopTabNavigation: FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const [screen, setScreen] = useState<string>(route.params.screen);
  const [show, setShow] = useState<boolean>(false);
  const visibleModal = (val: boolean) => {
    setShow(val);
  };
  const [paymentLoading, setPaymentLoading] = useState<boolean>(true);

  const [availableCredit, setAvailableCredit] = useState<TopUpListItem[]>([]);

  const getPayments = () => {
    Axios.get(`${ApiEndpoints.topUp.topUp}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          if (response.data.data) {
            console.log(response.data.wallet);
            setAvailableCredit(response.data.wallet);
          }
        }
      })
      .catch((error: any) => {
        //
      })
      .finally(() => {
        setPaymentLoading(false);
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <AppLayout>
      <Box flex={1}>
        <Header heading={String(t('Move pay'))}>
          <Pressable onPress={() => navigation.navigate('BankDetails')}>
            <Movepay width={22} height={22} />
          </Pressable>
        </Header>
        <Box
          w={'80%'}
          alignSelf={'center'}
          bg={'background.400'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text
            mt={1}
            fontFamily={'heading'}
            fontWeight={'100'}
            fontStyle={'italic'}
            fontSize={'md'}
            color={'yellow.400'}>
            {screen === 'TopUp'
              ? `${t('Available Credit')}`
              : `${t('Match amount')}`}
          </Text>
          <Text
            mb={5}
            mt={2}
            fontFamily={'body'}
            fontWeight={'200'}
            fontStyle={'normal'}
            fontSize={'md'}
            color={'white'}>
            {availableCredit}
          </Text>
          <HStack
            mt={2}
            alignSelf={'center'}
            borderColor={'yellow.400'}
            borderWidth={1}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Pressable
              bg={screen === 'TopUp' ? 'yellow.400' : 'primary.400'}
              px={5}
              py={2}
              w={'50%'}
              alignItems={'center'}
              onPress={() => setScreen('TopUp')}>
              <Text
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                fontSize={12}
                textTransform={'capitalize'}
                color={screen === 'TopUp' ? 'primary.400' : 'white'}>
                {t('Top Up')}
              </Text>
            </Pressable>
            <Pressable
              bg={screen === 'Transactions' ? 'yellow.400' : 'primary.400'}
              px={4}
              py={2}
              w={'50%'}
              alignItems={'center'}
              onPress={() => setScreen('Transactions')}>
              <Text
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                fontSize={12}
                textTransform={'capitalize'}
                color={screen === 'Transactions' ? 'primary.400' : 'white'}>
                {t('Transactions')}
              </Text>
            </Pressable>
          </HStack>
        </Box>
        {screen === 'TopUp' ? (
          <TopUpScreen visibleModal={visibleModal} />
        ) : (
          screen === 'Transactions' && <TransactionsScreen />
        )}
      </Box>

      {show && (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor={'#0f1f38'}
        />
      )}
    </AppLayout>
  );
};
