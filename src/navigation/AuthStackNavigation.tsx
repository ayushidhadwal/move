import * as React from 'react';
import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {SelectLocationScreen} from '../screen/location/SelectLocationScreen';
import {CurrentLocationScreen} from '../screen/location/CurrentLocationScreen';
import {ManualLocationScreen} from '../screen/location/ManualLocationScreen';
import {IntroductionScreen} from '../screen/introduction';
import {LoginScreen} from '../screen/auth/LoginScreen';
import {RegisterScreen} from '../screen/auth/RegisterScreen';
import {OTPScreen} from '../screen/auth/OTPScreen';
import {ForgotPasswordScreen} from '../screen/forgot-password/ForgotPasswordScreen';
import {ChangePasswordScreen} from '../screen/forgot-password/ChangePasswordScreen';

import {AuthStackParamsList} from './types';
import {RootState, useAppDispatch} from '../store';
import {AppLayout} from '../component/common/AppLayout';
import {Loader} from '../component/common/Loader';
import {restoreLocation} from '../store/location/locationSlice';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

function AuthStackNavigation() {
  const {locationLoading, lat, long} = useSelector(
    (state: RootState) => state.location,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreLocation());
  }, []);

  const isLocationAdded = lat && long;

  if (locationLoading) {
    return (
      <AppLayout>
        <Loader />
      </AppLayout>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLocationAdded && (
        <Stack.Group>
          <Stack.Screen
            name="SelectLocations"
            component={SelectLocationScreen}
          />
          <Stack.Screen
            name="CurrentLocation"
            component={CurrentLocationScreen}
          />
          <Stack.Screen
            name="ManualLocation"
            component={ManualLocationScreen}
          />
        </Stack.Group>
      )}
      <Stack.Screen name="Introduction" component={IntroductionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigation;
