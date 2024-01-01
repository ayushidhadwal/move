import React, {FC, useEffect, useState} from 'react';
import {Box, FlatList, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {GuestCard} from './components/GuestCard';
import {useFollowers} from '../../../hooks/user/useFollower';

import {RootState} from '../../../store';
import {followerDTO} from '../../../store/follow/types';
import {Loader} from '../../../component/common/Loader';
import {useGetMatchDetails} from '../../../hooks/match/useMatchDetails';

type Props = RootStackScreenProps<'ManageGuest'>;

export const ManageGuestScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {loggedInUserJoin, matchId} = route.params;

  console.log('loggedInUserJoin', loggedInUserJoin);

  const {userId} = useSelector((state: RootState) => state.auth);

  const {followerList, loading} = useFollowers(userId);
  const {info, dataLoading} = useGetMatchDetails({matchId});

  const [selectedPlayerList, setSelectedPlayerList] = useState<number[]>([]);

  const onPressHandler = () => {
    navigation.navigate('PaymentDetail', {
      matchId: matchId,
      selectedPlayerList: selectedPlayerList,
    });
  };

  useEffect(() => {
    if (!loggedInUserJoin) {
      selectedPlayerList.push(userId);
    }
  }, [loggedInUserJoin]);

  const selectedPlayer = (id: number) => {
    setSelectedPlayerList(prevState => {
      const x = [...prevState];
      const i = x.findIndex(n => n === id);
      if (i >= 0) {
        x.splice(i, 1);
      } else {
        x.push(id);
      }
      return x;
    });
  };

  const renderItem = ({item, index}: {item: followerDTO; index: number}) => (
    <GuestCard
      index={index}
      id={item.follow_from.id}
      guestName={item.follow_from.username}
      img={
        item.follow_from.avatar_url
          ? {uri: item.follow_from.avatar_url}
          : require('../../../assets/data/user2.png')
      }
      matchReward={item.match_award}
      onPressHandler={selectedPlayer}
      selectedPlayerList={selectedPlayerList}
    />
  );

  return (
    <AppLayout>
      <Header heading={String(t('Manage guests'))} />
      {loading || dataLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          {followerList.length === 0 ? (
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
              <Text
                color={'white'}
                fontFamily={'body'}
                fontWeight={'200'}
                fontStyle={'normal'}
                fontSize={'md'}>
                {t('No Data')}
              </Text>
            </Box>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={followerList}
              renderItem={renderItem}
              keyExtractor={item => String(item.id)}
            />
          )}
          {selectedPlayerList.length > 0 && !loggedInUserJoin ? (
            <Box p={5} bg={'background.400'}>
              <Pressable
                onPress={onPressHandler}
                p={3}
                bg={'secondary.400'}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'primary.400'}>
                  {t('Book')} {selectedPlayerList.length - 1} {t('slots')}
                </Text>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'primary.400'}>
                  {(selectedPlayerList.length - 1) *
                    Number(info?.price_per_player?.price_per_player)}{' '}
                  KD
                </Text>
              </Pressable>
            </Box>
          ) : (
            <Box p={5} bg={'background.400'}>
              <Pressable
                onPress={onPressHandler}
                p={3}
                bg={'secondary.400'}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'primary.400'}>
                  {t('Book')} {selectedPlayerList.length} {t('slots')}
                </Text>
                <Text
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={'primary.400'}>
                  {selectedPlayerList.length *
                    Number(info?.price_per_player?.price_per_player)}{' '}
                  KD
                </Text>
              </Pressable>
            </Box>
          )}
        </Box>
      )}
    </AppLayout>
  );
};
