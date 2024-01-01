import React, {FC, useState} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../common/Header';
import {WhiteMapPin} from '../svg';
import {AppLayout} from '../common/AppLayout';
import {InfoScreen} from '../../screen/venues/venue-detail/info';
import {UpcomingScreen} from '../../screen/venues/venue-detail/upcoming';
import {ReviewScreen} from '../../screen/venues/venue-detail/review/ReviewScreen';
import {useGetVenueDetailsList} from '../../hooks/venue/useGetVenueDetails';

type Props = RootStackScreenProps<'TopTab'>;

export const TopTabNavigation: FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const [screen, setScreen] = useState<string>(route.params.screen);
  const venueId = route.params.venueId;
  const venueHeader = route.params.venueHeader;

  const {venueDetails, reviewList, upcomingList, upcomingBanner, dataLoading} =
    useGetVenueDetailsList(venueId);

  return (
    <AppLayout>
      <Box flex={1}>
        <Header heading={venueHeader}>
          <Pressable>
            <WhiteMapPin width={20} height={20} />
          </Pressable>
        </Header>
        <HStack
          mt={2}
          mb={3}
          w={'90%'}
          alignSelf={'center'}
          borderColor={'yellow.400'}
          bg={'red.700'}
          borderWidth={1}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Pressable
            w={'33%'}
            alignItems={'center'}
            bg={screen === 'Info' ? 'yellow.400' : 'primary.400'}
            px={5}
            py={2}
            onPress={() => setScreen('Info')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={11}
              textTransform={'capitalize'}
              color={screen === 'Info' ? 'primary.400' : 'white'}>
              {t('Info')}
            </Text>
          </Pressable>
          <Pressable
            w={'34%'}
            alignItems={'center'}
            bg={screen === 'Upcoming' ? 'yellow.400' : 'primary.400'}
            px={4}
            py={2}
            onPress={() => setScreen('Upcoming')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={11}
              textTransform={'capitalize'}
              color={screen === 'Upcoming' ? 'primary.400' : 'white'}>
              {t('Upcoming')}
            </Text>
          </Pressable>
          <Pressable
            alignItems={'center'}
            bg={screen === 'Review' ? 'yellow.400' : 'primary.400'}
            px={4}
            py={2}
            w={'33%'}
            onPress={() => setScreen('Review')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={11}
              textTransform={'capitalize'}
              color={screen === 'Review' ? 'primary.400' : 'white'}>
              {t('Reviews')}
            </Text>
          </Pressable>
        </HStack>
        {screen === 'Info' ? (
          <InfoScreen venueDetails={venueDetails} dataLoading={dataLoading} />
        ) : screen === 'Upcoming' ? (
          <UpcomingScreen
            upcomingList={upcomingList}
            upcomingBanner={upcomingBanner}
            dataLoading={dataLoading}
          />
        ) : (
          screen === 'Review' && (
            <ReviewScreen reviewList={reviewList} dataLoading={dataLoading} />
          )
        )}
      </Box>
    </AppLayout>
  );
};
