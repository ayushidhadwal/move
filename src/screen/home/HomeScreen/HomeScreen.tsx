import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Box,
  CircleIcon,
  FlatList,
  HStack,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {RootBottomTabScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {HomeSlider} from './components/HomeSlider';
import {HomeHeader} from './components/HomeHeader';
import {ActivityCard} from './components/ActivityCard';
import {JoinCard} from './components/JoinCard';
import {
  HomeJoin,
  HomeJoinType,
  LiveScore,
  LiveScoreItem,
} from '../../../data/HomeActivities';
import {LiveScoreCard} from './components/LiveScoreCard';
import {getMatchList} from '../../../store/home/homeSlice';
import {RootState, useAppDispatch} from '../../../store';
import {useError} from '../../../context/ErrorProvider';
import {exploreDTO} from '../../../store/home/types';
import {Loader} from '../../../component/common/Loader';
import {useInit} from '../../../hooks/useInit';
import i18n from 'i18next';
import {useGetWishToJoin} from '../../../hooks/home/useGetWishToJoin';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../../styles';

import {useFocusEffect} from '@react-navigation/native';
import {useGetLiveScore} from '../../../hooks/home/useGetLiveScore';
import {useSelector} from 'react-redux';

type Props = RootBottomTabScreenProps<'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setError = useError();
  const {bannerList, dataLoading} = useInit();
  const [fetchdata, setFetchData] = useState(true);

  const {LiveScore, liveScoreLoading} = useGetLiveScore(fetchdata);

  const {HomeJoin, wishLoading, updateWishStatus} = useGetWishToJoin(fetchdata);
  const locale = i18n.language;
  const {userId} = useSelector((state: RootState) => state.auth);

  const [ActivityList, setActivityList] = useState<exploreDTO[]>([]);
  const [upcomingList, setUpcomingList] = useState<exploreDTO[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const search: string = '';
  const sports: string = '';
  const radius: string = '';
  const gender: string = '';
  const level: string = '';
  const newDate: string = '';

  useFocusEffect(
    useCallback(() => {
      setFetchData(true);
      return () => {
        setFetchData(false);
      };
    }, []),
  );

  const onFilterHandler = useCallback(async () => {
    console.log('calling onFilterHandler');
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
          isPaginate: '1',
        }),
      ).unwrap();
      if (res) {
        setActivityList(res.matchList);
        setUpcomingList(res.upcomingMatch);
      }
      setLoading(false);
    } catch (e: any) {
      // setError(e.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // onFilterHandler();
    const unsubscribe = navigation.addListener('focus', async () => {
      await onFilterHandler();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item, index}: {item: exploreDTO; index: number}) => {
    return item.host_id !== userId ? (
      <ActivityCard
        index={index}
        matchId={item?.match_id}
        name={item?.host_name}
        img={{uri: item?.host_image}}
        game={item?.sport_name}
        icon={item?.sport_icon}
        verses={item?.key2}
        genderIcon={item?.gender_icon}
        date={moment(item?.date).format('DD MMM') + ' , ' + item?.start_time}
        type={item?.gender_name}
        level={locale === 'en' ? item?.level_en : item?.level_ar}
        player={item?.key1 + ' / ' + item?.no_of_players}
        address={item.venue}
        distance={item?.venue_details?.distance}
        price={(item?.price.price_per_player * 100).toFixed(2) + ' KD'}
        onPressHandler={matchId =>
          navigation.navigate('GameTopTab', {screen: 'Info', matchId: matchId})
        }
      />
    ) : null;
  };

  const upcomingRenderItem = ({
    item,
    index,
  }: {
    item: exploreDTO;
    index: number;
  }) => {
    return (
      <ActivityCard
        index={index}
        matchId={item?.match_id}
        name={item?.host_name}
        img={{uri: item?.host_image}}
        game={item?.sport_name}
        icon={item?.sport_icon}
        verses={item?.key2}
        genderIcon={item?.gender_icon}
        date={moment(item?.date).format('DD MMM') + ' , ' + item?.start_time}
        type={item.gender_name}
        level={locale === 'en' ? item?.level_en : item?.level_ar}
        player={item?.key1 + ' / ' + item?.no_of_players}
        address={item?.venue}
        distance={item?.venue_details?.distance}
        price={(item?.price.price_per_player * 100).toFixed(2) + ' KD'}
        onPressHandler={matchId =>
          navigation.navigate('GameTopTab', {screen: 'Info', matchId: matchId})
        }
      />
    );
  };

  const joinRenderItem = ({
    item,
    index,
  }: {
    item: HomeJoinType;
    index: number;
  }) => (
    <JoinCard
      index={index}
      id={item?.id}
      game={item?.sport_name}
      icon={item?.icon}
      name={item?.name}
      img={{uri: item?.avatar}}
      date={moment(item?.date).format('DD MMM') + ' , ' + item?.start_time}
      player={item?.key1 + ' / ' + item?.key2}
      type={item?.gender_name}
      level={locale === 'en' ? item?.level_en : item?.level_ar}
      address={item?.venue}
      distance={item?.venue_details?.distance}
      userId={item?.user_id}
      matchId={item?.match_id}
      updateWishStatus={updateWishStatus}
    />
  );
  const LiveScoreRenderItem = ({
    item,
    index,
  }: {
    item: LiveScoreItem;
    index: number;
  }) => (
    <LiveScoreCard
      index={index}
      player1Img={{uri: item?.host_image_url}}
      player2Img={{uri: item?.app_player_url}}
      player1Name={item?.host_image_name}
      player2Name={item?.app_player_name}
      score1={item?.team_one_score}
      score2={item?.team_two_score}
      address={item?.matchVenue}
    />
  );

  console.log(LiveScore.length);

  return (
    <AppLayout>
      {loading || dataLoading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box flex={1} mb={5}>
            <HomeHeader />
            <HomeSlider data={bannerList} />
            {/*<Pressable onPress={() => navigation.navigate('Invitation')}>*/}
            {/*  <Text color={'white'}>invitaion screen</Text>*/}
            {/*</Pressable>*/}
            {/*<Pressable onPress={() => navigation.navigate('Follower')}>*/}
            {/*  <Text color={'white'}>follower screen</Text>*/}
            {/*</Pressable>*/}
            {/*<Pressable*/}
            {/*  onPress={() => navigation.navigate('SelectPlayer', {matchId: 1})}>*/}
            {/*  <Text color={'white'}>match review</Text>*/}
            {/*</Pressable>*/}
            {/*<Pressable*/}
            {/*  onPress={() => navigation.navigate('LiveScoring', {matchId: 1})}>*/}
            {/*  <Text color={'white'}>live scoring screen</Text>*/}
            {/*</Pressable>*/}
            {ActivityList.filter(activity => activity.host_id !== userId)
              .length > 0 && (
              <>
                <HStack
                  mx={3}
                  mb={3}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Text
                    color={'secondary.400'}
                    fontFamily={'heading'}
                    fontSize={'lg'}
                    fontWeight={'100'}
                    fontStyle={'italic'}
                    ml={0.8}>
                    {t('Activities around you')}
                  </Text>
                  <Text
                    onPress={() => navigation.navigate('ActivityAround')}
                    color={'secondary.400'}
                    fontFamily={'body'}
                    fontSize={'sm'}
                    fontWeight={'100'}
                    fontStyle={'italic'}>
                    {t('View more')}
                  </Text>
                </HStack>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={ActivityList}
                  renderItem={renderItem}
                  keyExtractor={item => String(item?.match_id)}
                />
              </>
            )}
            {HomeJoin.length > 0 ? (
              <HStack
                mx={3}
                my={3}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <HStack space={2}>
                  <Text
                    color={'secondary.400'}
                    fontFamily={'heading'}
                    fontSize={'lg'}
                    fontWeight={'100'}
                    fontStyle={'italic'}>
                    {t('Do you wish to join')}
                  </Text>
                  {wishLoading ? (
                    <ActivityIndicator color={Colors.secondary} />
                  ) : null}
                </HStack>
                <Text
                  onPress={() => navigation.navigate('MatchRequest')}
                  color={'secondary.400'}
                  fontFamily={'body'}
                  fontSize={'sm'}
                  fontWeight={'100'}
                  fontStyle={'italic'}>
                  {t('View more')}
                </Text>
              </HStack>
            ) : null}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={HomeJoin}
              renderItem={joinRenderItem}
              keyExtractor={item => item.id}
            />
            {LiveScore.length > 0 ? (
              <>
                <HStack
                  mx={3}
                  my={3}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <HStack space={2}>
                    <Text
                      color={'secondary.400'}
                      fontFamily={'heading'}
                      fontSize={'lg'}
                      fontWeight={'100'}
                      fontStyle={'italic'}>
                      <CircleIcon size={'2'} color={'red.600'} />
                      {t('Live Score')}
                    </Text>
                    {liveScoreLoading ? (
                      <ActivityIndicator color={Colors.secondary} />
                    ) : null}
                  </HStack>

                  <Text
                    onPress={() => navigation.navigate('LiveScore')}
                    color={'secondary.400'}
                    fontFamily={'body'}
                    fontSize={'sm'}
                    fontWeight={'100'}
                    fontStyle={'italic'}>
                    {t('View more')}
                  </Text>
                </HStack>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={LiveScore}
                  renderItem={LiveScoreRenderItem}
                  keyExtractor={item => String(item?.match_id)}
                />
              </>
            ) : null}
            {upcomingList.length > 0 ? (
              <>
                <HStack
                  mx={3}
                  my={3}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Text
                    color={'secondary.400'}
                    fontFamily={'heading'}
                    fontSize={'lg'}
                    fontWeight={'100'}
                    fontStyle={'italic'}>
                    {t('Upcoming')}
                  </Text>
                  <Text
                    onPress={() => navigation.navigate('UpcomingGames')}
                    color={'secondary.400'}
                    fontFamily={'body'}
                    fontSize={'sm'}
                    fontWeight={'100'}
                    fontStyle={'italic'}>
                    {t('View more')}
                  </Text>
                </HStack>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={upcomingList}
                  renderItem={upcomingRenderItem}
                  keyExtractor={item => String(item?.match_id)}
                />
              </>
            ) : null}
          </Box>
        </ScrollView>
      )}
    </AppLayout>
  );
};
