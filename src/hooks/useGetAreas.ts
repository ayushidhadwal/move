import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../lib/Axios';
import {ApiEndpoints} from '../store/ApiEndpoints';
import {useMessage} from './useMessage';

export type areaDTO = {
  id: number;
  name_en: string;
  name_ar: string;
  latitude: string;
  longitude: string;
};

export const useGetAreas = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [areaList, setAreaList] = useState<areaDTO[]>([]);

  const getAreasList = () => {
    Axios.get(ApiEndpoints.support.areas)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setAreaList(response.data.data);
        }
        setLoading(false);
      })
      .catch((error: any) => {
        setMessage(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAreasList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    areaList,
    dataLoading: loading,
  };
};
