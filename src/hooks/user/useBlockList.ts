import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {RootState, useAppDispatch} from '../../store';
import {userBlockList} from '../../store/follow/followSlice';

export const useBlockList = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const setError = useError();

  const {blockList: blockedList} = useSelector(
    (state: RootState) => state.follow,
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        await dispatch(userBlockList()).unwrap();
        setLoading(false);
      } catch (e: any) {
        setError(e.mess);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return {
    blockedList,
    loading,
  };
};
