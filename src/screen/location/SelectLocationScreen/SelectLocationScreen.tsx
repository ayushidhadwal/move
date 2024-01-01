import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  Platform,
  Linking,
  AppState,
} from 'react-native';
import {Box, Button, Divider, Text} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import {useTranslation} from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';

import {AuthStackScreenProps} from '../../../navigation/types';
import {LocationLayout} from '../../../component/common/LocationLayout';
import {useError} from '../../../context/ErrorProvider';
import {useMessage} from '../../../hooks/useMessage';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

type Props = AuthStackScreenProps<'SelectLocations'>;

const WIDTH = Dimensions.get('screen').width;

export const SelectLocationScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const setError = useError();
  const setMessage = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // const appState = useRef(AppState.currentState);
  //
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     appState.current = nextAppState;
  //     if (appState.current === 'active') {
  //       locationPermission();
  //     }
  //   });
  //
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  //
  // const alertFun = () => {
  //   if (isError) {
  //     Alert.alert(
  //       'Important',
  //       'Unable to Request Location Permission. Please turn it on manually. Go to Settings > Privacy & Security > Location Services > Move ',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'OK',
  //           onPress: async () => {
  //             const url = 'App-Prefs:LOCATION_SERVICES';
  //             const supported = await Linking.canOpenURL(url);
  //             if (supported) {
  //               await Linking.openURL(url);
  //             } else {
  //               Alert.alert(`Not able to open setting.`);
  //             }
  //           },
  //         },
  //       ],
  //     );
  //   }
  // };
  //
  // const locationPermission = () => {
  //   if (isError) {
  //     alertFun();
  //     return;
  //   }
  //   Geolocation.requestAuthorization(
  //     () => {
  //       setIsError(false);
  //       getLocation();
  //     },
  //     error => {
  //       if (error.PERMISSION_DENIED === 1 && Platform.OS === 'ios') {
  //         if (isError) {
  //           alertFun();
  //         } else {
  //           setIsError(true);
  //         }
  //       } else {
  //         setError(`${error.code}, ${error.message}`);
  //       }
  //     },
  //   );
  // };

  const askLocationPermission = async () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    )
      .then(result => {
        console.log('result is,', result);
        switch (result) {
          case RESULTS.GRANTED:
            getLocation();
            break;
          case RESULTS.UNAVAILABLE:
            setError('This feature is not available on this device!');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ).then(requestResult => {
              if (requestResult === RESULTS.GRANTED) {
                getLocation();
              } else {
                // setMessage('The permission is denied! Please enable location permission.');
                // setError(
                //   'The permission is denied! Please enable location permission.',
                // );
                // openSettings().catch(settingsErr =>
                //   setError('Unable to open settings!'),
                // );
                navigation.navigate('ManualLocation');
                setMessage(String(t('LocationError')));
              }
            });
            break;
          case RESULTS.LIMITED:
            getLocation();
            break;
          case RESULTS.BLOCKED:
            // setError(
            //   'The permission is denied! Please enable location permission.',
            // );
            // openSettings().catch(settingsErr =>
            //   setError('Unable to open settings!'),
            // );

            navigation.navigate('ManualLocation');
            setMessage(String(t('LocationError')));
            break;
        }
      })
      .catch(e => {
        setError(e.message);
      });
  };

  const getLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        navigation.navigate('CurrentLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      error => {
        setError(`${error.code}, ${error.message}`);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <LocationLayout>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor={'#0f1f38'}
      />
      <ImageBackground
        source={require('../../../assets/modalBg.png')}
        resizeMode={'cover'}
        style={{
          width: WIDTH,
          height: Platform.OS === 'ios' ? 260 : 310,
          position: 'absolute',
          bottom: 0,
        }}>
        <Divider
          w={'8%'}
          bg={'yellow.400'}
          alignSelf={'center'}
          h={'1%'}
          borderRadius={5}
          mt={2.5}
        />
        <Text
          fontFamily="heading"
          fontWeight="100"
          fontStyle="italic"
          color={'white'}
          fontSize={'lg'}
          py={4}
          textAlign={'center'}>
          {t('Turn on your location')}
        </Text>
        <Divider bg={'#2C3C56'} width={'90%'} alignSelf={'center'} />
        <Box p={3}>
          <Text
            fontFamily={'body'}
            fontWeight="100"
            fontStyle="normal"
            color={'white'}
            textAlign={'center'}
            lineHeight={Platform.OS === 'android' ? 23 : 22}
            fontSize={'sm'}>
            {t('In order to provide seamless games feed')}
            <Text color={'yellow.400'}>{t('Move')}</Text>{' '}
            {t('would like to fetch your location')}
          </Text>
          <Button
            variant="solid"
            colorScheme={'secondary'}
            mt={3}
            mb={2}
            isLoading={loading}
            isDisabled={loading}
            spinnerPlacement={'end'}
            isLoadingText={String(t('Yes, locate me'))}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            onPress={askLocationPermission}>
            {t('Yes, locate me')}
          </Button>

          <Button
            variant="link"
            colorScheme={loading ? 'grey' : 'yellow'}
            disabled={loading}
            onPress={
              loading
                ? null
                : () => {
                    navigation.navigate('ManualLocation');
                  }
            }
            _text={{
              fontFamily: 'body',
              fontWeight: '200',
              fontStyle: 'normal',
              fontSize: 'md',
            }}>
            {t('No, I would like to choose manually')}
          </Button>
        </Box>
      </ImageBackground>
    </LocationLayout>
  );
};
