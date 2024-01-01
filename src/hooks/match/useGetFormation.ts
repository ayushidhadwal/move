import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../../lib/Axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../store/ApiEndpoints';

export type formationDTO = {
  id: number;
  sport_id: number;
  no_of_players: number;
  title_en: string;
  title_ar: string;
  status: number;
};

export const useGetFormation = ({SportId}: {SportId: string}) => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formationList, setFormationList] = useState<formationDTO[]>([]);

  const getGetFormationList = () => {
    Axios.get(ApiEndpoints.match.matchFormation, {params: {sport_id: SportId}})
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setFormationList(response.data.data);
          setIsLoading(false);
        }
      })
      .catch((error: any) => {
        setMessage(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getGetFormationList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    formationList,
    isLoading,
  };
};
