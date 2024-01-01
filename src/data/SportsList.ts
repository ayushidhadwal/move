import {ImageSourcePropType} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n';

export type SportsListItem = {
  title: string;
  id: string;
  image: ImageSourcePropType;
};

export const SportsList = [
  {
    id: '1',
    title: `${i18n.t('Football')}`,
    image: require('../assets/data/img1.png'),
  },
  {
    id: '2',
    title: `${i18n.t('Tennis')}`,
    image: require('../assets/data/img2.png'),
  },
  {
    id: '3',
    title: `${i18n.t('Padel')}`,
    image: require('../assets/data/img3.png'),
  },
  {
    id: '4',
    title: `${i18n.t('Basket Ball')}`,
    image: require('../assets/data/img4.png'),
  },
];
