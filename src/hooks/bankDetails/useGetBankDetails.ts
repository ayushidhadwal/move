import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {useMessage} from '../useMessage';

export type bankDetailsDTO = {
  accountHolderName: string;
  bankName: string;
  iban: string;
};

export const useGetBankDetails = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const [loading, setLoading] = useState<boolean>(true);
  const [bankDetails, setBankDetails] = useState<bankDetailsDTO>({
    accountHolderName: '',
    bankName: '',
    iban: '',
  });

  const getBankDetailsList = () => {
    Axios.get(ApiEndpoints.bankDetails.details)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          console.log(response.data);

          setBankDetails({
            accountHolderName: response.data?.data?.account_holder_name,
            bankName: response.data?.data?.bank_name,
            iban: response.data?.data?.iban,
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
      getBankDetailsList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    bankDetails,
    dataLoading: loading,
  };
};
