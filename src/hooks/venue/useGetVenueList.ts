import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {useMessage} from '../useMessage';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export type venueDTO = {
  id: number;
  name_en: string;
  name_ar: string;
  details_en: string;
  details_ar: string;
  location: string;
  distance_key: string;
};

export const useGetVenueList = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();
  const {userId} = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const [venueList, setVenueList] = useState<venueDTO[]>([]);

  const getVenueList = () => {
    // Axios.get(ApiEndpoints.venue.venueList.replace('USER_ID', String(userId)))
    Axios.get(ApiEndpoints.venue.venueList)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          console.log('asdfgh', response?.data?.data);
          setVenueList(response?.data?.data);
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
      getVenueList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    venueList,
    loading,
  };
};
