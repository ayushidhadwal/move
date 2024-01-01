import {ImageSourcePropType} from 'react-native';

export type blockDTO = {
  id: string;
  type: number;
};

type blockItem = {
  avatar_url: ImageSourcePropType;
  first_name: string;
  id: number;
  last_name: string;
  middle_name: string;
  username: string;
};

export type blockListDTO = {
  id: number;
  block_by: number;
  block_whome: blockItem;
};

type followerDetailsDTO = {
  id: number;
  username: string;
  avatar_url: string;
};

export type followerDTO = {
  id: number;
  follow_from: followerDetailsDTO;
  match_award: number;
};

type followingDetailsDTO = {
  id: number;
  username: string;
  avatar_url: string;
};

export type followingDTO = {
  id: number;
  follow_to: followingDetailsDTO;
  match_award: number;
  follow_from: number;
};
