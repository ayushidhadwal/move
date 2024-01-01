import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Input, SearchIcon} from 'native-base';
import {FlatList, I18nManager} from 'react-native';
import {useTranslation} from 'react-i18next';

import {VenueCard} from '../../venues/venues/components/VenueCard';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {ProgressBar} from '../choose-sport/components/ProgressBar';
import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {
  useGetMatchCreate,
  venueDTO,
} from '../../../hooks/match/useGetMatchCreate';
import {Loader} from '../../../component/common/Loader';
import i18n from 'i18next';

type Props = RootStackScreenProps<'SelectLocation'>;

export const SelectLocationScreen: FC<Props> = ({navigation, route}) => {
  const SportId: string = route.params.SportId;
  const levelId: string = route.params.levelId;

  const [select, setSelect] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<venueDTO[]>([]);

  const {t} = useTranslation();
  const {venueList, dataLoading} = useGetMatchCreate();
  const locale = i18n.language;

  useEffect(() => {
    setFilteredDataSource([...venueList]);
  }, [venueList]);

  const onSearchHandler = (searchText: string) => {
    setFilteredDataSource(
      venueList.filter((item: venueDTO) =>
        item.name_en.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    setSearch(searchText);
  };

  const renderItem = ({item, index}: {item: venueDTO; index: number}) => (
    <VenueCard
      index={index}
      venueName={locale === 'en' ? item.name_en : item.name_ar}
      address={item.location}
      distance={String(item.distance_key)}
      onPressHandler={() => setSelect(String(item.id))}
      value={select}
      id={String(item.id)}
    />
  );

  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader
          heading={String(t('Select location'))}
          matchCreating={true}
        />
        <ProgressBar value={3} />
        <Box flex={1}>
          <Input
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
            colorScheme={'primary'}
            borderColor={'secondary.400'}
            size={'md'}
            variant="outline"
            w={'90%'}
            alignSelf={'center'}
            my={2}
            color={'white'}
            onChangeText={onSearchHandler}
            value={search}
            _input={{
              selectionColor: '#ffffff',
              cursorColor: '#ffffff',
            }}
            cursorColor={'#ffffff'}
            selectionColor={'#ffffff'}
            backgroundColor={'rgba(138,202,255,0.10)'}
            focusOutlineColor={'secondary.400'}
            InputLeftElement={<SearchIcon size="5" ml={3} color={'gray.400'} />}
            placeholder={String(t('Type here to search'))}
            placeholderTextColor={'gray.400'}
          />
          {dataLoading ? (
            <Loader />
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={filteredDataSource}
              renderItem={renderItem}
              keyExtractor={item => String(item.id)}
            />
          )}
        </Box>
        <HStack p={5} bg={'background.400'} justifyContent={'space-between'}>
          <Button
            variant={'outline'}
            w={'48%'}
            rounded={0}
            borderColor={'yellow.400'}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'white',
            }}
            colorScheme={'yellow'}
            onPress={() => navigation.goBack()}>
            {t('Back')}
          </Button>
          <Button
            variant={'solid'}
            w={'48%'}
            rounded={0}
            isDisabled={select === ''}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}
            onPress={() =>
              navigation.navigate('GameDetails', {
                venueId: select,
                SportId: SportId,
                levelId: levelId,
              })
            }>
            {t('Next')}
          </Button>
        </HStack>
      </Box>
    </AppLayout>
  );
};
