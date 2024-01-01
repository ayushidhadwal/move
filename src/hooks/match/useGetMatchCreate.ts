import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../../lib/Axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../store/ApiEndpoints';

export type sportsDTO = {
  id: number;
  sports_name: string;
  team_one_en: string;
  team_one_ar: string;
  team_two_en: string;
  team_two_ar: string;
  image: string;
  icon: string;
  image_url: string;
  icon_url: string;
  levels: [];
  active_icon_url: string;
};

export type venueDTO = {
  id: number;
  name_en: string;
  name_ar: string;
  details_en: string;
  details_ar: string;
  location: string;
  distance_key: number;
};
export type gameDTO = {id: number; title_en: string; title_ar: string};
export type accessDTO = {id: number; title_en: string; title_ar: string};
export type scoringDTO = {name_en: string; name_ar: string};

export type genderDTO = {
  id: number;
  icon: string;
  name: string;
  icon_url: string;
  active_icon_url: string;
};

export const useGetMatchCreate = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const [loading, setLoading] = useState<boolean>(true);
  const [sportsList, setSportsList] = useState<sportsDTO[]>([]);
  const [venueList, setVenueList] = useState<venueDTO[]>([]);
  const [gameList, setGameList] = useState<gameDTO[]>([]);
  const [accessList, setAccessList] = useState<accessDTO[]>([]);
  const [scoringList, setScoringList] = useState<scoringDTO[]>([]);
  const [genderList, setGenderList] = useState<genderDTO[]>([]);
  const [userList, setUserList] = useState('');

  const getMatchCreateList = () => {
    Axios.get(ApiEndpoints.match.create)
      .then((response: any) => {
        if (response.data.status === 'success') {
          setSportsList(response.data.data.sports);
          setVenueList(response.data.data.venue);
          setGameList(response.data.data.game_type);
          setAccessList(response.data.data.access_type);
          setScoringList(response.data.data.go_live_scoring);
          setGenderList(response.data.data.genders);
          setUserList(response.data.data.user_wallet_balance);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setMessage(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMatchCreateList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    sportsList,
    venueList,
    gameList,
    accessList,
    scoringList,
    genderList,
    userList,
    dataLoading: loading,
  };
};
