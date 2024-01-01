import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Input,
  SearchIcon,
  FlatList,
  Modal,
  Divider,
  Text,
  HStack,
  Pressable,
  CheckIcon,
} from 'native-base';
import {Dimensions, I18nManager, ImageBackground, Platform} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {SvgUri} from 'react-native-svg';

import {AppLayout} from '../../component/common/AppLayout';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {Header} from '../../component/common/Header';
import {Colors} from '../../styles';
import {ExploreCard} from './components/ExploreCard';
import {Filter, PlusCircle} from '../../component/svg';
import {MoveButton} from '../../component/common/MoveButton';
import {Loader} from '../../component/common/Loader';
import {useInit} from '../../hooks/useInit';
import {useAppDispatch} from '../../store';
import {useError} from '../../context/ErrorProvider';
import {getMatchList} from '../../store/home/homeSlice';
import {exploreDTO} from '../../store/home/types';
import i18n from 'i18next';

type Props = RootBottomTabScreenProps<'Explore'>;

const WIDTH = Dimensions.get('screen').width;

export const ExploreScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const [sports, setSports] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [radius, setRadius] = useState<string>('');
  const [newDate, setNewDate] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [search, setSearch] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<exploreDTO[]>(
    [],
  );
  const [exploreList, setExploreList] = useState<exploreDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const locale = i18n.language;

  const {
    levelList,
    gender: genderList,
    radiusList,
    sportsList,
    dataLoading: isLoading,
  } = useInit();

  const dispatch = useAppDispatch();
  const setError = useError();

  const onFilterHandler = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getMatchList({
          search,
          newDate,
          sports,
          radius,
          gender,
          level,
          isPaginate: '',
        }),
      ).unwrap();
      if (res) {
        setExploreList(res.matchList);
      }
      setLoading(false);
      setShow(false);
      setSearch('');
      setSports('');
      setLevel('');
      setGender('');
      setRadius('');
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await onFilterHandler();
    })();
  }, [newDate]);

  useEffect(() => {
    setFilteredDataSource([...exploreList]);
  }, [exploreList]);

  const onSearchHandler = (searchText: string) => {
    setFilteredDataSource(
      exploreList.filter(
        (item: exploreDTO) =>
          item.sport_name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.level_en.toLowerCase().includes(searchText.toLowerCase()) ||
          item.gender_name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.venue.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    setSearch(searchText);
  };

  const renderItem = ({item, index}: {item: exploreDTO; index: number}) => (
    <ExploreCard
      index={index}
      matchId={item.match_id}
      name={item.host_name}
      img={{uri: item.host_image}}
      game={item.sport_name}
      icon={item.sport_active_icon}
      verses={item.key2}
      genderIcon={item.gender_icon}
      date={moment(item.date).format('DD MMM') + ' , ' + item.start_time}
      type={item.gender_name}
      level={locale === 'en' ? item?.level_en : item?.level_ar}
      player={item.key1 + ' / ' + item.no_of_players}
      address={item.venue}
      distance={item?.venue_details?.distance}
      price={(item.price.price_per_player * 100).toFixed(2) + ' KD'}
      onPressHandler={matchId =>
        navigation.navigate('GameTopTab', {screen: 'Info', matchId: matchId})
      }
    />
  );

  return (
    <AppLayout>
      <Header heading={String(t('New games'))}>
        <Pressable mr={3} onPress={() => navigation.navigate('PitchBooking')}>
          <PlusCircle width={20} height={20} />
        </Pressable>
        <Pressable mr={1} onPress={() => setShow(!show)}>
          <Filter width={20} height={20} />
        </Pressable>
      </Header>
      <Box flex={1}>
        <CalendarStrip
          // scrollable={!I18nManager.isRTL || Platform.OS === 'ios'}
          // scrollable={true}
          selectedDate={new Date()}
          onDateSelected={date => setNewDate(moment(date).format('YYYY-MM-DD'))}
          style={{
            height: 100,
            width: WIDTH,
          }}
          dateNumberStyle={{
            color: 'white',
            fontSize: 10,
          }}
          dayContainerStyle={{backgroundColor: Colors.background}}
          dateNameStyle={{color: 'white', fontSize: 13, fontWeight: 'bold'}}
          calendarAnimation={{type: 'sequence', duration: 30}}
          highlightDateNumberStyle={{color: Colors.secondary, fontSize: 10}}
          highlightDateNameStyle={{
            color: Colors.secondary,
            fontSize: 13,
            fontWeight: 'bold',
          }}
          calendarHeaderStyle={{
            color: Colors.secondary,
            fontWeight: 'bold',
          }}
          highlightDateContainerStyle={{
            backgroundColor: Colors.background,
            borderStyle: 'dashed',
            borderWidth: 1.5,
          }}
          // leftSelector={[]}
          // rightSelector={[]}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: '#ffd53d',
          }}
          // locale={locale}
        />
        {/*<CalendarStrip*/}
        {/*  style={{*/}
        {/*    height: 100,*/}
        {/*    width: WIDTH,*/}
        {/*  }}*/}
        {/*/>*/}

        <Input
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          colorScheme={'primary'}
          size={'lg'}
          variant="outline"
          w={'90%'}
          mb={5}
          color={'white'}
          alignSelf={'center'}
          borderColor={'secondary.400'}
          invalidOutlineColor={'secondary.400'}
          backgroundColor={'rgba(138,202,255,0.10)'}
          focusOutlineColor={'secondary.400'}
          InputLeftElement={<SearchIcon size="5" ml={3} color={'gray.400'} />}
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
        {loading || isLoading ? (
          <Loader />
        ) : filteredDataSource.length === 0 ? (
          <Box alignItems={'center'} justifyContent={'center'} m={20}>
            <Text
              mb={5}
              fontFamily="heading"
              fontWeight="100"
              fontStyle="normal"
              color={'white'}
              fontSize={'md'}
              textAlign={'center'}>
              {t('No Data')}
            </Text>
            <MoveButton title={t('Re-Load')} onPressHandler={onFilterHandler} />
          </Box>
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={item => String(item.match_id)}
          />
        )}
        <Modal
          isOpen={show}
          justifyContent="flex-end"
          onClose={() => setShow(false)}
          _backdrop={{
            _dark: {
              bg: 'black.800',
            },
            bg: 'black.800',
          }}
          size="xl">
          <ImageBackground
            source={require('../../assets/Background.jpg')}
            resizeMode={'cover'}
            style={{width: WIDTH, paddingHorizontal: 10}}>
            <Divider
              w={7}
              bg={'yellow.400'}
              alignSelf={'center'}
              h={1}
              mt={1}
            />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'white'}
              fontSize={'lg'}
              py={4}
              textAlign={'center'}>
              {t('Filters')}
            </Text>
            <Divider bg={'muted.600'} />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'secondary.400'}
              fontSize={'sm'}
              p={4}
              textAlign={'left'}>
              {t('Sports')}
            </Text>
            <HStack px={6} pb={4} justifyContent={'space-between'}>
              {sportsList.map(s => (
                <Pressable
                  key={String(s.id)}
                  alignItems={'center'}
                  onPress={() => setSports(String(s.id))}>
                  {sports === String(s.id) ? (
                    <SvgUri width={40} height={40} uri={s.yellow_icon_url} />
                  ) : (
                    <SvgUri width={40} height={40} uri={s.icon_url} />
                  )}
                  <Box
                    mt={2}
                    pt={0.35}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderWidth={sports === String(s.id) ? 1 : 0}
                    borderColor={
                      sports === String(s.id) ? 'yellow.400' : 'primary.400'
                    }
                    bg={
                      sports === String(s.id)
                        ? 'rgba(255,213,61,0.23)'
                        : 'primary.400'
                    }>
                    <Text
                      fontFamily={'body'}
                      fontSize={'xs'}
                      color={sports === String(s.id) ? 'yellow.400' : 'white'}
                      fontWeight={sports === String(s.id) ? '200' : '100'}
                      fontStyle={'normal'}>
                      {s.sports_name}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </HStack>
            <Divider bg={'muted.600'} />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'secondary.400'}
              fontSize={'sm'}
              p={4}
              textAlign={'left'}>
              {t('Radius')}
            </Text>
            <HStack px={6} pb={4} justifyContent={'space-between'}>
              {radiusList.map(r => (
                <HStack alignItems={'center'} key={String(r.id)}>
                  <Pressable onPress={() => setRadius(String(r.id))}>
                    <HStack alignItems={'center'}>
                      {radius === String(r.id) ? (
                        <Box
                          borderTopWidth={1}
                          borderBottomWidth={1}
                          borderLeftWidth={1}
                          borderBottomColor={'yellow.400'}
                          borderTopColor={'yellow.400'}
                          borderLeftColor={'yellow.400'}
                          size="5"
                          bg={'rgba(255,213,61,0.23)'}
                          alignItems={'center'}
                          justifyContent={'center'}>
                          <CheckIcon size="4" color="white" />
                        </Box>
                      ) : (
                        <Ionicons
                          name="square-outline"
                          size={24}
                          color="white"
                        />
                      )}
                      <Box
                        px={1}
                        alignItems={'center'}
                        justifyContent={'center'}
                        pt={0.3}
                        bg={
                          radius === String(r.id)
                            ? 'rgba(255,213,61,0.23)'
                            : 'primary.400'
                        }
                        borderWidth={radius === String(r.id) ? 1 : 0}
                        borderColor={
                          radius === String(r.id) ? 'yellow.400' : 'primary.400'
                        }>
                        <Text
                          fontFamily="body"
                          fontStyle="normal"
                          fontSize={12}
                          borderRadius={0}
                          fontWeight={radius === String(r.id) ? '200' : '100'}
                          color={
                            radius === String(r.id) ? 'yellow.400' : 'white'
                          }>
                          {locale === 'en' ? r.distance_en : r.distance_ar}
                        </Text>
                      </Box>
                    </HStack>
                  </Pressable>
                </HStack>
              ))}
            </HStack>
            <Divider bg={'muted.600'} />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'secondary.400'}
              fontSize={'sm'}
              p={4}
              textAlign={'left'}>
              {t('Gender')}
            </Text>
            <HStack px={6} pb={4}>
              {genderList.map(m => (
                <Pressable
                  key={String(m.id)}
                  flexDirection={'row'}
                  alignItems={'center'}
                  mr={8}
                  onPress={() => setGender(String(m.id))}>
                  {gender === String(m.id) ? (
                    <SvgUri height={20} uri={m.active_icon_url} />
                  ) : (
                    <SvgUri height={20} uri={m.icon_url} />
                  )}
                  <Text
                    ml={1}
                    textAlign={'center'}
                    fontFamily="body"
                    fontStyle="normal"
                    fontSize={'sm'}
                    pt={Platform.OS === 'ios' ? 0 : 1}
                    fontWeight={gender === String(m.id) ? '200' : '100'}
                    bg={
                      gender === String(m.id)
                        ? 'rgba(255,213,61,0.23)'
                        : 'primary.400'
                    }
                    borderWidth={gender === String(m.id) ? 1 : 0}
                    borderColor={
                      gender === String(m.id) ? 'yellow.400' : 'primary.400'
                    }
                    color={gender === String(m.id) ? 'yellow.400' : 'white'}>
                    {String(m.name)}
                  </Text>
                </Pressable>
              ))}
            </HStack>
            <Divider bg={'muted.600'} />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'secondary.400'}
              fontSize={'sm'}
              p={4}
              textAlign={'left'}>
              {t('Levels')}
            </Text>
            <HStack px={6} pb={4}>
              {levelList.map(l => (
                <Text
                  key={l.level_en}
                  onPress={() => setLevel(l.level_en)}
                  fontFamily="body"
                  fontStyle="normal"
                  mr={8}
                  textAlign={'center'}
                  pt={Platform.OS === 'ios' ? 0 : 1}
                  borderWidth={level === l.level_en ? 1 : 0}
                  borderColor={
                    level === l.level_en ? 'yellow.400' : 'primary.400'
                  }
                  fontWeight={level === l.level_en ? '200' : '100'}
                  bg={
                    level === l.level_en
                      ? 'rgba(255,213,61,0.23)'
                      : 'primary.400'
                  }
                  color={level === l.level_en ? 'yellow.400' : 'white'}>
                  {t(l.level_en)}
                </Text>
              ))}
            </HStack>
            <Box mb={Platform.OS === 'ios' ? 10 : 2}>
              <MoveButton
                title={String(t('Show results'))}
                onPressHandler={onFilterHandler}
              />
            </Box>
          </ImageBackground>
        </Modal>
      </Box>
      {show && (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor={'#0f1f38'}
        />
      )}
    </AppLayout>
  );
};
