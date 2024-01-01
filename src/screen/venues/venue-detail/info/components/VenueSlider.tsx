import React, {FC, useCallback, useEffect, useRef} from 'react';
import {Box, Image} from 'native-base';
import {Dimensions, FlatList} from 'react-native';

import {SliderDots} from './SliderDots';
import {venueImageDTO} from '../../../../../hooks/venue/useGetVenueDetails';

const WIDTH = Dimensions.get('screen').width;

export const VenueSlider = ({images}: {images: venueImageDTO[]}) => {
  const [index, setIndex] = React.useState<number>(0);
  const [sliderImage, setSliderImage] = React.useState<any[]>([]);

  useEffect(() => {
    if (images) {
      setSliderImage(images);
    }
  }, []);

  const onViewableItemsChanged = useCallback(
    (data: {changed: {index: number}[]}) => {
      setIndex(data.changed[0].index as number);
    },
    [],
  );

  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item}: {item: venueImageDTO}) => {
    return (
      <Box flex={1} w={WIDTH} height={200} justifyContent={'center'} mt={2}>
        <Image
          source={{uri: item.image_url}}
          alt="slider img"
          w={'90%'}
          h={250}
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
        keyExtractor={item => String(item.id)}
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
