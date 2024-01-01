import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, Button, SearchIcon, KeyboardAvoidingView, Text} from 'native-base';
import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Dimensions,
  View,
  Keyboard,
  Pressable,
  Image,
  Platform,
  Alert,
  PermissionsAndroid,
  I18nManager,
} from 'react-native';

import {
  AuthStackScreenProps,
  RootStackScreenProps,
} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {useTranslation} from 'react-i18next';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Axios} from '../../../lib/Axios';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import {ActivityIndicator} from 'react-native-paper';
import {
  locationSession,
  restoreLocation,
} from '../../../store/location/locationSlice';
import {useError} from '../../../context/ErrorProvider';
import {useMessage} from '../../../hooks/useMessage';
import {useAppDispatch} from '../../../store';

import Config from '../../../config';

import {load, save} from '../../../utils/storage';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = AuthStackScreenProps<'CurrentLocation'>;

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').width;

export const CurrentLocationScreen: FC<Props> = ({navigation, route}) => {
  const {latitude, longitude} = route.params;
  console.log('Passed lat longs are', latitude, longitude);
  const {t} = useTranslation();

  const mapViewRef = useRef<MapView>(null);

  const [lat, setLat] = useState<number>(29.3796532);
  const [long, setLong] = useState<number>(47.9734174);
  const [initialRegion, setInitialRegion] = useState({
    latitudeDelta: 0.0222,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.0222,
    latitude: latitude,
    longitude: longitude,
  });
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const [currentAddress, setCurrentAddress] = useState('');
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const dispatch = useAppDispatch();
  const setError = useError();
  const setMessage = useMessage();
  //Keyboard handling
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  //GET CURRENT LOCATION AND ANIMATE CAMERA

  useEffect(() => {
    // Request location permissions on mount
    // requestLocationPermission();

    if (latitude && longitude) {
      mapViewRef.current?.animateToRegion({
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
        latitude: latitude,
        longitude: longitude,
      });

      onChangeValue({
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
        latitude: latitude,
        longitude: longitude,
      });
      setMapLoading(false);
    } else {
      requestLocationPermission();
    }
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          // Handle permission denied
          setError(
            'The permission is denied! Please enable location permission.',
          );
          openSettings().catch(settingsErr =>
            setError('Unable to open settings!'),
          );
        }
      } catch (error) {
        console.warn('Error requesting location permission:', error);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status === 'granted') {
          getCurrentLocation();
        } else {
          const requestStatus = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (requestStatus === 'granted') {
            getCurrentLocation();
          } else {
            // Handle permission denied
            setError(
              'The permission is denied! Please enable location permission.',
            );
            openSettings().catch(settingsErr =>
              setError('Unable to open settings!'),
            );
          }
        }
      } catch (error) {
        console.warn('Error requesting location permission:', error);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        // setLocation({ latitude, longitude });
        mapViewRef.current?.animateToRegion({
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
          latitude: latitude,
          longitude: longitude,
        });

        onChangeValue({
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
          latitude: latitude,
          longitude: longitude,
        });
        setMapLoading(false);
      },
      error => {
        console.warn('Error getting current location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  //GET DETAILED ADDRESSS OF USER SELECTED LAT-LONG
  const onChangeValue = async (initialReg: any) => {
    setInitialRegion(initialReg);
    try {
      setLoading(true);
      const data = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          initialReg.latitude
        },${initialReg.longitude}&language=${
          I18nManager.isRTL ? 'ar' : 'en'
        }&key=AIzaSyCvjMpianVkHhfBNbiuKVTeTA1hNSXMpCI`,
      );
      setSelectedLocationData(data);

      let street = '';
      let area = '';
      let block = '';
      if (data.status === 200) {
        let address = '';
        for (let index = 1; index < data.data.results.length; index++) {
          address += data.data.results[index].formatted_address;
        }
        // console.log(
        //   '----------------------------------------------------------------------',
        // );

        data.data.results.forEach(element => {
          element['address_components'].forEach(e => {
            // console.log(e);
            if (e['types'].includes('route')) {
              if (street === '') street = e['long_name'];
            }
            if (
              e['types'].includes('locality') &&
              e['types'].includes('political')
            ) {
              if (area == '') area = e['long_name'];
            }
            if (e['types'].includes('neighborhood')) {
              if (block == '') block = e['long_name'];
            }
            // console.log(e['types']);
          });
        });
        // console.log('Street is');
        // console.log(street);
        // console.log('Block is');
        // console.log(block);
        // console.log('Area is');
        // console.log(area);
        // console.log(
        //   '----------------------------------------------------------------------',
        // );

        setLoading(false);

        setCurrentAddress(data.data.results[0].formatted_address);
      } else {
        setLoading(false);

        console.log(data.data);
      }
    } catch (e) {
      setLoading(false);

      Alert.alert('No Results');
    }
  };

  const updateHandler = async (lat: any, long: any) => {
    // setLoading(true);
    try {
      const loc = {
        lat: String(lat),
        long: String(long),
      };
      await locationSession(loc);
      setMessage(String(t('location updated successfully.')));
      dispatch(restoreLocation());
      printSelectedLocation();
      // navigation.goBack();
      navigation.navigate('Introduction');
      // setLoading(false);
    } catch (e: any) {
      setError(e.message);
      // setLoading(false);
    }
  };

  const printSelectedLocation = async () => {
    const locationData = await load(Config.USER_LOCATION);
    console.log('Selcted location data is', locationData);
  };

  return (
    <AppLayout>
      <Header heading={String(t('Your Location'))} />

      <View style={{flex: 1}}>
        <View style={{flex: 8}}>
          {mapLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
            </View>
          ) : (
            <MapView
              ref={mapViewRef}
              provider={PROVIDER_GOOGLE}
              style={{
                flex: 1,
              }}
              onPoiClick={e => {
                setLat(e.nativeEvent.coordinate.latitude);
                setLong(e.nativeEvent.coordinate.longitude);
                mapViewRef?.current?.animateToRegion({
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                  latitude: Number(e.nativeEvent.coordinate.latitude),
                  longitude: Number(e.nativeEvent.coordinate.longitude),
                });
              }}
              onRegionChangeComplete={onChangeValue}
              initialRegion={initialRegion}>
              {/* <MarkerAnimated
              coordinate={{
                latitude: lat,
                longitude: long,
              }}
            /> */}
            </MapView>
          )}

          {mapLoading ? null : (
            <View
              style={{
                top: '50%',
                left: '50%',

                marginLeft: -26,
                marginTop: -52,
                position: 'absolute',
              }}>
              <Image
                source={require('../../../../assets/images/marker.png')}
                style={{height: 48, width: 48}}
                resizeMode={'contain'}
              />
            </View>
          )}

          {mapLoading ? null : (
            <Pressable
              onPress={requestLocationPermission}
              style={{
                top: '88%',
                elevation: 20,
                borderColor: '#0F1F38',
                borderWidth: 1,
                right: 16,
                backgroundColor: 'white',
                borderRadius: 100,
                height: 42,
                width: 42,
                alignItems: 'center',
                justifyContent: 'center',

                // marginLeft: -24,
                // marginTop: -48,
                position: 'absolute',
              }}>
              <Image
                source={require('../../../../assets/images/crossHair.png')}
                style={{height: 32, width: 32}}
                resizeMode={'contain'}
              />
            </Pressable>
          )}
        </View>

        {mapLoading ? null : (
          <View
            style={{
              width: WIDTH - 32,

              flex: 1,

              position: 'absolute',

              right: 14,
              left: 12,
              top: 14,
            }}>
            <GooglePlacesAutocomplete
              placeholder={t('Search')}
              textInputProps={{
                selectionColor: 'black',
                fontFamily: 'Broaven',
                fontWeight: 'normal',
                fontStyle: 'italic',
                fontColor: 'balck',
              }}
              styles={{
                textInput: {
                  // height: 44,
                  width: 100,

                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                },
                row: {
                  backgroundColor: '#0f1f38',
                  padding: 13,
                  height: 44,
                  flexDirection: 'row',
                },
                separator: {
                  height: 0.5,
                  backgroundColor: '#ffffff',
                },
                description: {color: '#ffffff'},
                loader: {
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  height: 20,
                },
                listItem: {
                  backgroundColor: '#1c5fcb', // Background color of each suggestion tile
                  padding: 50,
                },
                poweredContainer: {
                  display: 'none',
                },
              }}
              renderRightButton={() => (
                <Pressable
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                  style={{
                    height: 44,
                    width: 56,
                    backgroundColor: 'white',
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <SearchIcon size="6" ml={3} color={'gray.400'} />
                  {/* <Image source={require('../../../assets/images/marker.png')}></Image> */}
                </Pressable>
              )}
              GooglePlacesDetailsQuery={{fields: 'geometry'}}
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                mapViewRef.current?.animateToRegion({
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                  latitude: Number(details?.geometry.location.lat),
                  longitude: Number(details?.geometry?.location.lng),
                });
              }}
              query={{
                key: 'AIzaSyCvjMpianVkHhfBNbiuKVTeTA1hNSXMpCI',
                language: I18nManager.isRTL ? 'ar' : 'en',
                components: 'country:kw',
              }}
              enableHighAccuracyLocation
              enablePoweredByContainer
            />
          </View>
        )}

        {keyboardVisible || currentAddress == '' ? null : (
          <View
            style={{
              flex: 2,
              backgroundColor: '#0f1f38',
              width: WIDTH,
              // height: 150,
            }}>
            <Text
              color={'#ffffff'}
              padding={2}
              textAlign={'center'}
              fontStyle={'italic'}
              fontFamily={'body'}>
              {currentAddress}
            </Text>
          </View>
        )}
      </View>
      {/*{*/}
      {/*  <KeyboardAvoidingView*/}
      {/*    flex="1"*/}
      {/*    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}*/}
      {/*  />*/}
      {/*}*/}
      {keyboardVisible || mapLoading ? null : (
        <Button
          onPress={() => {
            console.log('selected address is');
            console.log(selectedLocationData);
            updateHandler(initialRegion.latitude, initialRegion.longitude);
          }}
          variant="solid"
          colorScheme={'secondary'}
          alignSelf={'center'}
          w={'90%'}
          mt={-20}
          mb={2}
          spinnerPlacement={'end'}
          isLoadingText={'Next'}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'md',
            color: 'primary.400',
          }}>
          {t('Save')}
        </Button>
      )}
    </AppLayout>
  );
};

// import React, {FC, useEffect, useRef, useState} from 'react';
// import {Box, Button} from 'native-base';
// import {Alert, Dimensions, Keyboard,View} from 'react-native';

// import {AuthStackScreenProps} from '../../../navigation/types';
// import {AppLayout} from '../../../component/common/AppLayout';
// import {LocationHeader} from '../../../component/location/LocationHeader';
// import {useTranslation} from 'react-i18next';
// import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';
// import {locationSession} from '../../../store/location/locationSlice';
// import {useError} from '../../../context/ErrorProvider';
// import {useMessage} from '../../../hooks/useMessage';
// import { Header } from '../../../component/common/Header';
// import { ActivityIndicator } from 'react-native-paper';

// type Props = AuthStackScreenProps<'CurrentLocation'>;

// const WIDTH = Dimensions.get('screen').width;

// export const CurrentLocationScreen: FC<Props> = ({navigation, route}) => {
//   const {latitude, longitude} = route.params;

//   const {t} = useTranslation();
//   const setError = useError();
//   const setMessage = useMessage();

//   const mapViewRef = useRef<MapView>(null);

//   const [lat, setLat] = useState<number>(0);
//   const [long, setLong] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (latitude && longitude) {
//       setLong(longitude);
//       setLat(latitude);
//     }
//   }, []);

//   const onClickHandler = async () => {
//     setLoading(true);
//     try {
//       const loc = {
//         lat: String(lat),
//         long: String(long),
//       };
//       await locationSession(loc);
//       setMessage('location Added Successfully.');
//       navigation.navigate('Introduction');
//       setLoading(false);
//     } catch (e: any) {
//       setError(e.message);
//       setLoading(false);
//     }
//   };

//   //Keyboard handling
//   const [keyboardVisible, setKeyboardVisible] = useState(false);

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => setKeyboardVisible(true),
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => setKeyboardVisible(false),
//     );

//     // Clean up listeners
//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);
//   const [mapLoading, setMapLoading] = useState(true);

//   //GET DETAILED ADDRESSS OF USER SELECTED LAT-LONG
//   const onChangeValue = async (initialReg: any) => {
//     setInitialRegion(initialReg);
//     try {
//       setLoading(true);
//       const data = await Axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${initialReg.latitude},${initialReg.longitude}&key=AIzaSyCvjMpianVkHhfBNbiuKVTeTA1hNSXMpCI`,
//       );
//       setSelectedLocationData(data);

//       let street = '';
//       let area = '';
//       let block = '';
//       if (data.status === 200) {
//         let address = '';
//         for (let index = 1; index < data.data.results.length; index++) {
//           address += data.data.results[index].formatted_address;
//         }
//         // console.log(
//         //   '----------------------------------------------------------------------',
//         // );

//         data.data.results.forEach(element => {
//           element['address_components'].forEach(e => {
//             // console.log(e);
//             if (e['types'].includes('route')) {
//               if (street === '') street = e['long_name'];
//             }
//             if (
//               e['types'].includes('locality') &&
//               e['types'].includes('political')
//             ) {
//               if (area == '') area = e['long_name'];
//             }
//             if (e['types'].includes('neighborhood')) {
//               if (block == '') block = e['long_name'];
//             }
//             // console.log(e['types']);
//           });
//         });
//         // console.log('Street is');
//         // console.log(street);
//         // console.log('Block is');
//         // console.log(block);
//         // console.log('Area is');
//         // console.log(area);
//         // console.log(
//         //   '----------------------------------------------------------------------',
//         // );

//         setLoading(false);

//         setCurrentAddress(data.data.results[0].formatted_address);
//       } else {
//         setLoading(false);

//         console.log(data.data);
//       }
//     } catch (e) {
//       setLoading(false);

//       Alert.alert('No Results');
//     }
//   };

//   return (
//     // <AppLayout>
//     //   <Box flex={1}>
//     //     <LocationHeader />
//     //     <Box w={WIDTH} flex={1}>
//     //       <MapView
//     //         ref={mapViewRef}
//     //         provider={PROVIDER_GOOGLE}
//     //         style={{
//     //           width: '100%',
//     //           height: '100%',
//     //         }}
//     //         onPoiClick={e => {
//     //           setLat(e.nativeEvent.coordinate.latitude);
//     //           setLong(e.nativeEvent.coordinate.longitude);
//     //           mapViewRef?.current?.animateToRegion({
//     //             latitudeDelta: 0.04,
//     //             longitudeDelta: 0.05,
//     //             latitude: Number(e.nativeEvent.coordinate.latitude),
//     //             longitude: Number(e.nativeEvent.coordinate.longitude),
//     //           });
//     //         }}
//     //         initialRegion={{
//     //           latitude: lat,
//     //           longitude: long,
//     //           latitudeDelta: 0.0922,
//     //           longitudeDelta: 0.0421,
//     //         }}>
//     //         <MarkerAnimated
//     //           coordinate={{
//     //             latitude: lat,
//     //             longitude: long,
//     //           }}
//     //         />
//     //       </MapView>
//     //     </Box>
//     //     <Button
//     //       variant="solid"
//     //       colorScheme={'secondary'}
//     //       alignSelf={'center'}
//     //       w={'90%'}
//     //       mt={-20}
//     //       mb={5}
//     //       isLoading={loading}
//     //       isDisabled={loading}
//     //       spinnerPlacement={'end'}
//     //       isLoadingText={String(t('Next'))}
//     //       onPress={onClickHandler}
//     //       _text={{
//     //         fontFamily: 'heading',
//     //         fontWeight: '100',
//     //         fontStyle: 'italic',
//     //         fontSize: 'md',
//     //         color: 'primary.400',
//     //       }}>
//     //       {t('Next')}
//     //     </Button>
//     //   </Box>
//     // </AppLayout>

//     <AppLayout>
//     <Header heading={String(t('Change Location'))} />
//     <View style={{flex: 1}}>
//       <View style={{flex: 8}}>
//         {mapLoading ? (
//           <View
//             style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <ActivityIndicator></ActivityIndicator>
//           </View>
//         ) : (
//           <MapView
//             ref={mapViewRef}
//             provider={PROVIDER_GOOGLE}
//             style={{
//               flex: 1,
//             }}
//             onPoiClick={e => {
//               setLat(e.nativeEvent.coordinate.latitude);
//               setLong(e.nativeEvent.coordinate.longitude);
//               mapViewRef?.current?.animateToRegion({
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.015,
//                 latitude: Number(e.nativeEvent.coordinate.latitude),
//                 longitude: Number(e.nativeEvent.coordinate.longitude),
//               });
//             }}
//             onRegionChangeComplete={onChangeValue}
//             initialRegion={initialRegion}>
//             {/* <MarkerAnimated
//             coordinate={{
//               latitude: lat,
//               longitude: long,
//             }}
//           /> */}
//           </MapView>
//         )}

//         {mapLoading ? null : (
//           <View
//             style={{
//               top: '50%',
//               left: '50%',

//               marginLeft: -26,
//               marginTop: -52,
//               position: 'absolute',
//             }}>
//             <Image
//               source={require('../../../assets/images/marker.png')}
//               style={{height: 48, width: 48}}
//               resizeMode={'contain'}
//             />
//           </View>
//         )}

//         {mapLoading ? null : (
//           <Pressable
//           onPress={requestLocationPermission}
//             style={{
//               top: '88%',
//               elevation:20,
//               borderColor:'#0F1F38',
//               borderWidth:1,
//               right: 16,
//               backgroundColor:'white',
//               borderRadius:100,
//               height:42,
//               width:42,
//               alignItems:"center",
//               justifyContent:"center",

//               // marginLeft: -24,
//               // marginTop: -48,
//               position: 'absolute',
//             }}>
//             <Image
//               source={require('../../../assets/images/crossHair.png')}
//               style={{height: 32, width: 32}}
//               resizeMode={'contain'}
//             />
//           </Pressable>
//         )}
//       </View>

//       {mapLoading ? null : (
//         <View
//           style={{
//             width: WIDTH - 32,

//             flex: 1,

//             position: 'absolute',

//             right: 14,
//             left: 12,
//             top: 14,
//           }}>
//           <GooglePlacesAutocomplete
//             placeholder={'Search'}
//             textInputProps={{
//               selectionColor: 'black',
//               fontFamily: 'Broaven',
//               fontWeight: 'normal',
//               fontStyle: 'italic',
//               fontColor: 'balck',
//             }}
//             styles={{
//               textInput: {
//                 // height: 44,
//                 width: 100,

//                 borderTopRightRadius: 0,
//                 borderBottomRightRadius: 0,
//                 borderTopLeftRadius: 6,
//                 borderBottomLeftRadius: 6,
//               },
//               row: {
//                 backgroundColor: '#0f1f38',
//                 padding: 13,
//                 height: 44,
//                 flexDirection: 'row',
//               },
//               separator: {
//                 height: 0.5,
//                 backgroundColor: '#ffffff',
//               },
//               description: {color: '#ffffff'},
//               loader: {
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 height: 20,
//               },
//               listItem: {
//                 backgroundColor: '#1c5fcb', // Background color of each suggestion tile
//                 padding: 50,
//               },
//               poweredContainer: {
//                 display: 'none',
//               },
//             }}
//             renderRightButton={() => (
//               <Pressable
//                 onPress={() => {
//                   Keyboard.dismiss();
//                 }}
//                 style={{
//                   height: 44,
//                   width: 56,
//                   backgroundColor: 'white',
//                   borderTopRightRadius: 6,
//                   borderBottomRightRadius: 6,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <SearchIcon size="6" ml={3} color={'gray.400'} />
//                 {/* <Image source={require('../../../assets/images/marker.png')}></Image> */}
//               </Pressable>
//             )}
//             GooglePlacesDetailsQuery={{fields: 'geometry'}}
//             fetchDetails={true}
//             onPress={(data, details = null) => {
//               // 'details' is provided when fetchDetails = true
//               console.log(data, details);
//               mapViewRef.current?.animateToRegion({
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.015,
//                 latitude: Number(details?.geometry.location.lat),
//                 longitude: Number(details?.geometry?.location.lng),
//               });
//             }}
//             query={{
//               key: 'AIzaSyCvjMpianVkHhfBNbiuKVTeTA1hNSXMpCI',
//               language: 'en',
//               components: 'country:kw',
//             }}
//             enableHighAccuracyLocation
//             enablePoweredByContainer
//           />
//         </View>
//       )}

//       {keyboardVisible || currentAddress == '' ? null : (
//         <View
//           style={{
//             flex: 2,
//             backgroundColor: '#0f1f38',
//             width: WIDTH,
//             // height: 150,
//           }}>
//           <Text color={'#ffffff'} padding={2} textAlign={'center'} fontStyle={'italic'}  fontFamily={'body'}>
//             {currentAddress}
//           </Text>
//         </View>
//       )}
//     </View>
//     {/* <KeyboardAvoidingView
//       flex="1"
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

//     </KeyboardAvoidingView> */}
//     {keyboardVisible || mapLoading ? null : (
//       <Button
//         onPress={() => {
//           // console.log('selected address is');
//           // console.log(selectedLocationData);
//           // updateHandler(initialRegion.latitude,initialRegion.longitude)
//         }}
//         variant="solid"
//         colorScheme={'secondary'}
//         alignSelf={'center'}
//         w={'90%'}
//         mt={-20}
//         mb={2}
//         spinnerPlacement={'end'}
//         isLoadingText={'Next'}
//         _text={{
//           fontFamily: 'heading',
//           fontWeight: '100',
//           fontStyle: 'italic',
//           fontSize: 'md',
//           color: 'primary.400',
//         }}>
//         {t('Update')}
//       </Button>
//     )}
//   </AppLayout>
//   );
// };
