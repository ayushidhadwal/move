import React from 'react';
import {ImageBackground, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('screen').width;

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({children}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <ImageBackground
      source={require('../../assets/Background.jpg')}
      resizeMode={'cover'}
      style={{
        flex: 1,
        width: WIDTH,
        paddingTop: top,
      }}>
      {children}
    </ImageBackground>
  );
};
