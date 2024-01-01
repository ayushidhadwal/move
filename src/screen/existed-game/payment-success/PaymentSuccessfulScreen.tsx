import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Image, Text} from 'native-base';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {BackHandler, Pressable, ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useGetMatchJoiningDetails} from '../../../hooks/match/useGetMatchJoiningDetails';
import i18n from 'i18next';
import {Loader} from '../../../component/common/Loader';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {useError} from '../../../context/ErrorProvider';
import {bookingItem, paymentItem} from '../../../data/BookingList';

type Props = RootStackScreenProps<'PaymentSuccess'>;

export const PaymentSuccessfulScreen: FC<Props> = ({navigation, route}) => {
  const paymentId: number = route?.params.paymentId;
  const matchId: number = route?.params.matchId;

  console.log('getting paymentId', matchId);

  // const {bookingDetails, paymentDetails, loading} =
  //   useGetMatchJoiningDetails(paymentId);
  const locale = i18n.language;
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [paymentList, setPaymentList] = useState<[]>([]);

  const {t} = useTranslation();
  const setError = useError();

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getPaymentDetails = () => {
    Axios.post(`${ApiEndpoints.invitation.getPaymentDetail}`, {
      match_id: matchId,
    })
      .then((response: any) => {
        console.log('jhgfds', response.data);
        if (response.data.status === 'ok') {
          setBookingDetails(response?.data?.data);
          setPaymentList(response?.data?.data?.payment_details);

          console.log(response?.data?.data?.payment_details);
        }
      })
      .catch((e: any) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getPaymentDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // if (bookingDetails !== null) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <Text style={{padding: 2, marginBottom: 5}}>Payment Successful</Text>
  //       <Pressable
  //         onPress={() =>
  //           navigation.reset({
  //             index: 0, // Reset the stack to the first screen
  //             routes: [
  //               {name: 'BottomTabs'}, // Replace 'YourScreenName' with the screen name you want to navigate to
  //             ],
  //           })
  //         }>
  //         <Text>Go TO Home</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }

  return (
    <AppLayout>
      <Box flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box flex={1}>
            <Box alignItems={'center'} mt={5}>
              <Image
                alt={'no img'}
                source={require('../../../assets/img/wallet.png')}
                size={'xl'}
                resizeMode={'contain'}
              />
              <Text
                fontFamily={'heading'}
                mb={8}
                fontWeight={'100'}
                fontStyle={'normal'}
                textAlign={'center'}
                fontSize={'md'}
                color={'yellow.400'}>
                {t('Payment successful')}
              </Text>
            </Box>

            <Text
              fontFamily={'heading'}
              mb={3}
              px={5}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Booking Details')}
            </Text>
            <Box bg={'background.400'} p={3} mb={5} mx={5}>
              {/*{bookingDetails.map(m => (*/}
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={2}>
                <Text
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'secondary.400'}>
                  {t('Venue')}
                </Text>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'white'}>
                  {locale === 'en'
                    ? bookingDetails?.booking_details?.venue_en
                    : bookingDetails?.booking_details?.venue_ar}
                </Text>
              </HStack>
              {/*))}*/}
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={2}>
                <Text
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'secondary.400'}>
                  {t('Date & Time')}
                </Text>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'white'}>
                  {bookingDetails?.booking_details?.datetime}
                </Text>
              </HStack>
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={2}>
                <Text
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'secondary.400'}>
                  {t('Team')}
                </Text>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'white'}>
                  {bookingDetails?.booking_details?.team}
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'secondary.400'}>
                  {t('Slots')}
                </Text>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'white'}>
                  {bookingDetails?.booking_details?.slots}
                </Text>
              </HStack>
            </Box>
            <Text
              fontFamily={'heading'}
              mb={3}
              px={5}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'md'}
              color={'secondary.400'}>
              {t('Payment details')}
            </Text>
            <Box bg={'background.400'} p={3} mx={5} mb={20}>
              {paymentList.map(m => (
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={2}>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'100'}
                    fontStyle={'normal'}
                    fontSize={'md'}
                    color={'secondary.400'}>
                    {m?.title}
                  </Text>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    fontSize={'md'}
                    color={'white'}>
                    {m?.value}
                  </Text>
                </HStack>
              ))}
              {/*<HStack*/}
              {/*  justifyContent={'space-between'}*/}
              {/*  alignItems={'center'}*/}
              {/*  mb={2}>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'100'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'secondary.400'}>*/}
              {/*    {t('Paid from Wallet')}*/}
              {/*  </Text>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'200'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'white'}>*/}
              {/*    {bookingDetails?.payment_details?.paid_from_wallet}*/}
              {/*  </Text>*/}
              {/*</HStack>*/}
              {/*<HStack*/}
              {/*  justifyContent={'space-between'}*/}
              {/*  alignItems={'center'}*/}
              {/*  mb={2}>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'100'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'secondary.400'}>*/}
              {/*    {t('Coupon')}*/}
              {/*  </Text>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'200'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'white'}>*/}
              {/*    {bookingDetails?.payment_details?.coupon}*/}
              {/*  </Text>*/}
              {/*</HStack>*/}
              {/*<HStack*/}
              {/*  justifyContent={'space-between'}*/}
              {/*  alignItems={'center'}*/}
              {/*  mb={2}>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'100'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'yellow.400'}>*/}
              {/*    {t('Amount Paid')}*/}
              {/*  </Text>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'200'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'yellow.400'}>*/}
              {/*    {bookingDetails?.payment_details?.paid_amount}*/}
              {/*  </Text>*/}
              {/*</HStack>*/}
              {/*<HStack justifyContent={'space-between'} alignItems={'center'}>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'100'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'secondary.400'}>*/}
              {/*    {t('Reference ID')}*/}
              {/*  </Text>*/}
              {/*  <Text*/}
              {/*    fontFamily={'body'}*/}
              {/*    fontWeight={'200'}*/}
              {/*    fontStyle={'normal'}*/}
              {/*    fontSize={'md'}*/}
              {/*    color={'white'}>*/}
              {/*    {bookingDetails?.payment_details?.reference_id}*/}
              {/*  </Text>*/}
              {/*</HStack>*/}
            </Box>
          </Box>
        </ScrollView>

        <Box
          p={5}
          bg={'background.400'}
          position={'absolute'}
          bottom={0}
          w={'100%'}>
          <Button
            onPress={() => navigation.navigate('BottomTabs')}
            variant={'solid'}
            w={'100%'}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}>
            {t('Home')}
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
};
