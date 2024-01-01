import React, {FC, useEffect, useState} from 'react';
import {Box, FlatList, Input, Pressable, SearchIcon} from 'native-base';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

import {AppLayout} from '../../../component/common/AppLayout';
import {RootBottomTabScreenProps} from '../../../navigation/types';
import {Header} from '../../../component/common/Header';
import {PlusCircleFilled} from '../../../component/svg';
import {VenueCard} from './components/VenueCard';
import {useGetVenueList, venueDTO} from '../../../hooks/venue/useGetVenueList';
import {Loader} from '../../../component/common/Loader';
import {Empty} from '../../../component/common/Empty';
import i18n from 'i18next';
import {I18nManager} from 'react-native';

type Props = RootBottomTabScreenProps<'Venues'>;

export const VenuesScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const {venueList, loading} = useGetVenueList();
  const locale = i18n.language;

  const [select, setSelect] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<venueDTO[]>([]);

  useEffect(() => {
    if (venueList) {
      setFilteredDataSource([...venueList]);
    }
  }, [venueList]);

  const onSearchHandler = (searchText: string) => {
    setFilteredDataSource(
      venueList.filter(
        (item: venueDTO) =>
          item.name_en.toLowerCase().includes(searchText.toLowerCase()) ||
          item.name_ar.toLowerCase().includes(searchText.toLowerCase()) ||
          item.details_en.toLowerCase().includes(searchText.toLowerCase()) ||
          item.details_ar.toLowerCase().includes(searchText.toLowerCase()) ||
          item.location.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    setSearch(searchText);
  };

  const renderItem = ({item, index}: {item: venueDTO; index: number}) => (
    <VenueCard
      index={index}
      venueName={locale === 'en' ? item?.name_en : item?.name_ar}
      address={item?.location}
      distance={item?.distance_key}
      onPressHandler={() =>
        navigation.navigate('TopTab', {
          screen: 'Info',
          venueId: item.id,
          venueHeader: item?.name_en,
        })
      }
      value={select}
      id={String(item.id)}
    />
  );

  return (
    <AppLayout>
      <Box flex={1} mb={70}>
        <Header heading={String(t('Venues'))}>
          <Pressable onPress={() => navigation.navigate('RequestVenue')}>
            <PlusCircleFilled width={20} height={20} />
          </Pressable>
        </Header>
        <Input
          colorScheme={'primary'}
          size={'lg'}
          borderColor={'secondary.400'}
          variant="outline"
          w={'90%'}
          my={2}
          color={'white'}
          alignSelf={'center'}
          backgroundColor={'rgba(138,202,255,0.10)'}
          focusOutlineColor={'secondary.400'}
          InputLeftElement={<SearchIcon size="5" ml={3} color={'gray.400'} />}
          placeholder={String(t('Type here to search'))}
          placeholderTextColor={'gray.400'}
          _input={{
            selectionColor: '#ffffff',
            cursorColor: '#ffffff',
          }}
          cursorColor={'#ffffff'}
          selectionColor={'#ffffff'}
          onChangeText={onSearchHandler}
          value={search}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
        />
        {loading ? (
          <Loader />
        ) : venueList.length === 0 ? (
          <Empty />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        )}
      </Box>
    </AppLayout>
  );
};
