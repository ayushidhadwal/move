import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {walletDTO} from '../../store/wallet/types';
import {useError} from '../../context/ErrorProvider';
import {useAppDispatch} from '../../store';
import {getPackages} from '../../store/wallet/walletSlice';

export const useCouponList = () => {
  const navigation = useNavigation();
  const setError = useError();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [couponList, setCouponList] = useState<walletDTO[]>([]);

  const getCouponList = async () => {
    try {
      const res = await dispatch(getPackages()).unwrap();
      if (res) {
        setCouponList(res.couponList);
      }
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCouponList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    couponList,
    dataLoading: loading,
  };
};
