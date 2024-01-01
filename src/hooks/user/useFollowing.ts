import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useError} from '../../context/ErrorProvider';

import {getFollowingList} from '../../store/follow/followSlice';
import {RootState, useAppDispatch} from '../../store';
import {useSelector} from 'react-redux';

export const useFollowing = (userId: number | null) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const setError = useError();

  const {followingList} = useSelector((state: RootState) => state.follow);

  const [loading, setLoading] = useState<boolean>(true);

  const getFollowings = async () => {
    try {
      await dispatch(getFollowingList(userId)).unwrap();
      setLoading(false);
    } catch (e: any) {
      setError(e.mess);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFollowings();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    followingList,
    loading,
  };
};
