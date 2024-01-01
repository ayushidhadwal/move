import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {RootState, useAppDispatch} from '../../store';
import {userFollowerList} from '../../store/follow/followSlice';

export const useFollowers = (id: number | null) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const setError = useError();

  const {followerList} = useSelector((state: RootState) => state.follow);

  const [loading, setLoading] = useState<boolean>(true);

  const getFollowers = async () => {
    try {
      await dispatch(userFollowerList(id)).unwrap();
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFollowers();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    followerList,
    loading,
  };
};
