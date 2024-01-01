import React, {FC, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {AppLayout} from '../../component/common/AppLayout';
import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../../component/common/Header';
import {FollowingCard} from './components/FollowingCard';
import {useFollowing} from '../../hooks/user/useFollowing';
import {Loader} from '../../component/common/Loader';
import {Empty} from '../../component/common/Empty';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';
import {unFollow} from '../../store/follow/followSlice';
import {ConfirmModal} from '../../component/common/ConfirmModal';
import {followingDTO} from '../../store/follow/types';

type Props = RootStackScreenProps<'Following'>;

export const FollowingScreen: FC<Props> = ({route}) => {
  const userId = route.params.userId;
  const [show, setShow] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const {t} = useTranslation();
  const {followingList, loading} = useFollowing(userId);
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const renderItem = ({item, index}: {item: followingDTO; index: number}) => (
    <FollowingCard
      index={index}
      followerId={item.follow_from}
      id={String(item.follow_to.id)}
      guestName={item.follow_to.username}
      img={
        item.follow_to.avatar_url
          ? {uri: item.follow_to.avatar_url}
          : require('../../assets/data/user2.png')
      }
      onClickHandler={id => {
        setSelectedId(String(id));
        setShow(true);
      }}
      matchReward={item.match_award}
    />
  );

  const onPressHandler = async () => {
    try {
      await dispatch(unFollow(selectedId)).unwrap();
      setShow(false);
      setMessage(String(t('Unfollowed Successfully !!!')));
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Following'))} />
      {loading ? (
        <Loader />
      ) : followingList.length === 0 ? (
        <Empty />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={followingList}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        </Box>
      )}
      <ConfirmModal
        message={String(t('Are you sure you want to unfollow?'))}
        onClose={() => setShow(false)}
        onPressHandler={onPressHandler}
        visible={show}
      />
    </AppLayout>
  );
};
