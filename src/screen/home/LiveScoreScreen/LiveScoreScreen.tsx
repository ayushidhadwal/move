import React, {FC, useCallback, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {LiveScore, LiveScoreItem} from '../../../data/HomeActivities';
import {Header} from '../../../component/common/Header';
import {LiveScoreCard} from './components/LiveScoreCard';
import {useGetLiveScore} from '../../../hooks/home/useGetLiveScore';
import {Loader} from '../../../component/common/Loader';
import {useFocusEffect} from '@react-navigation/native';

type Props = RootStackScreenProps<'LiveScore'>;

export const LiveScoreScreen: FC<Props> = ({navigation}) => {
  const [fetchdata, setFetchData] = useState(true);
  const {LiveScore, liveScoreLoading} = useGetLiveScore(fetchdata);

  useFocusEffect(
    useCallback(() => {
      setFetchData(true);
      return () => {
        setFetchData(false);
      };
    }, []),
  );

  const {t} = useTranslation();

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

  return (
    <AppLayout>
      <Header heading={String(t('Live Score'))} tag={true} />
      {liveScoreLoading ? (
        <Loader />
      ) : (
        <Box flex={1} mx={3}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={LiveScore}
            renderItem={LiveScoreRenderItem}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </Box>
      )}
    </AppLayout>
  );
};
