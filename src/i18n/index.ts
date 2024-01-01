import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import English from './en.json';
import Arabic from './ar.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: English},
    ar: {translation: Arabic},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'ar'],
});

export default i18n;
