import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Input,
  KeyboardAvoidingView,
  Modal,
  Text,
} from 'native-base';
import {I18nManager, StatusBar} from 'react-native';

import {TopUpList, TopUpListItem} from '../../../data/TopUpList';
import {TopUpCard} from './components/TopUpCard';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {PaymentMethodId} from '../../../navigation/types';
import {Loader} from '../../../component/common/Loader';
import {useNavigation} from '@react-navigation/native';
import i18n from 'i18next';
import {useError} from '../../../context/ErrorProvider';

export const TopUpScreen = ({visibleModal}: {visibleModal: any}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [amountValue, setAmountValue] = useState<string>('');
  const [packageId, setPackageId] = useState<string>('');
  const [paymentLoading, setPaymentLoading] = useState<boolean>(true);
  const [topUpList, setTopUpList] = useState<TopUpListItem[]>([]);
  const [packagesList, setPackagesList] = useState<TopUpListItem[]>([]);
  const [packageLoading, setPackageLoading] = useState<boolean>(true);
  const locale = i18n.language;
  const setError = useError();

  const renderItem = ({item, index}: {item: TopUpListItem; index: number}) => (
    <TopUpCard
      index={index}
      item={item}
      id={item.id}
      amountValue={locale === 'en' ? item?.amount_en : item?.amount_ar}
      dateValue={locale === 'en' ? item?.date_en : item?.date_ar}
      transactionValue={
        locale === 'en' ? item?.transaction_id_en : item?.transaction_id_ar
      }
    />
  );

  const getPayments = () => {
    Axios.get(`${ApiEndpoints.topUp.topUp}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          if (response.data.data) {
            setTopUpList(response?.data?.data?.topupList);
            // console.log(response.data.wallet);
            // setTopUpList(TopUpList);
          }
        }
      })
      .catch((e: any) => {
        setError(e);
      })
      .finally(() => {
        setPaymentLoading(false);
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  const getPackages = () => {
    Axios.get(`${ApiEndpoints.topUp.getPackages}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setPackagesList(response?.data?.data);
          console.log(response.data.data);
        }
      })
      .catch((e: any) => {
        setError(e);
      })
      .finally(() => {
        setPackageLoading(false);
      });
  };

  useEffect(() => {
    getPackages();
  }, []);

  const updatePayment = async () => {
    try {
      const response = await Axios.post(ApiEndpoints.topUp.updatePayment, {
        package_id: packageId,
        amount: amountValue,
        payment_method_id: PaymentMethodId.KNET,
      });
      console.log(response.data);
      if (response.data.status === 'ok') {
        navigation.navigate('MatchPayment', {
          url: response.data.data.payment_url,
        });
      } else {
      }
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <Box flex={1}>
      <StatusBar hidden={showModal} barStyle={'light-content'} />
      {paymentLoading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={topUpList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <Box pt={5} px={5} pb={5} bg={'background.400'}>
        <Button
          variant={'solid'}
          w={'100%'}
          rounded={0}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'md',
            color: 'primary.400',
          }}
          onPress={() => {
            setShowModal(true);
            visibleModal(true);
          }}
          colorScheme={'secondary'}>
          {t('Top up your wallet')}
        </Button>
      </Box>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          visibleModal(false);
        }}
        justifyContent="flex-end"
        _backdrop={{
          _dark: {
            bg: 'gray.800',
          },
          bg: 'gray.800',
        }}
        size="xl">
        <KeyboardAvoidingView behavior={'padding'} w={'100%'}>
          <Box w={'100%'} bg={'background.400'}>
            <Divider
              w={'7%'}
              bg={'yellow.400'}
              alignSelf={'center'}
              p={0.5}
              // h={'1.5%'}
              // borderRadius={5}
              mt={1}
            />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'white'}
              fontSize={'lg'}
              py={4}
              textAlign={'center'}>
              {t('Select amount')}
            </Text>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              alignSelf={'center'}
              w={'90%'}>
              {packagesList.map(m => (
                <>
                  <Text
                    onPress={() => {
                      setValue(m.name);
                      setAmountValue(String(m.amount));
                      setPackageId(String(m.id));
                    }}
                    w={'30%'}
                    textAlign={'center'}
                    fontFamily="body"
                    fontWeight="200"
                    fontStyle="normal"
                    pt={1}
                    bg={value === m.name ? 'yellow.400' : 'background.400'}
                    color={value === m.name ? 'primary.400' : 'white'}
                    fontSize={'sm'}>
                    {m.name}
                  </Text>
                </>
              ))}
            </HStack>
            <Input
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              colorScheme={'primary'}
              size={'sm'}
              borderColor={'secondary.400'}
              alignSelf={'center'}
              variant="outline"
              w={'90%'}
              my={5}
              value={amountValue}
              onChangeText={text => setAmountValue(text)}
              color={'white'}
              focusOutlineColor={'secondary.400'}
              placeholder="Enter other amount"
              placeholderTextColor={'gray.400'}
              keyboardType={'number-pad'}
            />
            <Divider bg={'muted.700'} />
            <Button
              variant="solid"
              colorScheme={'secondary'}
              m={5}
              _text={{
                fontFamily: 'body',
                fontWeight: '200',
                fontStyle: 'normal',
                fontSize: 'md',
                color: 'primary.400',
              }}
              onPress={updatePayment}>
              {t('Proceed to payment')}
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </Modal>
    </Box>
  );
};
