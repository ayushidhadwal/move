import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {RootState, useAppDispatch} from '../../store';
import {getMatchJoiningDetails} from '../../store/game/matchJoinSlice';

export const useGetMatchJoiningDetails = (paymentId: number) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const setError = useError();

  const {bookingDetails, paymentDetails} = useSelector(
    (state: RootState) => state.matchJoin,
  );

  console.log('bookingDetails', bookingDetails);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        await dispatch(getMatchJoiningDetails({paymentId})).unwrap();
        setLoading(false);
      } catch (e: any) {
        setError(e.mess);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return {
    bookingDetails,
    paymentDetails,
    loading,
  };
};
