import React, {FC, useState} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootBottomTabScreenProps} from '../../navigation/types';
import {AppLayout} from '../common/AppLayout';
import {AttendingScreen} from '../../screen/bookings/AttendingScreen';
import {PlayedScreen} from '../../screen/bookings/PlayedScreen';
import {useGetMatchBookingList} from '../../hooks/booking/useGetMatchBookingList';

type Props = RootBottomTabScreenProps<'BookingTopTab'>;

export const BookingTopTabNavigation: FC<Props> = () => {
  const {t} = useTranslation();
  const [screen, setScreen] = useState<string>('Attending');

  const {attendingList, playedList, loading} = useGetMatchBookingList();

  return (
    <AppLayout>
      <Box flex={1}>
        <Box w={'75%'} alignSelf={'center'} alignItems={'center'} p={3}>
          <Text
            fontFamily={'heading'}
            fontStyle={'italic'}
            color={'white'}
            textAlign={'center'}
            fontWeight={'100'}
            fontSize={'md'}>
            {t('My Bookings')}
          </Text>
        </Box>
        <HStack
          mt={2}
          mb={3}
          w={'85%'}
          alignSelf={'center'}
          borderColor={'yellow.400'}
          borderWidth={1}
          alignItems={'center'}>
          <Pressable
            alignItems={'center'}
            w={'50%'}
            justifyContent={'center'}
            bg={screen === 'Attending' ? 'yellow.400' : 'primary.400'}
            px={5}
            py={2}
            onPress={() => setScreen('Attending')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              textTransform={'capitalize'}
              color={screen === 'Attending' ? 'primary.400' : 'white'}>
              {t('Attending')}
            </Text>
          </Pressable>
          <Pressable
            alignItems={'center'}
            justifyContent={'center'}
            w={'50%'}
            bg={screen === 'Played' ? 'yellow.400' : 'primary.400'}
            px={4}
            py={2}
            onPress={() => setScreen('Played')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              textTransform={'capitalize'}
              color={screen === 'Played' ? 'primary.400' : 'white'}>
              {t('Played')}
            </Text>
          </Pressable>
        </HStack>
        {screen === 'Attending' ? (
          <AttendingScreen attendingList={attendingList} loading={loading} />
        ) : (
          screen === 'Played' && (
            <PlayedScreen playedList={playedList} loading={loading} />
          )
        )}
      </Box>
    </AppLayout>
  );
};
