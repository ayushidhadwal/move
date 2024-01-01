import React, {useCallback, useRef} from 'react';
import {Box, Image} from 'native-base';
import {Dimensions, FlatList} from 'react-native';
import {SliderDots} from './SliderDots';
import {introBanner} from '../../../hooks/useInit';
import {Loader} from '../../../component/common/Loader';

const window = Dimensions.get('window');

export const Slider = ({introBannerList}: {introBannerList: introBanner[]}) => {
  const [index, setIndex] = React.useState<number>(0);

  const onViewableItemsChanged = useCallback(
    (data: {changed: {index: number}[]}) => {
      setIndex(data.changed[0].index as number);
    },
    [],
  );

  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item}: {item: introBanner}) => {
    return (
      <Box flex={1} w={window.width} justifyContent={'center'}>
        <Image
          // Loader
          // loadingIndicatorSource={require('../../../assets/img/refresh.png')}
          source={{uri: item.image_url}}
          alt="slider img"
          w={'100%'}
          h={'100%'}
          resizeMode={'stretch'}
        />
      </Box>
    );
  };

  return (
    <Box>
      <FlatList
        data={introBannerList}
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
      <SliderDots data={introBannerList} activeIndex={index} />
    </Box>
  );
};
