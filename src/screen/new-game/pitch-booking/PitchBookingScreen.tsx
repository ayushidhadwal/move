import React, {FC} from 'react';
import {Box, Button, Image, Text} from 'native-base';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = RootStackScreenProps<'PitchBooking'>;

export const PitchBookingScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <AppLayout>
      <Header />
      <Box flex={1} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={require('../../../assets/img/pitch.png')}
          size={'2xl'}
          alt={'no img'}
          resizeMode={'contain'}
        />
        <Text
          mt={8}
          mb={8}
          fontFamily={'heading'}
          fontWeight={'100'}
          fontStyle={'italic'}
          fontSize={'xl'}
          color={'secondary.400'}>
          {t('Pitch Booking')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={Platform.OS === 'ios' ? 'md' : 15}
          px={5}
          lineHeight={25}
          textAlign={'center'}
          color={'white'}>
          {t('Pitch Booking Description')}{' '}
          <Text color={'secondary.400'} fontFamily={'body'} bold>
            {t('Move')}
          </Text>{' '}
          {t('does not reserve any pitches when you post a game')}
        </Text>
        <Box
          mt={3}
          p={5}
          bg={'background.400'}
          position={'absolute'}
          w={'100%'}
          bottom={0}>
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
            colorScheme={'secondary'}
            onPress={() => navigation.navigate('GamePolicy')}>
            {t('Get started')}
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
};
