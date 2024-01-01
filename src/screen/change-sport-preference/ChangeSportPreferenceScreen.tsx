import React, {FC, useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  FlatList,
  Box,
  Button,
  Divider,
  Image,
} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {AuthHeader} from '../../component/common/AuthHeader';
import {sportsDTO, useInit} from '../../hooks/useInit';
import {Loader} from '../../component/common/Loader';
import {useAppDispatch} from '../../store';
import {chooseSport} from '../../store/auth/authSlice';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';
import {useGetSelectedSports} from '../../hooks/match/useGetSelectedSports';
import {Header} from '../../component/common/Header';

type Props = RootStackScreenProps<'ChangeSportPreference'>;

export const ChangeSportPreferenceScreen: FC<Props> = ({navigation}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {t} = useTranslation();
  const {sportsList, dataLoading} = useInit();
  const {selectedSportsList, isLoading} = useGetSelectedSports();

  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (selectedSportsList && selectedSportsList.length > 0) {
        const a = selectedSportsList.map(m => m.id);
        setSelected(a);
      }
    });

    return unsubscribe;
  }, [navigation, selectedSportsList]);

  const onClickHandler = async () => {
    setLoading(true);
    try {
      await dispatch(chooseSport(selected)).unwrap();
      setMessage(String(t('Sports Selected Successfully.')));
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const onHandle = (val: number) => {
    setSelected(prevState => {
      const x = [...prevState];
      const i = x.findIndex(n => n === val);
      if (i >= 0) {
        x.splice(i, 1);
      } else {
        x.push(val);
      }
      return x;
    });
  };

  const renderItem = ({item, index}: {item: sportsDTO; index: number}) => {
    return (
      <Box mx={6}>
        <Pressable
          onPress={() => onHandle(item.id)}
          w={'100%'}
          h={180}
          bg={'white'}
          mb={6}
          mt={index === 0 ? 2 : 0}
          alignSelf={'center'}>
          <Image
            alt={'no img'}
            w={'100%'}
            h={180}
            resizeMode={'cover'}
            source={{
              uri: item.image_url,
            }}
          />
          {selected.includes(item.id) ? (
            <Pressable
              onPress={() => onHandle(item.id)}
              position={'absolute'}
              bottom={0}
              w={'100%'}
              h={180}
              bg={'rgba(43,45,47,0.55)'}
              alignItems={'center'}
              justifyContent={'flex-end'}>
              <Text
                alignSelf={'center'}
                color={'yellow.400'}
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                shadow={15}
                fontSize={'2xl'}>
                {item.sports_name}
              </Text>
            </Pressable>
          ) : (
            <Box
              position={'absolute'}
              bottom={0}
              bg={'rgba(43,45,47,0.75)'}
              p={2}
              w={'100%'}
              alignItems={'center'}>
              <Text
                alignSelf={'center'}
                color={'white'}
                fontFamily={'body'}
                fontWeight={'100'}
                fontSize={'md'}
                fontStyle={'normal'}>
                {item.sports_name}
              </Text>
            </Box>
          )}
        </Pressable>
        <Divider mb={6} bg={'secondary.500'} alignSelf={'center'} />
      </Box>
    );
  };

  return (
    <AppLayout>
      <Header heading={String(t('Choose your Sport'))} />
      {dataLoading || isLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <FlatList
            data={sportsList}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
          <Box p={5} bg={'background.400'}>
            <Button
              variant={'solid'}
              w={'100%'}
              rounded={0}
              _text={{
                fontFamily: 'heading',
                fontWeight: '100',
                fontStyle: 'italic',
                fontSize: 'md',
                color: 'primary.400',
              }}
              colorScheme={'secondary'}
              isLoading={loading}
              disabled={loading || selected.length === 0}
              isLoadingText={String(t('Continue'))}
              spinnerPlacement={'end'}
              onPress={onClickHandler}>
              {t('Continue')}
            </Button>
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};
