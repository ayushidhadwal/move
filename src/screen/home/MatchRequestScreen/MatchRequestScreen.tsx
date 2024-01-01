import React, {FC} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {JoinCard} from './components/JoinCard';
import {HomeJoin, HomeJoinType} from '../../../data/HomeActivities';
import {Header} from '../../../component/common/Header';
import {useGetWishToJoin} from '../../../hooks/home/useGetWishToJoin';
import {Loader} from '../../../component/common/Loader';
import moment from 'moment';
import i18n from 'i18next';

type Props = RootStackScreenProps<'MatchRequest'>;

export const MatchRequestScreen: FC<Props> = ({navigation}) => {
  const {HomeJoin, wishLoading, updateWishStatus} = useGetWishToJoin();
  const locale = i18n.language;

  const {t} = useTranslation();

  const joinRenderItem = ({
    item,
    index,
  }: {
    item: HomeJoinType;
    index: number;
  }) => (
    <JoinCard
      id={item.id}
      index={index}
      game={item?.sport_name}
      icon={item?.icon}
      name={item?.name}
      img={{uri: item?.avatar}}
      date={moment(item?.date).format('DD MMM') + ' , ' + item?.start_time}
      player={item?.key1 + ' / ' + item?.key2}
      type={item?.gender_name}
      level={locale === 'en' ? item?.level_en : item?.level_ar}
      address={item?.venue}
      distance={item?.venue_details.distance}
      updateWishStatus={updateWishStatus}
    />
  );

  return (
    <AppLayout>
      <Header heading={String(t('Match Request'))} />
      {/*{wishLoading ? (*/}
      {/*  <Loader />*/}
      {/*) : (*/}
      <Box flex={1} mx={3}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={HomeJoin}
          renderItem={joinRenderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </Box>
      {/*)}*/}
    </AppLayout>
  );
};
