import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Input,
  InputRightAddon,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';

import {AppLayout} from '../../../component/common/AppLayout';
import {PaymentMethodId, RootStackScreenProps} from '../../../navigation/types';
import {Header} from '../../../component/common/Header';
import {Discount, Map} from '../../../component/svg';
import {useGetMatchDetails} from '../../../hooks/match/useMatchDetails';
import {RootState, useAppDispatch} from '../../../store';
import {useError} from '../../../context/ErrorProvider';
import {
  joinMatchCheckout,
  matchJoining,
} from '../../../store/game/matchJoinSlice';
import {Loader} from '../../../component/common/Loader';
import {useInit} from '../../../hooks/useInit';
import {Colors} from '../../../styles';
import {useGetWishToJoin} from '../../../hooks/home/useGetWishToJoin';
import {useSelector} from 'react-redux';
import {useMessage} from '../../../hooks/useMessage';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';

type Props = RootStackScreenProps<'PaymentDetail'>;

export const PaymentDetailScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setError = useError();
  const setMessage = useMessage();

  const matchId = route.params.matchId;
  const selectedPlayerList = route.params.selectedPlayerList;
  const {userId} = useSelector((state: RootState) => state.auth);

  const {info, dataLoading} = useGetMatchDetails({matchId});
  const {updateWishStatus} = useGetWishToJoin();

  const {walletBalance, dataLoading: load} = useInit(true);

  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  // const [amountTitle, setAmountTitle] = useState<string>('');
  // const [paidTitle, setPaidTitle] = useState<string>('');
  // const [couponTitle, setCouponTitle] = useState<string>('');
  // const [payableTitle, setPayableTitle] = useState<string>('');
  const [paidFromWallet, setPaidFromWallet] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>('');
  const [payableAmount, setPayableAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [paymentList, setPaymentList] = useState<[]>([]);
  const paymentId = route.params.paymentId;
  console.log(paymentList);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>(
    PaymentMethodId.KNET,
  );

  const walletHandler = async () => {
    try {
      const response = await Axios.post(ApiEndpoints.match.joinMatchCheckout, {
        match_id: matchId,
        player_id: selectedPlayerList,
        coupan_code: coupon,
        payment_method_id: paymentMethod,
      });
      if (response.data.status === 'ok') {
        const item = response?.data?.data?.payment_details.find(
          (item: any) => item.title === 'Payable amount',
        );

        let payableAmt = 0;

        if (item) {
          payableAmt = +item.value;
        }
        // if (res !== null) {
        if (coupon && !isCouponApplied) {
          setIsCouponApplied(true);
        } else {
          setCoupon('');
          setIsCouponApplied(false);
        }

        setPaymentList(response.data?.data?.payment_details);
        setPayableAmount(payableAmt);
        // }

        // return {
        //   paymentDetails: res?.data?.data?.payment_details,
        //   payableAmount: payableAmt,
        // };
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const CheckoutHandler = async (useCoupon = true) => {
    console.log('useCoupon', useCoupon);
    if (coupon !== '') {
      setIsCouponApplied(true);
    }
    try {
      setIsLoading(true);
      const response = await Axios.post(ApiEndpoints.match.joinMatchCheckout, {
        match_id: matchId,
        player_id: selectedPlayerList,
        coupan_code: useCoupon ? coupon : '',
        payment_method_id: paymentMethod,
      });
      if (response.data.status === 'ok') {
        setIsLoading(false);

        const item = response?.data?.data?.payment_details.find(
          (item: any) => item.title === 'Payable amount',
        );

        let payableAmt = 0;

        if (item) {
          payableAmt = +item.value;
        }
        // if (res !== null) {
        if (coupon) {
          setIsCouponApplied(true);
          setPaymentMethod(PaymentMethodId.KNET);
        } else {
          setCoupon('');
          setIsCouponApplied(false);
        }
        // }

        // else if (response.data?.data?.payment_details !=null) {
        // console.log('sdfgh', response.data?.data?.payment_details);
        if (response.data?.data?.payment_details) {
          // console.log('sdfgh', response.data?.data?.payment_details);

          setPaymentList(response.data?.data?.payment_details);
          setPayableAmount(payableAmt);
          console.log(response.data?.data?.payment_details);
        }

        // return {
        //   paymentDetails: res?.data?.data?.payment_details,
        //   payableAmount: payableAmt,
        // };
      }
    } catch (e) {
      console.log('error', e);
      setIsLoading(false);
    }
  };

  // const CheckoutHandler = async () => {
  //     try {
  //         setIsLoading(true);
  // console.log({
  //     paymentMethod,
  //     coupon: isCouponApplied ? '' : coupon,
  //     matchId,
  //     selectedPlayerList,
  // });
  // const res = await dispatch(
  //   joinMatchCheckout({
  //     paymentMethod,
  //     coupon: isCouponApplied ? '' : coupon,
  //     matchId,
  //     selectedPlayerList,
  //   }),
  // ).unwrap();
  // console.log('joinMatchCheckout', res);
  // if (res !== null) {
  // if (coupon && !isCouponApplied) {
  //   setIsCouponApplied(true);
  // } else {
  //   setCoupon('');
  //   setIsCouponApplied(false);
  // }
  // }
  //
  //     if (paymentMethod === PaymentMethodId.WALLET && res.payableAmount === 0) {
  //       if (info?.is_privtae_invite_only) {
  //         const res = await updateWishStatus(
  //           userId, // passing here currently logged in userid so host can understand who is sending joining request
  //           matchId,
  //           userId, // passing here currently logged in userid so host can understand who is sending joining request
  //           1, //host doing  public accesss 2  or user doing invite only 1,
  //           1, //cross icon 0   and accept button 1
  //         );
  //     if (res) {
  //       navigation.navigate('PaymentSuccess', {
  //         paymentId: paymentId,
  //         matchId: matchId,
  //       });
  //     }
  // }
  // else {
  //   navigation.navigate('PaymentSuccess', {
  //     paymentId: paymentId,
  //     matchId: matchId,
  //   });
  // }
  //     } else if (res.paymentDetails) {
  //       setPaymentList(res.paymentDetails);
  //       setPayableAmount(res.payableAmount);
  //     }
  //   } catch (e: any) {
  //     setError(e.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onPayHandler = async () => {
    if (paymentMethod === PaymentMethodId.WALLET && payableAmount === 0) {
      if (info?.is_privtae_invite_only) {
        const res = await updateWishStatus(
          userId, // passing here currently logged in userid so host can understand who is sending joining request
          matchId,
          userId, // passing here currently logged in userid so host can understand who is sending joining request
          1, //host doing  public accesss 2  or user doing invite only 1,
          1, //cross icon 0   and accept button 1
        );
        if (res != null) {
          navigation.navigate('PaymentSuccess', {
            paymentId: paymentId,
            matchId: matchId,
          });
        }
      } else {
        navigation.navigate('PaymentSuccess', {
          paymentId: paymentId,
          matchId: matchId,
        });
      }
    } else {
      try {
        setLoading(true);
        const res = await dispatch(
          matchJoining({
            paymentMethod,
            matchId,
            selectedPlayerList,
          }),
        ).unwrap();

        setMessage(res.message);
        navigation.navigate('Home');

        if (res.paymentUrl) {
          navigation.navigate('MatchJoinPayment', {
            info: info,
            matchId: matchId,
            url: res.paymentUrl,
            paymentId:
              paymentMethod === PaymentMethodId.WALLET
                ? '1'
                : res.matchBookingPaymentId,
          });
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      console.log({paymentMethod});
      // if (paymentMethod !== PaymentMethodId.KNET) {
      CheckoutHandler();
      // }
    })();
  }, [paymentMethod]);

  // console.log(isCouponApplied, coupon);

  return (
    <AppLayout>
      <Header heading={String(t('Payment'))} />
      {dataLoading || load ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <ScrollView flex={1} px={5}>
            <Text
              fontFamily={'heading'}
              mt={2}
              mb={3}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Venue')}
            </Text>
            <Box bg={'background.400'} p={1}>
              <Text
                fontFamily={'body'}
                mt={2}
                fontWeight={'200'}
                fontStyle={'normal'}
                fontSize={'md'}
                color={'white'}>
                {info?.venue_details?.name}
              </Text>
            </Box>
            <HStack bg={'#263C59'} p={1} alignItems={'center'} mb={7}>
              <Map width={12} height={12} />
              <Text
                ml={2}
                fontFamily={'body'}
                fontWeight={'100'}
                fontStyle={'normal'}
                fontSize={'xs'}
                color={'white'}>
                {info?.venue_details?.location}
              </Text>
            </HStack>
            <Text
              fontFamily={'heading'}
              mb={3}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Move Pay')}
            </Text>
            <HStack
              bg={'yellow.400'}
              alignItems={'center'}
              p={2}
              mb={7}
              justifyContent={'space-between'}>
              <HStack alignItems={'center'}>
                <Pressable
                  onPress={() => {
                    if (paymentMethod !== PaymentMethodId.WALLET) {
                      setPaymentMethod(PaymentMethodId.WALLET);
                    } else {
                      setPaymentMethod(PaymentMethodId.KNET);
                    }
                  }}
                  borderWidth={1}
                  borderColor={'black'}
                  size="5"
                  bg={'black'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  {paymentMethod === PaymentMethodId.WALLET && (
                    <CheckIcon size="4" color={'yellow.400'} />
                  )}
                </Pressable>
                <Pressable
                  pl={5}
                  onPress={() => {
                    if (paymentMethod !== PaymentMethodId.WALLET) {
                      setPaymentMethod(PaymentMethodId.WALLET);
                    } else {
                      setPaymentMethod(PaymentMethodId.KNET);
                    }
                  }}>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    fontSize={'sm'}
                    pt={1}
                    color={'black'}>
                    {t('Wallet balance')}
                  </Text>
                </Pressable>
              </HStack>
              <Text
                fontFamily={'body'}
                fontWeight={'200'}
                fontStyle={'normal'}
                fontSize={'sm'}
                ml={5}
                color={'black'}>
                {walletBalance} KWD
              </Text>
            </HStack>
            <Text
              fontFamily={'heading'}
              mb={3}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Save on your booking')}
            </Text>
            <Pressable
            // onPress={() =>
            //   navigation.navigate('Coupon', {
            //     matchId: matchId,
            //     selectedPlayerList: selectedPlayerList,
            //   })
            // }
            >
              <HStack
                bg={'background.400'}
                alignItems={'center'}
                borderWidth={1}
                borderColor={'secondary.400'}
                px={2}
                py={1}
                mb={7}
                justifyContent={'space-between'}>
                <HStack alignItems={'center'}>
                  <Discount width={20} height={20} />
                  <Input
                    value={coupon}
                    size={'md'}
                    variant="Unstyled"
                    w={'73%'}
                    // borderColor={'secondary.400'}
                    backgroundColor={'background.400'}
                    // focusOutlineColor={'secondary.400'}
                    placeholder={String(t('Enter Promo code'))}
                    placeholderTextColor={'gray.400'}
                    mr={3}
                    color={'white'}
                    onEndEditing={e => setCoupon(e.nativeEvent.text)}
                    onChangeText={text => {
                      setCoupon(text);
                    }}
                    editable={!isCouponApplied}
                  />
                  {/*<Text*/}
                  {/*  fontFamily={'body'}*/}
                  {/*  fontWeight={'100'}*/}
                  {/*  fontStyle={'normal'}*/}
                  {/*  fontSize={'sm'}*/}
                  {/*  ml={2}*/}
                  {/*  pt={1}*/}
                  {/*  color={'white'}>*/}
                  {/*  {t('Enter Promo code')}*/}
                  {/*</Text>*/}
                  {isCouponApplied && coupon ? (
                    <Pressable
                      onPress={() => {
                        setCoupon('');
                        // setIsCouponApplied(false);
                        CheckoutHandler(false);
                      }}>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'200'}
                        fontStyle={'normal'}
                        fontSize={'sm'}
                        // ml={5}
                        pt={0.5}
                        // opacity={coupon ? 0.4 : 1}
                        color={'yellow.400'}>
                        {t('Remove')}
                      </Text>
                    </Pressable>
                  ) : coupon ? (
                    <Pressable onPress={CheckoutHandler}>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'200'}
                        fontStyle={'normal'}
                        fontSize={'sm'}
                        // ml={5}
                        pt={0.5}
                        // opacity={coupon ? 0.4 : 1}
                        color={'yellow.400'}>
                        {t('Submit')}
                      </Text>
                    </Pressable>
                  ) : null}
                </HStack>
              </HStack>
            </Pressable>
            <Text
              fontFamily={'heading'}
              mb={3}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Payment method')}
            </Text>
            <HStack
              bg={'background.400'}
              alignItems={'center'}
              borderWidth={1}
              borderColor={'secondary.400'}
              py={1}
              px={2}
              mb={7}
              justifyContent={'space-between'}>
              <HStack alignItems={'center'}>
                {paymentMethod === PaymentMethodId.KNET ? (
                  <Box
                    borderWidth={1}
                    borderColor={'yellow.400'}
                    size="5"
                    bg={'yellow.400'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <CheckIcon size="4" color="black" />
                  </Box>
                ) : (
                  <Pressable
                    borderWidth={1}
                    borderColor={'white'}
                    size="5"
                    bg={'white'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onPress={() => setPaymentMethod(PaymentMethodId.KNET)}
                  />
                )}
                <Text
                  onPress={() => setPaymentMethod(PaymentMethodId.KNET)}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}
                  ml={3}
                  pt={0.5}
                  color={'white'}>
                  {t('KNET')}
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                {paymentMethod === PaymentMethodId.CREDIT_CARD ? (
                  <Box
                    borderWidth={1}
                    borderColor={'yellow.400'}
                    size="5"
                    bg={'yellow.400'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <CheckIcon size="4" color="black" />
                  </Box>
                ) : (
                  <Pressable
                    borderWidth={1}
                    borderColor={'white'}
                    size="5"
                    bg={'white'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onPress={() =>
                      setPaymentMethod(PaymentMethodId.CREDIT_CARD)
                    }
                  />
                )}
                <Text
                  onPress={() => setPaymentMethod(PaymentMethodId.CREDIT_CARD)}
                  pt={0.5}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}
                  ml={2}
                  color={'white'}>
                  {t('Credit card/Visa')}
                </Text>
              </HStack>
            </HStack>
            <Text
              fontFamily={'heading'}
              mb={3}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Payment details')}
            </Text>
            {isLoading ? (
              <Box alignItems={'center'} justifyContent={'center'}>
                <ActivityIndicator color={Colors.secondary} size={'small'} />
              </Box>
            ) : (
              paymentList.map(m => {
                const isYellow = m.title === 'Payable amount';
                console.log('single value', m);

                return (
                  <Box bg={'background.400'} p={1}>
                    <HStack
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'100'}
                        fontStyle={'normal'}
                        fontSize={'md'}
                        color={isYellow ? 'yellow.400' : 'secondary.400'}>
                        {m.title}
                      </Text>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'200'}
                        fontStyle={'normal'}
                        fontSize={'md'}
                        color={isYellow ? 'yellow.400' : 'white'}>
                        {m.value} KD
                      </Text>
                    </HStack>
                  </Box>
                );
              })
            )}

            {
              // totalAmount && (
              // <>
              // <Text
              //       fontFamily={'heading'}
              //       mb={3}
              //       fontWeight={'100'}
              //       fontStyle={'italic'}
              //       fontSize={'md'}
              //       color={'secondary.400'}>
              //       {t('Payment details')}
              //     </Text>
              //     <Box bg={'background.400'} p={3} mb={5}>
              //       {amountTitle && totalAmount && (
              //         <HStack
              //           justifyContent={'space-between'}
              //           alignItems={'center'}
              //           mb={2}>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'100'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'secondary.400'}>
              //             {amountTitle}
              //           </Text>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'200'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'white'}>
              //             {totalAmount} KD
              //           </Text>
              //         </HStack>
              //       )}
              //       {paidTitle && paidFromWallet && (
              //         <HStack
              //           justifyContent={'space-between'}
              //           alignItems={'center'}
              //           mb={2}>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'100'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'secondary.400'}>
              //             {paidTitle}
              //           </Text>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'200'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'white'}>
              //             {paidFromWallet} KD
              //           </Text>
              //         </HStack>
              //       )}
              //       {couponTitle && coupon && (
              //         <HStack
              //           justifyContent={'space-between'}
              //           alignItems={'center'}
              //           mb={2}>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'100'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'secondary.400'}>
              //             {couponTitle}
              //           </Text>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'200'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'white'}>
              //             (-) {coupon} KD
              //           </Text>
              //         </HStack>
              //       )}
              //       {payableTitle && payableAmount && (
              //         <HStack
              //           justifyContent={'space-between'}
              //           alignItems={'center'}>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'100'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'yellow.400'}>
              //             {payableTitle}
              //           </Text>
              //           <Text
              //             fontFamily={'body'}
              //             fontWeight={'200'}
              //             fontStyle={'normal'}
              //             fontSize={'md'}
              //             color={'yellow.400'}>
              //             {payableAmount} KD
              //           </Text>
              //         </HStack>
              //       )}
              //     </Box>
              //   </>
              // )
              // )}
            }
          </ScrollView>
          <Box p={5} bg={'background.400'}>
            <Button
              onPress={onPayHandler}
              variant={'solid'}
              w={'100%'}
              fontFamily={'heading'}
              isLoading={loading}
              isDisabled={loading}
              isLoadingText={`Proceed to Payment ${payableAmount} KD`}
              fontWeight={'200'}
              _text={{
                fontFamily: 'body',
                fontWeight: '200',
                fontStyle: 'normal',
                fontSize: 'md',
                color: 'primary.400',
              }}
              colorScheme={'secondary'}>
              {`Proceed to Payment ${payableAmount} KD`}
            </Button>
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};
