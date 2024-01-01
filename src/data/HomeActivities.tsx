import {BasketBall, Football, Football1, Tennis} from '../component/svg';
import React from 'react';
import {ImageSourcePropType} from 'react-native';

export type HomeActivityItem = {
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

export type HomeJoinType = {
  game: string;
  img: ImageSourcePropType;
  type: string;
  id: string;
  user_id: string;
  match_id: string;
  sport_name: string;
  icon: React.ReactNode;
  name: string;
  sport_icon: string;
  date: string;
  start_time: string;
  player: string;
  gender_name: string;
  level_en: string;
  level_ar: string;
  venue: string;
  key1: number;
  key2: number;
  venue_details: {distance: string};
  avatar: ImageSourcePropType;
};

export type LiveScoreItem = {
  match_id: string;

  player1Name: string;
  player2Name: string;
  team_one_score: string;
  team_two_score: string;
  score1: string;
  address: string;
  host_image_url: ImageSourcePropType;
  app_player_url: ImageSourcePropType;
  app_player_name: string;
  matchVenue: string;
  host_image_name: string;
};

export const HomeActivity = [
  {
    id: '1',
    name: 'hussain24',
    img: require('../assets/data/playerImg.png'),
    game: 'Football',
    icon: <Football height={30} width={30} color={'white'} />,
    verses: '5 vs 5  ',
    date: '07 Feb 2023, 2:30 PM',
    type: 'Co-ed',
    level: 'Friendly',
    player: '9/10',
    address: 'Yarmouk Sports Club,Yarmouk',
    distance: '5.5 km',
    price: '7.500 KD',
  },
  {
    id: '2',
    name: 'ahamad15',
    img: require('../assets/data/user4.png'),
    game: 'Basketball',
    icon: <BasketBall height={30} width={30} color={'white'} />,
    verses: '5 vs 5  ',
    date: '07 Feb 2023, 2:30 PM',
    type: 'Co-ed',
    level: 'Advanced',
    player: '9/10',
    address: 'Tadhamon Sports Club, Al Farwaniyah',
    distance: '1.5 km',
    price: '8.000 KD',
  },
];

export const HomeJoin = [
  {
    id: '1',
    game: 'Football',
    icon: <Football width={10} height={10} color={'black'} />,
    name: 'Hussain24',
    img: require('../assets/data/playerImg.png'),
    date: '5-Feb-2023, 2:30 PM',
    player: '9/10',
    type: 'Co-ed',
    level: 'Friendly',
    address: 'Yarmouk Sports Club',
    distance: '5.5 km',
  },
  {
    id: '2',
    game: 'Basketball',
    icon: <BasketBall width={10} height={10} color={'black'} />,
    name: 'ahamad15',
    img: require('../assets/data/user4.png'),
    date: '5-Feb-2023, 3:00 PM',
    player: '9/10',
    type: 'Co-ed',
    level: 'Advanced',
    address: 'Tadhamon Sports Club',
    distance: '5.5 km',
  },
  {
    id: '3',
    game: 'Padle',
    icon: <Tennis width={10} height={10} color={'black'} />,
    name: 'Ali786',
    img: require('../assets/data/user2.png'),
    date: '5-Feb-2023, 14:00 PM',
    player: '9/10',
    type: 'Co-ed',
    level: 'New Comer',
    address: 'Qadsia Sports Club',
    distance: '5.5 km',
  },
  {
    id: '4',
    game: 'Football',
    icon: <Football width={10} height={10} color={'black'} />,
    name: 'Hussain24',
    img: require('../assets/data/playerImg.png'),
    date: '5-Feb-2023, 2:30 PM',
    player: '9/10',
    type: 'Co-ed',
    level: 'Friendly',
    address: 'Yarmouk Sports Club',
    distance: '5.5 km',
  },
  {
    id: '5',
    game: 'Basketball',
    icon: <BasketBall width={10} height={10} color={'black'} />,
    name: 'ahamad15',
    img: require('../assets/data/user4.png'),
    date: '5-Feb-2023, 3:00 PM',
    player: '9/10',
    type: 'Co-ed',
    level: 'Advanced',
    address: 'Tadhamon Sports Club',
    distance: '5.5 km',
  },
  {
    id: '6',
    game: 'Padle',
    icon: <Tennis width={10} height={10} color={'black'} />,
    name: 'Ali786',
    img: require('../assets/data/user2.png'),
    date: '5-Feb-2023, 14:00 PM',
    player: '9/10',
    type: 'Co-ed',
    level: 'New Comer',
    address: 'Qadsia Sports Club',
    distance: '5.5 km',
  },
];

export const LiveScore = [
  {
    id: '1',
    player1Img: require('../assets/data/playerImg.png'),
    player2Img: require('../assets/data/user2.png'),
    player1Name: 'Hussain24',
    player2Name: 'ali786',
    score1: '1',
    score2: '2',
    address: 'Qadsia Sports Club',
  },
  {
    id: '2',
    player1Img: require('../assets/data/playerImg.png'),
    player2Img: require('../assets/data/user2.png'),
    player1Name: 'Hussain24',
    player2Name: 'ali786',
    score1: '2',
    score2: '2',
    address: 'Qadsia Sports Club',
  },
];
