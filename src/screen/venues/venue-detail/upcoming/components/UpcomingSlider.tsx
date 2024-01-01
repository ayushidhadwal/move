import React, {useCallback, useEffect, useRef} from 'react';
import {Box, Image} from 'native-base';
import {Dimensions, FlatList} from 'react-native';

import {SliderDots} from './SliderDots';
import {upcomingImage} from '../../../../../hooks/venue/useGetVenueDetails';

const window = Dimensions.get('window');

export const UpcomingSlider = ({
  upcomingBanner,
}: {
  upcomingBanner: upcomingImage[];
}) => {
  const [index, setIndex] = React.useState<number>(0);
  const [sliderImage, setSliderImage] = React.useState<any[]>([]);

  useEffect(() => {
    if (upcomingBanner) {
      setSliderImage(upcomingBanner);
    }
  }, []);

  const onViewableItemsChanged = useCallback(
    (data: {changed: {index: number}[]}) => {
      setIndex(data.changed[0].index as number);
    },
    [],
  );

  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item}: {item: upcomingImage}) => {
    return (
      <Box
        flex={1}
        w={window.width}
        height={200}
        justifyContent={'center'}
        mt={2}>
        <Image
          source={{uri: item.image_url}}
          alt="slider img"
          w={'90%'}
          h={200}
          alignSelf={'center'}
        />
      </Box>
    );
  };

  return (
    <Box>
      <FlatList
        data={sliderImage}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: '50%',
        }}
        ref={flatListRef}
      />
      <SliderDots data={sliderImage} activeIndex={index} />
    </Box>
  );
};
