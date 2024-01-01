import {ImageSourcePropType} from 'react-native';
import React from 'react';
import {Cricket} from '../component/svg';

export type VenueItem = {
  id: string;
  venueName: string;
  address: string;
  distance: string;
};

export type UpcomingItem = {
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

export const VenueList = [
  {
    id: '1',
    venueName: 'Yarmouk Sports Club',
    address: 'St 8, Block 5, Mishref,',
    distance: '6.5 km',
  },
  {
    id: '2',
    venueName: 'Kuwait Sports Club',
    address: 'St 59, Block 80, Kuwait City',
    distance: '4.5 km',
  },
  {
    id: '3',
    venueName: 'Tadhamon Sports Club',
    address: 'Baghdad Street, Block 1, Hawally',
    distance: '5.5 km',
  },
  {
    id: '4',
    venueName: 'Qadsia Sports club',
    address: 'Baghdad Street, Block 1, Hawally',
    distance: '5.5 km',
  },
];

export const UpcomingList = [
  {
    id: '1',
    name: 'maryam7',
    img: require('../assets/data/user3.png'),
    game: 'Tennis',
    icon: <Cricket height={10} width={10} color={'black'} />,
    verses: 'Doubles',
    date: '10 Feb, 2:30 PM',
    type: 'Women',
    level: 'Friendly',
    player: '2/4',
    address: 'Kuwait Sports Club, Kuwait city',
    distance: '4.25 km',
    price: '5.500 KD',
  },
  {
    id: '2',
    name: 'ruqiya8',
    img: require('../assets/data/user5.png'),
    game: 'Tennis',
    icon: <Cricket height={10} width={10} color={'black'} />,
    verses: 'Singles',
    date: '10 Feb, 2:30 PM',
    type: 'Women',
    level: 'Friendly',
    player: '2/4',
    address: 'St 59, Block 80, Kuwait City',
    distance: '4.25 km',
    price: '8.500 KD',
  },
];
