import React, {FC} from 'react';
import {Box, FlatList, ScrollView} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {UpcomingSlider} from './components/UpcomingSlider';
import {ExploreCard} from '../../../explore/components/ExploreCard';
import {
  upcomingDTO,
  upcomingImage,
} from '../../../../hooks/venue/useGetVenueDetails';
import {RootNavigationProps} from '../../../../navigation/types';
import {Loader} from '../../../../component/common/Loader';

type Props = {
  upcomingList: upcomingDTO[];
  upcomingBanner: upcomingImage[];
  dataLoading: boolean;
};

export const UpcomingScreen: FC<Props> = ({
  upcomingList,
  upcomingBanner,
  dataLoading,
}) => {
  const navigation = useNavigation<RootNavigationProps>();

  const renderItem = ({item, index}: {item: upcomingDTO; index: number}) => (
    <ExploreCard
      index={index}
      matchId={item.match_id}
      name={item.host_name}
      img={{uri: item.host_image}}
      game={item.sport_name}
      icon={item.sport_active_icon}
      verses={item.no_of_players}
      genderIcon={item.gender_icon}
      date={moment(item.date).format('DD MMM') + ' , ' + item.start_time}
      type={item.gender_name}
      level={item.level_en}
      player={item.key1 + ' / ' + item.key2}
      address={item.venue}
      distance={item.distance}
      price={(Number(item.price.price_per_player) * 100).toFixed(2) + ' KD'}
      onPressHandler={matchId =>
        navigation.navigate('GameTopTab', {screen: 'Info', matchId: matchId})
      }
    />
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      {dataLoading ? (
        <Loader />
      ) : (
        <Box mb={20}>
          <UpcomingSlider upcomingBanner={upcomingBanner} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={upcomingList}
            renderItem={renderItem}
            keyExtractor={item => String(item.match_id)}
          />
        </Box>
      )}
    </ScrollView>
  );
};
