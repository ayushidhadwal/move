import React, {FC, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {AppLayout} from '../../component/common/AppLayout';
import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../../component/common/Header';
import {FollowerCard} from './components/FollowerCard';
import {useFollowers} from '../../hooks/user/useFollower';
import {Loader} from '../../component/common/Loader';
import {Empty} from '../../component/common/Empty';
import {ConfirmModal} from '../../component/common/ConfirmModal';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';
import {removeFollower} from '../../store/follow/followSlice';
import {followerDTO} from '../../store/follow/types';

type Props = RootStackScreenProps<'Follower'>;

export const FollowerScreen: FC<Props> = ({route}) => {
  const userId = route.params.userId;
  const [show, setShow] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const {t} = useTranslation();
  const {followerList, loading} = useFollowers(userId);
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const renderItem = ({item, index}: {item: followerDTO; index: number}) => {
    return (
      <FollowerCard
        // followerId={item.}
        index={index}
        id={String(item.follow_from.id)}
        guestName={item.follow_from.username}
        img={
          item.follow_from.avatar_url
            ? {uri: item.follow_from.avatar_url}
            : require('../../assets/data/user2.png')
        }
        onClickHandler={id => {
          setSelectedId(String(id));
          setShow(true);
        }}
        matchReward={item.match_award}
      />
    );
  };

  const onPressHandler = async () => {
    try {
      await dispatch(removeFollower(selectedId)).unwrap();
      setShow(false);
      setMessage(String(t('Removed Successfully !!!')));
    } catch (e: any) {
      setError(e);
      console.log(e);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Followers'))} />
      {loading ? (
        <Loader />
      ) : followerList.length === 0 ? (
        <Empty />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={followerList}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        </Box>
      )}
      <ConfirmModal
        message={String(t('Are you sure you want to remove the follower?'))}
        onClose={() => setShow(false)}
        onPressHandler={onPressHandler}
        visible={show}
      />
    </AppLayout>
  );
};
