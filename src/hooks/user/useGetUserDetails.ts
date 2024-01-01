import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useError} from '../../context/ErrorProvider';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {ImageSourcePropType} from 'react-native';
import {block, follow, unFollow} from '../../store/follow/followSlice';
import {useAppDispatch} from '../../store';

export type userDTO = {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl: string;
  isFollowByMe: boolean;
  isFollowByUser: boolean;
  isBlockByMe: boolean;
  isBlockByUser: boolean;
};

export type randomUser = {
  id: number;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile: string;
  gender_id: number;
  email: string;
  dob: string;
  avatar: string;
  avatar_url: ImageSourcePropType;
  isFollowed: boolean;
};

export const useGetUserDetails = (userId: number | null) => {
  const navigation = useNavigation();
  const setMessage = useError();

  const [loading, setLoading] = useState<boolean>(true);
  const [follower, setFollower] = useState<string>('');
  const [following, setFollowing] = useState<string>('');
  const [gamesPlayed, setGamesPlayed] = useState<string>('');
  const [manOfTheMatch, setManOfTheMatch] = useState<string>('');
  const [randomUser, setRandomUser] = useState<randomUser[]>([]);

  const [userDetails, setUserDetails] = useState<userDTO>({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    avatarUrl: '',
    isFollowByMe: false,
    isFollowByUser: false,
    isBlockByMe: false,
    isBlockByUser: false,
  });

  const getUserDetails = async () => {
    await Axios.get(ApiEndpoints.user.getProfile, {params: {id: userId}})
      .then((response: any) => {
        console.log('response.data', response.data);
        if (response.data.status === 'ok') {
          setUserDetails({
            firstName: response.data.data.user.first_name
              ? response.data.data.user.first_name
              : '',
            middleName: response.data.data.user.middle_name
              ? response.data.data.user.middle_name
              : '',
            lastName: response.data.data.user.last_name
              ? response.data.data.user.last_name
              : '',
            username: response.data.data.user.username,
            email: response.data.data.user.email,
            avatarUrl: response.data.data.user.avatar,
            isFollowByMe: response.data.data.user.is_follow_by_me,
            isFollowByUser: response.data.data.user.is_follow_by_user,
            isBlockByMe: response.data.data.user.is_block_by_me,
            isBlockByUser: response.data.data.user.is_block_by_user,
          });
          const newArray = response.data.data.random_user.map(
            (obj: randomUser) => {
              return {...obj, isFollowed: false};
            },
          );
          setRandomUser(newArray);
          setFollower(response.data.data.follower_count);
          setFollowing(response.data.data.following_count);
          setManOfTheMatch(response.data.data.no_of_man_of_the_match);
          setGamesPlayed(response.data.data.no_of_game_played);
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
      getUserDetails();
    });

    return unsubscribe;
  }, [navigation]);

  const dispatch = useAppDispatch();

  const toggleUserFollow = async (status: boolean = true) => {
    if (status) {
      await dispatch(follow(String(userId))).unwrap();
    } else {
      await dispatch(unFollow(String(userId))).unwrap();
    }
    console.log(status);

    setUserDetails(prevState => ({
      ...prevState,
      isFollowByUser: status,
    }));

    return status;
  };

  const toggleBlockFollow = async (status: boolean) => {
    // type 1 for block and 2 for unblock
    if (status) {
      await dispatch(block({id: String(userId), type: 1})).unwrap();
    } else {
      await dispatch(block({id: String(userId), type: 2})).unwrap();
    }

    setUserDetails(prevState => ({
      ...prevState,
      isBlockByMe: status,
      isBlockByUser: !status,
      isFollowByUser: false,
    }));

    return status;
  };

  const toggleFollow = async (status: boolean = true, selectedId: string) => {
    if (status) {
      await dispatch(follow(String(selectedId))).unwrap();
    } else {
      await dispatch(unFollow(String(selectedId))).unwrap();
    }

    setRandomUser(prevState => {
      const x = [...prevState];
      const i = x.findIndex(n => String(n.id) === selectedId);
      if (i > -1) {
        x[i].isFollowed = status;
      }
      return x;
    });

    return status;
  };

  return {
    userDetails,
    loading,
    follower,
    following,
    gamesPlayed,
    manOfTheMatch,
    randomUser,
    toggleUserFollow,
    toggleBlockFollow,
    toggleFollow,
  };
};
