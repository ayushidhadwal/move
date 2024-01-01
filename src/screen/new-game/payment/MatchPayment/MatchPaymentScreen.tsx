import React, {FC, useRef} from 'react';
import {WebView} from 'react-native-webview';

import {RootStackScreenProps} from '../../../../navigation/types';
import BaseConfig from '../../../../config/config.base';

type Props = RootStackScreenProps<'MatchPayment'>;

export const MatchPaymentScreen: FC<Props> = ({navigation, route}) => {
  const url = route.params.url;
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (navState: any) => {
    console.log(navState.url);
    if (navState.url === BaseConfig.successUrl) {
      navigation.replace('GamePaymentSuccess');
    } else if (navState.url === BaseConfig.failedUrl) {
      navigation.replace('GamePaymentFailed');
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{uri: url}}
      style={{flex: 1}}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};
