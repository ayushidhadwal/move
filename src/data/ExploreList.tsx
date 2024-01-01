import {
  BasketBall,
  Cricket,
  Football,
  Football1,
  Tennis,
} from '../component/svg';
import React from 'react';
import {ImageSourcePropType} from 'react-native';

export type ExploreItem = {
  id: string;
  name: string;
  img: ImageSourcePropType;
  game: string;
  icon: React.ReactNode;
  verses: string;
  date: string;
  type: string;
  level: string;
  player: string;
  address: string;
  distance: string;
  price: string;
};

export const ExploreList = [
  {
    id: '1',
    name: 'Ali786',
    img: require('../assets/data/user2.png'),
    game: 'Football',
    icon: <Football height={10} width={10} color={'black'} />,
    verses: '5 vs 5',
    date: '07 Feb, 2:30 PM',
    type: 'Co-ed',
    level: 'Friendly',
    player: '9/10',
    address: 'Qadsia Sports Club, Hawally ',
    distance: '5.5 km',
    price: '7.500 KD',
  },
  {
    id: '2',
    name: 'ahamad15',
    img: require('../assets/data/user4.png'),
    game: 'Basketball',
    icon: <BasketBall height={10} width={10} color={'black'} />,
    verses: '5 vs 5',
    date: '07 Feb, 2:30 PM',
    type: 'Co-ed',
    level: 'Advanced',
    player: '9/10',
    address: 'Tadhamon Sports Club, Al Farwaniyah',
    distance: '1.5 km',
    price: '9.000 KD',
  },
  {
    id: '3',
    name: 'hussain24',
    img: require('../assets/data/playerImg.png'),
    game: 'Padle',
    icon: <Tennis height={10} width={10} color={'black'} />,
    verses: 'Singles',
    date: '07 Feb, 2:30 PM',
    type: 'Men',
    level: 'Friendly',
    player: '1/2',
    address: 'Yarmouk Sports Club,Yarmouk',
    distance: '6.5 km',
    price: '10.500 KD',
  },
  {
    id: '4',
    name: 'maryam7',
    img: require('../assets/data/user3.png'),
    game: 'Tennis',
    icon: <Cricket height={10} width={10} color={'black'} />,
    verses: 'Doubles',
    date: '07 Feb, 2:30 PM',
    type: 'Women',
    level: 'Advanced',
    player: '2/4',
    address: 'Kuwait Sports Club, Kuwait city',
    distance: '4.25 km',
    price: '5.500 KD',
  },
];
