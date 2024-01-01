import React, {FC} from 'react';
import {Box, FlatList, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {BookingCard} from './components/BookingCard';
import {RootNavigationProps} from '../../../navigation/types';
import {BookingListDTO} from '../../../store/booking/types';
import {Loader} from '../../../component/common/Loader';
import i18n from 'i18next';

type Props = {
  attendingList: BookingListDTO[];
  loading: boolean;
};

export const AttendingScreen: FC<Props> = ({attendingList, loading}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationProps>();
  const locale = i18n.language;

  const renderItem = ({item, index}: {item: BookingListDTO; index: number}) => (
    <BookingCard
      index={index}
      date={locale === 'en' ? item?.date_en : item?.date_ar}
      transactionId={
        locale === 'en' ? item?.transaction_id_en : item?.transaction_id_ar
      }
      amountPaid={locale === 'en' ? item?.amount_paid_en : item?.amount_paid_ar}
      venueIcon={locale === 'en' ? item?.venue_icon_en : item?.venue_icon_ar}
      onPressHandler={() =>
        navigation.navigate('BookingDetails', {
          matchBookingId: item.match_booking_id,
        })
      }
    />
  );

  return (
    <Box flex={1}>
      {loading ? (
        <Loader />
      ) : attendingList && attendingList.length === 0 ? (
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <Text
            fontFamily={'body'}
            fontWeight={'200'}
            fontStyle={'normal'}
            fontSize={'sm'}
            color={'white'}>
            {t('No Bookings')}
          </Text>
        </Box>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={attendingList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </Box>
  );
};
