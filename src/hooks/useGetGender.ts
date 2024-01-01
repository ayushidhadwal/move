import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../lib/Axios';
import {ApiEndpoints} from '../store/ApiEndpoints';
import {useMessage} from './useMessage';

export type genderDTO = {
  id: number;
  icon: string;
  name: string;
  active_icon: string;
  icon_url: string;
  active_icon_url: string;
};

export const useGetGender = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [genderList, setGenderList] = useState<genderDTO[]>([]);

  const getGenderList = () => {
    Axios.get(ApiEndpoints.support.getGender)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setGenderList(response.data.data);
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
      getGenderList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    genderList,
    dataLoading: loading,
  };
};
