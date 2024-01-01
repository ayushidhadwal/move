import React, {FC} from 'react';
import {Box, Divider, Text, Image, Button} from 'native-base';
import {Dimensions, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';

import {AuthStackScreenProps} from '../../navigation/types';
import {Slider} from './components/Slider';
import {MoveButton} from '../../component/common/MoveButton';
import {useInit} from '../../hooks/useInit';

type Props = AuthStackScreenProps<'Introduction'>;

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('window').height;

export const IntroductionScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {introBannerList} = useInit();

  return (
    <ImageBackground
      source={require('../../assets/Background.jpg')}
      resizeMode={'cover'}
      style={{height: HEIGHT, width: WIDTH}}>
      <Box flex={4} bg={'primary.400'}>
        <Slider introBannerList={introBannerList} />
      </Box>
      <ImageBackground
        source={require('../../assets/modalBg.png')}
        resizeMode={'cover'}
        style={{width: WIDTH}}>
        <Divider
          w={'7%'}
          bg={'yellow.400'}
          alignSelf={'center'}
          h={'1%'}
          borderRadius={5}
        />
        <Image
          source={require('../../assets/Logo-01.png')}
          w={100}
          h={50}
          alt={'no img'}
          mt={3}
          alignSelf={'center'}
          resizeMode={'contain'}
        />
        <Box p={3} mb={5}>
          <Text
            fontFamily={'body'}
            fontWeight="200"
            fontStyle="normal"
            color={'white'}
            textAlign={'center'}
            lineHeight={20}
            fontSize={'md'}>
            {t('Join us and make an emphatic')}{' '}
            <Text color={'yellow.400'}>{t('Move')}</Text>
          </Text>
          <Button
            variant="link"
            colorScheme={'yellow'}
            onPress={() => navigation.navigate('Login')}
            _text={{
              fontFamily: 'body',
              fontWeight: '200',
              fontStyle: 'normal',
              fontSize: 'md',
            }}>
            {t('Sign in')}
          </Button>
          <MoveButton
            title={t('Create an account for free')}
            onPressHandler={() => navigation.navigate('Register')}
          />
        </Box>
      </ImageBackground>
    </ImageBackground>
  );
};
