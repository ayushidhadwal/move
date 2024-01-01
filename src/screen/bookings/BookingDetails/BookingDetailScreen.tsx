import React, {FC, useState} from 'react';
import {Box, Button, Divider, HStack, Pressable, Text} from 'native-base';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {RootStackScreenProps} from '../../../navigation/types';
import {
  Alert as AlertIcon,
  Calender2,
  Map2,
  StopWatch,
} from '../../../component/svg';
import {useGetMatchBookingDetails} from '../../../hooks/booking/useGetMatchBookingDetails';
import {Loader} from '../../../component/common/Loader';
import {RootState} from '../../../store';
import i18n from 'i18next';
import moment from 'moment';
import {Alert} from 'react-native';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {useMessage} from '../../../hooks/useMessage';
import {useError} from '../../../context/ErrorProvider';

type Props = RootStackScreenProps<'BookingDetails'>;

export const BookingDetailScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const matchBookingId = route.params.matchBookingId;
  // const [cancelLoading, setCancelLoading] = useState(false);
  // const matchId = route.params.matchId;

  const {userId} = useSelector((state: RootState) => state.auth);
  const setMessage = useMessage();
  const setError = useError();

  const {
    hostId,
    matchId,
    gameDetails,
    paymentDetails,
    loading,
    paymentStructure,
    currentTime,
    endTime,
    startTime,
    liveScoring,
  } = useGetMatchBookingDetails(matchBookingId);
  // console.log('matchIdsdfghj', matchId);
  const locale = i18n.language;

  console.log({matchId});

  const cancelBooking = async () => {
    try {
      const response = await Axios.post(
        ApiEndpoints.cancelBooking.cancelBooking,
        {
          match_id: matchId,
          user_id: userId,
        },
      );
      if (response.data.status === 'ok') {
        setMessage(response.data.message);
        navigation.navigate('Home');

        console.log(response.data);
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  const getTimeCondition = () => {
    if (moment(currentTime, 'hh:mm:ss').isAfter(moment(endTime, 'hh:mm:ss'))) {
      // is match ended
      return (
        <Button
          variant={'outline'}
          w={'90%'}
          rounded={0}
          bg={'background.400'}
          position={'absolute'}
          bottom={0}
          alignSelf={'center'}
          m={5}
          borderColor={'background.400'}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'white',
          }}
          onPress={() =>
            navigation.navigate('SelectPlayer', {matchId: matchId})
          }
          colorScheme={'#FD0101'}>
          {t('Match review')}
        </Button>
      );
    } else if (
      moment(currentTime, 'hh:mm:ss').isBefore(moment(startTime, 'hh:mm:ss'))
    ) {
      return (
        <Button
          variant={'outline'}
          w={'90%'}
          rounded={0}
          bg={'background.400'}
          position={'absolute'}
          bottom={0}
          alignSelf={'center'}
          m={5}
          borderColor={'background.400'}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'white',
          }}
          onPress={() =>
            Alert.alert(
              'Cancel Booking',
              'Are you sure you want to cancel your booking?',
              [
                {
                  text: 'Yes',
                  onPress: () => cancelBooking(),
                },
                {
                  text: 'No',
                  style: 'cancel',
                },
              ],
            )
          }
          bgColor={'#FD0101'}>
          {t('Cancel Booking')}
        </Button>
      );
    } else if (
      moment(currentTime, 'hh:mm:ss').isAfter(moment(startTime, 'hh:mm:ss')) &&
      moment(currentTime, 'hh:mm:ss').isBefore(moment(endTime, 'hh:mm:ss')) &&
      userId === hostId &&
      liveScoring
    ) {
      return (
        <Button
          variant={'outline'}
          w={'90%'}
          rounded={0}
          position={'absolute'}
          bottom={0}
          alignSelf={'center'}
          m={5}
          borderColor={'background.400'}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'white',
          }}
          bg={'background.400'}
          onPress={() =>
            navigation.navigate('LiveScoring', {matchId: matchId as number})
          }
          colorScheme={'background'}>
          {/*{otherDetails?.live_scoring?.title_en}*/}
          {t('live scoring')}
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Booking Details'))}>
        {/*{hostId === userId && (*/}
        <Pressable
          onPress={() =>
            navigation.navigate('PaymentStructure', {
              paymentStructure: paymentStructure,
            })
          }>
          <AlertIcon width={20} height={20} />
        </Pressable>
        {/*)}*/}
      </Header>
      <Box flex={1}>
        {loading ? (
          <Loader />
        ) : !matchId ? (
          <Box flex={1} alignItems={'center'} justifyContent={'center'}>
            <Text
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'sm'}
              color={'white'}>
              NO Details
            </Text>
          </Box>
        ) : (
          <>
            <Text
              mt={6}
              px={3}
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {t('Game details')}
            </Text>
            <Box mx={3} mt={3} bg={'background.400'}>
              <HStack alignItems={'center'} p={3}>
                <StopWatch height={20} width={20} />
                <Text
                  ml={3}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}
                  color={'white'}>
                  {gameDetails?.date_time?.start_time} {t('to')}{' '}
                  {gameDetails?.date_time?.end_time}
                </Text>
              </HStack>
              <Divider bg={'#2C3C56'} w={'90%'} alignSelf={'center'} />
              <HStack alignItems={'center'} p={3}>
                <Calender2 height={20} width={20} />
                <Text
                  ml={3}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}
                  color={'white'}>
                  {locale === 'en'
                    ? gameDetails?.date_time?.value_en
                    : gameDetails?.date_time?.value_ar}
                </Text>
              </HStack>
              <Divider bg={'#2C3C56'} w={'90%'} alignSelf={'center'} />
              <HStack
                alignItems={'center'}
                px={3}
                py={2}
                bg={'rgba(138,202,255,0.1)'}
                justifyContent={'space-between'}>
                <HStack alignItems={'center'}>
                  <Map2 height={20} width={20} />
                  <Text
                    ml={2}
                    fontFamily={'body'}
                    fontWeight={'100'}
                    fontStyle={'normal'}
                    fontSize={'sm'}
                    color={'white'}>
                    {locale === 'en'
                      ? gameDetails?.venue?.value_en
                      : gameDetails?.venue?.value_ar}
                  </Text>
                </HStack>
                <Text
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={10}
                  color={'white'}>
                  {gameDetails?.venue?.location}
                </Text>
              </HStack>
            </Box>
            <Text
              mt={6}
              mx={3}
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {t('Payment details')}
            </Text>
            <Box mx={3} mt={3} bg={'background.400'}>
              {paymentDetails.map(item => (
                <>
                  <HStack
                    alignItems={'center'}
                    p={3}
                    justifyContent={'space-between'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={'sm'}
                      color={
                        item.key === 'amount_paid'
                          ? 'yellow.400'
                          : item.key === 'reference_id'
                          ? 'secondary.400'
                          : 'white'
                      }>
                      {locale === 'en' ? item.title_en : item.title_ar}
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'200'}
                      fontStyle={'normal'}
                      fontSize={'sm'}
                      color={
                        item.key === 'amount_paid' ? 'yellow.400' : 'white'
                      }>
                      {item.value_en ? item.value_en + ' ' + 'KWD' : '0 KWD'}
                    </Text>
                  </HStack>
                  <Divider bg={'#2C3C56'} w={'90%'} alignSelf={'center'} />
                </>
              ))}
            </Box>
            {getTimeCondition()}
          </>
        )}
      </Box>
    </AppLayout>
  );
};
