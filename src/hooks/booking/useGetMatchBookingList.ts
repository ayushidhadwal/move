import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {RootState, useAppDispatch} from '../../store';
import {getBookingList} from '../../store/booking/bookingSlice';

export const useGetMatchBookingList = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const setError = useError();

  const {attendingList, playedList} = useSelector(
    (state: RootState) => state.booking,
  );

  const [loading, setLoading] = useState<boolean>(true);

  const getMatchBookingList = async () => {
    try {
      await dispatch(getBookingList()).unwrap();
      setLoading(false);
    } catch (e: any) {
      setError(e.mess);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMatchBookingList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    attendingList,
    playedList,
    loading,
  };
};
