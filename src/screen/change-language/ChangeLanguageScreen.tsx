import React, {FC} from 'react';
import {Dimensions, ImageBackground, Platform, I18nManager} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box, Button, HStack} from 'native-base';
import i18n from 'i18next';
import RNRestart from 'react-native-restart';

import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../../component/common/Header';
import {useTranslation} from 'react-i18next';
import {load, save} from '../../utils/storage';
import Config from '../../config';

type Props = RootStackScreenProps<'ChangeLanguage'>;

const WIDTH = Dimensions.get('screen').width;

export const ChangeLanguageScreen: FC<Props> = ({}) => {
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();

  const changeToArabic = async () => {
    i18n?.changeLanguage('ar');
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    I18nManager.swapLeftAndRightInRTL(true);
    await save(Config.USER_LANG, 'ar');
    RNRestart.restart();
  };

  const changeToEnglish = async () => {
    i18n?.changeLanguage('en');
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    I18nManager.swapLeftAndRightInRTL(false);
    await save(Config.USER_LANG, 'en');
    RNRestart.restart();
  };

  return (
    <ImageBackground
      source={require('../../assets/splash.png')}
      resizeMode={'cover'}
      style={{
        flex: 1,
        width: WIDTH,
        paddingTop: top,
      }}>
      <Box flex={1}>
        <Header heading={String(t('Change Language'))} />
        <HStack
          p={5}
          position={'absolute'}
          bottom={Platform.OS === 'ios' ? 5 : 0}
          w={'100%'}
          justifyContent={'space-between'}>
          <Button
            variant={'outline'}
            w={'48%'}
            rounded={0}
            onPress={changeToArabic}
            borderColor={'yellow.400'}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'white',
            }}
            colorScheme={'yellow'}>
            {t('العربية')}
          </Button>
          <Button
            variant={'solid'}
            w={'48%'}
            rounded={0}
            onPress={changeToEnglish}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}>
            English
          </Button>
        </HStack>
      </Box>
    </ImageBackground>
  );
};
