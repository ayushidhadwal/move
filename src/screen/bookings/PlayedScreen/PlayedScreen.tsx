import React, {FC} from 'react';
import {Box, FlatList, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {BookingCard} from '../AttendingScreen/components/BookingCard';
import {BookingListDTO} from '../../../store/booking/types';
import {RootNavigationProps} from '../../../navigation/types';
import {Loader} from '../../../component/common/Loader';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';

type Props = {
  playedList: BookingListDTO[];
  loading: boolean;
};

export const PlayedScreen: FC<Props> = ({playedList, loading}) => {
  const navigation = useNavigation<RootNavigationProps>();
  const {t} = useTranslation();
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
      ) : playedList && playedList.length === 0 ? (
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
          data={playedList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </Box>
  );
};
