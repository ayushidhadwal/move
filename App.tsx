import * as React from 'react';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {Provider as StoreProvider} from 'react-redux';

import {NativeBaseTheme} from './src/styles';
import AppNavigation from './src/navigation';
import './src/i18n';
import {store} from './src/store';
import WithAxios from './src/lib/WithAxios';
import {ErrorContextProvider} from './src/context/ErrorProvider';

export const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};

function App() {
  // const {url: initialUrl, processing} = useInitialURL();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (i18n.language === 'ar') {
  //     i18n?.changeLanguage('ar');
  //     I18nManager.forceRTL(true);
  //     I18nManager.allowRTL(true);
  //     // I18nManager.swapLeftAndRightInRTL(true);
  //   } else {
  //     i18n?.changeLanguage('en');
  //     I18nManager.forceRTL(false);
  //     I18nManager.allowRTL(false);
  //     // I18nManager.swapLeftAndRightInRTL(false);
  //   }
  // }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={'#0F1F38'} />
      <StoreProvider store={store}>
        <WithAxios>
          <NativeBaseProvider theme={NativeBaseTheme}>
            <ErrorContextProvider>
              <AppNavigation />
            </ErrorContextProvider>
          </NativeBaseProvider>
        </WithAxios>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
export default App;
