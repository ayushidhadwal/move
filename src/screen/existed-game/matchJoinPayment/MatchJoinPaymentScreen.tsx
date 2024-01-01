import React, {FC, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {RootStackScreenProps} from '../../../navigation/types';
import BaseConfig from '../../../config/config.base';
import {useGetWishToJoin} from '../../../hooks/home/useGetWishToJoin';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {useMessage} from '../../../hooks/useMessage';

type Props = RootStackScreenProps<'MatchJoinPayment'>;

export const MatchJoinPaymentScreen: FC<Props> = ({navigation, route}) => {
  const {updateWishStatus} = useGetWishToJoin();
  const {userId} = useSelector((state: RootState) => state.auth);

  const url = route.params.url;
  const paymentId = route.params.paymentId;
  const matchId = route.params.matchId;
  const info = route.params.info;
  const webViewRef = useRef(null);

  console.log('matchId', matchId);

  const handleNavigationStateChange = async (navState: any) => {
    // if (navState.url === BaseConfig.successUrl) {

    console.log('url changed to ', navState.url);
    if (navState.url.includes('payment-success')) {
      if (info?.is_privtae_invite_only) {
        const res = await updateWishStatus(
          userId, // passing here currently logged in userid so host can understand who is sending joining request
          matchId,
          userId, // passing here currently logged in userid so host can understand who is sending joining request
          1, //host doing  public accesss 2  or user doing invite only 1,
          1, //cross icon 0   and accept button 1
        );
        // if () {
        navigation.navigate('PaymentSuccess', {
          paymentId: paymentId,
          matchId: matchId,
        });
        // }
      } else {
        navigation.navigate('PaymentSuccess', {
          paymentId: paymentId,
          matchId: matchId,
        });
      }
      // } else if (navState.url === BaseConfig.failedUrl) {
    } else if (navState.url.includes('payment-faild')) {
      navigation.replace('JoinMatchPaymentFailed');
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
