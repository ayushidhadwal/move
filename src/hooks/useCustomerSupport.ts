import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../lib/Axios';
import {ApiEndpoints} from '../store/ApiEndpoints';
import {useMessage} from './useMessage';

export type customerDTO = {
  email: string;
  whatsapp_number: string;
  instagram: string;
  youtube: string;
  snapchat: string;
};

export const useCustomerSupport = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const [loading, setLoading] = useState<boolean>(true);
  const [customerSupport, setCustomerSupport] = useState<customerDTO>({
    email: '',
    instagram: '',
    snapchat: '',
    whatsapp_number: '',
    youtube: '',
  });

  const getCustomerSupportList = () => {
    Axios.get(ApiEndpoints.support.customerSupport)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setCustomerSupport({
            whatsapp_number: response.data.data.whatsapp_number,
            email: response.data.data.email,
            instagram: response.data.data.instagram,
            snapchat: response.data.data.snapchat,
            youtube: response.data.data.youtube,
          });
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
      getCustomerSupportList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    customerSupport,
    dataLoading: loading,
  };
};
