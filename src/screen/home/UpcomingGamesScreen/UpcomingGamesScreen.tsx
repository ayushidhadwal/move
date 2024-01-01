import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, FlatList, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {getMatchList} from '../../../store/home/homeSlice';
import {useAppDispatch} from '../../../store';
import {useError} from '../../../context/ErrorProvider';
import {exploreDTO} from '../../../store/home/types';
import {Header} from '../../../component/common/Header';
import {Loader} from '../../../component/common/Loader';
import {ActivityCard} from '../ActivityAroundScreen/components/ActivityCard';

type Props = RootStackScreenProps<'UpcomingGames'>;

export const UpcomingGamesScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setError = useError();

  const [upcomingList, setUpcomingList] = useState<exploreDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const search: string = '';
  const sports: string = '';
  const radius: string = '';
  const gender: string = '';
  const level: string = '';
  const newDate: string = '';

  const onFilterHandler = useCallback(async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getMatchList({
          search,
          newDate,
          sports,
          radius,
          gender,
          level,
          isPaginate: '',
        }),
      ).unwrap();
      if (res) {
        setUpcomingList(res.upcomingMatch);
      }
      setLoading(false);
    } catch (e: any) {
      setError(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await onFilterHandler();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item, index}: {item: exploreDTO; index: number}) => (
    <ActivityCard
      index={index}
      matchId={item?.match_id}
      name={item?.host_name}
      img={{uri: item?.host_image}}
      game={item?.sport_name}
      icon={item?.sport_icon}
      verses={item?.no_of_players}
      genderIcon={item?.gender_icon}
      date={moment(item?.date).format('DD MMM') + ' , ' + item?.start_time}
      type={item?.gender_name}
      level={item?.level_en}
      player={item?.key1 + ' / ' + item?.key2}
      address={item?.venue}
      distance={item?.venue_details?.distance}
      price={(item?.price.price_per_player * 100).toFixed(2) + ' KD'}
      onPressHandler={(matchId: number) =>
        navigation.navigate('GameTopTab', {screen: 'Info', matchId: matchId})
      }
    />
  );

  return (
    <AppLayout>
      {loading ? (
        <Loader />
      ) : (
        <Box flex={1} mx={3}>
          <Header heading={String(t('Upcoming Games'))} />
          {upcomingList.length === 0 ? (
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
              <Text
                color={'secondary.400'}
                fontFamily={'body'}
                fontSize={'sm'}
                fontWeight={'100'}>
                No data
              </Text>
            </Box>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={upcomingList}
              renderItem={renderItem}
              keyExtractor={item => String(item.match_id)}
            />
          )}
        </Box>
      )}
    </AppLayout>
  );
};
