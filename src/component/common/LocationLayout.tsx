import React from 'react';
import {Image} from 'native-base';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageBackground, Dimensions, StyleSheet} from 'react-native';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

type Props = {
  children: React.ReactNode;
};

export const LocationLayout = ({children}: Props) => {
  return (
    <ImageBackground
      source={require('../../assets/splash.png')}
      resizeMode={'cover'}
      style={{height: HEIGHT, width: WIDTH}}>
      {/*<SafeAreaView edges={['bottom', 'top']} style={styles.screen}>*/}
      {/*  <Image*/}
      {/*    source={require('../../assets/BlurLogo.png')}*/}
      {/*    alignSelf={'center'}*/}
      {/*    justifyContent={'center'}*/}
      {/*    w={180}*/}
      {/*    h={90}*/}
      {/*    resizeMode={'contain'}*/}
      {/*    alt={'no img'}*/}
      {/*  />*/}
      {children}
      {/*</SafeAreaView>*/}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
