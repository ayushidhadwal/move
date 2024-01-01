import React, {FC, useEffect} from 'react';
import {Box, Button, Icon, Image, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackHandler} from 'react-native';

import {RootStackScreenProps} from '../../../../navigation/types';
import {AppLayout} from '../../../../component/common/AppLayout';
import {useTranslation} from 'react-i18next';

type Props = RootStackScreenProps<'GamePaymentSuccess'>;

export const GamePaymentSuccessScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

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

  return (
    <AppLayout>
      <Box flex={1} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={require('../../../../assets/img/wallet.png')}
          size={'xl'}
          alt={'no img'}
          resizeMode={'contain'}
        />
        <Text
          my={3}
          textAlign={'center'}
          fontFamily={'heading'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'yellow.400'}>
          {t('Payment Successfully Completed.')}
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
            fontStyle: 'normal',
            fontSize: 'sm',
            color: 'white',
          }}
          endIcon={<Icon as={Ionicons} name="arrow-forward" size="sm" />}
          onPress={() => navigation.navigate('Home')}
          colorScheme={'secondary'}>
          {t('Continue')}
        </Button>
      </Box>
    </AppLayout>
  );
};
