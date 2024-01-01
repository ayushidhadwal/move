import React, {FC, useEffect, useState} from 'react';
import {
  ArrowBackIcon,
  Box,
  FlatList,
  HStack,
  Input,
  Pressable,
  SearchIcon,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {areaDTO, useGetAreas} from '../../../hooks/useGetAreas';
import {Loader} from '../../../component/common/Loader';
import {I18nManager} from 'react-native';

type Props = AuthStackScreenProps<'ManualLocation'>;

export const ManualLocationScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const {areaList, dataLoading} = useGetAreas();

  const [filteredDataSource, setFilteredDataSource] = useState<areaDTO[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setFilteredDataSource([...areaList]);
  }, [areaList]);

  const onSearchHandler = (searchText: string) => {
    setFilteredDataSource(
      areaList.filter((item: areaDTO) =>
        item.name_en.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    setSearch(searchText);
  };

  const onClickHandler = async (item: areaDTO) => {
    navigation.navigate('CurrentLocation', {
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    });
  };

  return (
    <AppLayout>
      {dataLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <HStack alignItems={'center'} p={3}>
            <ArrowBackIcon
              color="white"
              size="5"
              mr={3}
              onPress={() => navigation.goBack()}
            />
            <Input
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              colorScheme={'primary'}
              size={'md'}
              borderColor={'secondary.400'}
              variant="outline"
              w={'85%'}
              color={'white'}
              backgroundColor={'rgba(138,202,255,0.10)'}
              focusOutlineColor={'secondary.400'}
              InputLeftElement={
                <SearchIcon size="5" ml={3} color={'gray.400'} />
              }
              placeholder={String(t('Type here to search'))}
              placeholderTextColor={'gray.400'}
              onChangeText={onSearchHandler}
              value={search}
              _input={{
                selectionColor: '#ffffff',
                cursorColor: '#ffffff',
              }}
              cursorColor={'#ffffff'}
              selectionColor={'#ffffff'}
            />
          </HStack>
          <FlatList
            data={filteredDataSource}
            px={4}
            keyExtractor={item => String(item.id)}
            renderItem={({item}: {item: areaDTO}) => (
              <Pressable
                py={4}
                borderBottomWidth={0.7}
                borderBottomColor={'rgba(138,202,255,0.5)'}
                onPress={() => onClickHandler(item)}>
                <Text
                  fontFamily={'body'}
                  fontStyle={'normal'}
                  fontWeight={'200'}
                  color={'white'}
                  fontSize={'lg'}>
                  {item.name_en}
                </Text>
              </Pressable>
            )}
          />
        </Box>
      )}
    </AppLayout>
  );
};
