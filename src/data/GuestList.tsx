import {ImageSourcePropType} from 'react-native';

export type GuestItem = {
  id: string;
  guestName: string;
  img: ImageSourcePropType;
};

export const GuestList = [
  {
    id: '1',
    guestName: 'hussain24',
    img: require('../assets/data/playerImg.png'),
  },
  {
    id: '2',
    guestName: 'goncalo12',
    img: require('../assets/data/user7.png'),
  },
  {
    id: '3',
    guestName: 'hugo ',
    img: require('../assets/data/user8.png'),
  },
  {
    id: '4',
    guestName: '1william ',
    img: require('../assets/data/user6.png'),
  },
];
