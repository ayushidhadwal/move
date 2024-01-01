import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {Axios} from '../../lib/Axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {sportsDTO} from '../useInit';
import {RootState} from '../../store';

export const useGetSelectedSports = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const {userId} = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSportsList, setSelectedSportsList] = useState<sportsDTO[]>([]);

  const getGetSelectedSports = () => {
    Axios.get(ApiEndpoints.support.selectedSport, {params: {id: userId}})
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setSelectedSportsList(response.data.data);
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
      getGetSelectedSports();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    selectedSportsList,
    isLoading,
  };
};
