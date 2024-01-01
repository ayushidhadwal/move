import React, {useEffect} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import AuthStackNavigation from './AuthStackNavigation';
import {Colors} from '../styles';
import RootStackNavigation from './RootStackNavigation';
import {restoreSession} from '../store/auth/authSlice';
import {RootState, useAppDispatch} from '../store';
import {Loader} from '../component/common/Loader';
import {AppLayout} from '../component/common/AppLayout';

const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: Colors.white,
  },
};

export default () => {
  const {token, userId, isLoading} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  const isLoggedIn = token && userId;

  if (isLoading) {
    return (
      <AppLayout>
        <Loader />
      </AppLayout>
    );
  }

  return (
    <NavigationContainer theme={NavigationTheme}>
      {isLoggedIn ? <RootStackNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
};
