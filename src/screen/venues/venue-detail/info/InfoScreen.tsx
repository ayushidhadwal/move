import React, {FC} from 'react';
import {Box, HStack, ScrollView, Text} from 'native-base';

import {VenueSlider} from './components/VenueSlider';
import {venueDetailsDTO} from '../../../../hooks/venue/useGetVenueDetails';
import {Loader} from '../../../../component/common/Loader';

type Props = {
  venueDetails: venueDetailsDTO;
  dataLoading: boolean;
};

export const InfoScreen: FC<Props> = ({venueDetails, dataLoading}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      {dataLoading ? (
        <Loader />
      ) : (
        <Box mb={20}>
          <VenueSlider images={venueDetails.image} />
          <Text
            fontFamily={'body'}
            fontWeight={'200'}
            fontSize={'md'}
            color={'secondary.400'}
            py={2}
            px={5}>
            {venueDetails.name}
          </Text>
          <HStack px={5} key={String(venueDetails.id)}>
            <Text
              ml={2}
              mt={-2}
              mb={2}
              fontFamily={'body'}
              fontWeight={'100'}
              fontSize={'md'}
              color={'white'}>
              {venueDetails.details}
            </Text>
          </HStack>
        </Box>
      )}
    </ScrollView>
  );
};
