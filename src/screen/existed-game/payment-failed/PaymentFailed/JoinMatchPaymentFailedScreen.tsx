import React, {FC} from 'react';
import {Box, Button, Icon, Image, Text} from 'native-base';
import {RootStackScreenProps} from '../../../../navigation/types';
import {AppLayout} from '../../../../component/common/AppLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

type Props = RootStackScreenProps<'JoinMatchPaymentFailed'>;

export const JoinMatchPaymentFailedScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <AppLayout>
      <Box flex={1} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={require('../../../../assets/img/failed.png')}
          size={'xl'}
          alt={'no img'}
          resizeMode={'contain'}
        />
        <Text
          my={3}
          textAlign={'center'}
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'md'}
          color={'red.400'}>
          {t('Your Payment has been declined.')}
        </Text>
        <Button
          variant={'solid'}
          w={'90%'}
          rounded={0}
          position={'absolute'}
          bottom={10}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'primary.400',
          }}
          endIcon={
            <Icon
              as={Ionicons}
              name="arrow-forward"
              size="sm"
              color={'primary.400'}
            />
          }
          onPress={() => navigation.goBack()}
          colorScheme={'secondary'}>
          {t('Please try again')}
        </Button>
      </Box>
    </AppLayout>
  );
};
