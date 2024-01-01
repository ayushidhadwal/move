import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../../lib/Axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../store/ApiEndpoints';

export type details = {
  title: string;
  description: string;
};

export type dateTime = {
  date: string;
  start_time: string;
};
export type formation = {
  titel_en: string;
  titel_ar: string;
  key1: number;
  key2: number;
  no_of_player: number;
};
export type level = {
  title_en: string;
  title_ar: string;
};
export type gender = {
  name: string;
  icon: string;
};
export type pricePerPlayer = {
  price_per_player: string;
};

export type imageDTO = {
  id: string;
  image: string;
  image_url: string;
};

export type venueDetails = {
  location: string;
  name: string;
  distance: string;
  image: imageDTO[];
};

export type playerDTO = {
  id: number;
  first_name: string;
  avatar_url: string;
};

export type teamOne = {
  title_en: string;
  title_ar: string;
  formation: number;
  added_players: string;
  players: playerDTO[];
  username: string;
};

export type infoDTO = {
  details: details;
  datetime: dateTime;
  formation: formation;
  level: level;
  gender: gender;
  price_per_player: pricePerPlayer;
  venue_details: venueDetails;
  team_one: teamOne;
  team_two: teamOne;
  is_host: isHost;
  is_privtae_invite_only: isPrivateInviteOnly;
  is_private_public_access: isPrivatePublicAccess;
  is_public_access: isPublicAccess;
  is_joined: isJoined;
  is_slot_full: isSlotFull;
};

export type lineupDTO = {
  team_one: teamOne;
  team_two: teamOne;
  is_joined: isjoined;
};

export const useGetMatchDetails = ({matchId}: {matchId: number}) => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<infoDTO | null>(null);
  const [lineup, setLineup] = useState<lineupDTO | null>(null);

  const getMatchDetails = () => {
    setLoading(true);
    Axios.get(ApiEndpoints.match.matchDetails, {params: {match_id: matchId}})
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setInfo(response.data.data.info);
          setLineup(response.data.data.lineup);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((error: any) => {
        setMessage(error);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMatchDetails();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    info,
    lineup,
    dataLoading: loading,
  };
};
