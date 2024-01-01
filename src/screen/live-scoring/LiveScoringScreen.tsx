import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
} from 'native-base';

import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {RootStackScreenProps} from '../../navigation/types';
import {Colors} from '../../styles';
import {MapPin, Minus, PlusCircleGreen} from '../../component/svg';
import {Dropdown} from 'react-native-element-dropdown';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {InvitationItem} from '../../data/InvitationList';
import i18n from 'i18next';
import {Loader} from '../../component/common/Loader';
import moment from 'moment';
import {useError} from '../../context/ErrorProvider';
import {useMessage} from '../../hooks/useMessage';

type Props = RootStackScreenProps<'LiveScoring'>;

type liveScoring = {
  team_one_score: number;
  team_two_score: number;
  winner_id: number;
  // username: string;
};
type user = {
  username: string;
  avatar_url: ImageSourcePropType;
};
type venue = {
  name_en: string;
  name_ar: string;
};
type playerItem = {
  id: number;
  first_name: string;
  username: string;
  avatar: string;
  email: string;
  mobile: string;
  avatar_url: ImageSourcePropType;
};

export const LiveScoringScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const matchId = route.params.matchId;
  console.log('matchId', matchId);

  const [liveScore, setLiveScore] = useState<liveScoring>({
    team_one_score: 0,
    team_two_score: 0,
    winner_id: 0,
  });
  const [user, setUser] = useState<user | null>({username: '', avatar_url: ''});
  const [venue, setVenue] = useState<venue | null>({name_en: '', name_ar: ''});
  const [liveScoreLoading, setLiveScoreLoading] = useState<boolean>(true);
  const [playersList, setPlayersList] = useState<playerItem[]>([]);
  const [dropdownValue, setDropdownValue] = useState(null);

  const [value, setValue] = useState<string>('');

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const setError = useError();
  const setMessage = useMessage();

  const locale = i18n.language;

  const getLiveScore = () => {
    setLiveScoreLoading(true);

    Axios.get(`${ApiEndpoints.liveScore.getLiveScore}?match_id=${matchId}`)
      .then((response: any) => {
        // console.log(response.data.data, matchId);
        if (response.data.status === 'ok') {
          setLiveScore(response?.data?.data?.live_data);
          // console.log(response.data.data.live_data);
          setUser({
            username: response?.data?.data?.live_data?.user?.username,
            avatar_url: response?.data?.data?.live_data?.user?.avatar_url,
          });

          setVenue({
            name_en: response?.data?.data?.live_data?.match?.venue?.name_en,
            name_ar: response?.data?.data?.live_data?.match?.venue?.name_ar,
          });
          setPlayersList(response?.data?.data?.players);
          setCurrentTime(response?.data?.data?.current_time);
          setEndTime(response?.data?.data?.end_time);
          setStartTime(response?.data?.data?.start_time);
        }
      })
      .catch((e: any) => {
        setError(e.message);
      })
      .finally(() => {
        setLiveScoreLoading(false);
      });
  };

  useEffect(() => {
    getLiveScore();
  }, []);

  const onSubmitHandler = async (
    winnerId: number,
    teamOneScore: number,
    teamTwoScore: number,
  ) => {
    try {
      const response = await Axios.post(
        ApiEndpoints.liveScore.updateLiveScore,
        {
          match_id: matchId,
          winner_id: winnerId,
          team_one_score: teamOneScore,
          team_two_score: teamTwoScore,
        },
      );
      if (response.data.status === 'ok') {
        console.log(response.data);
        setMessage(response.data.message);
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Live Scoring'))} />
      <Box flex={1}>
        {/*{liveScoreLoading ? (*/}
        {/*  <Loader />*/}
        {/*) : (*/}
        <Box m={5} bg={'background.400'} p={3}>
          {playersList.slice(0, 1).map(s => (
            <>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mx={5}>
                <Image
                  alt={'no img'}
                  source={{uri: playersList[0]?.avatar_url as string}}
                  w={60}
                  h={60}
                  resizeMode={'contain'}
                  borderRadius={100}
                  borderWidth={1}
                  borderColor={Colors.secondary}
                />
                <Text
                  fontSize={'md'}
                  fontWeight={'200'}
                  fontFamily={'body'}
                  color={'yellow.400'}
                  fontStyle={'normal'}>
                  {t('vs')}
                </Text>
                <Image
                  alt={'no img'}
                  source={{uri: playersList[0]?.avatar_url as string}}
                  w={60}
                  h={60}
                  resizeMode={'contain'}
                  borderRadius={100}
                  borderWidth={1}
                  borderColor={Colors.secondary}
                />
              </HStack>

              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mx={5}
                mt={2}>
                <Box w={70} alignItems={'center'}>
                  <Text
                    fontSize={13}
                    fontWeight={'200'}
                    fontFamily={'body'}
                    color={'secondary.400'}
                    fontStyle={'normal'}>
                    {playersList[0]?.username}
                  </Text>
                </Box>
                <Divider orientation="vertical" />
                <Box w={70} alignItems={'center'}>
                  <Text
                    fontSize={13}
                    fontWeight={'200'}
                    fontFamily={'body'}
                    color={'secondary.400'}
                    fontStyle={'normal'}>
                    {playersList[1]?.username}
                  </Text>
                </Box>
              </HStack>
            </>
          ))}
          <HStack alignItems={'center'} justifyContent={'space-between'} mx={3}>
            <Box w={70} alignItems={'center'}>
              <Text
                fontSize={'4xl'}
                fontWeight={'200'}
                fontFamily={'body'}
                color={'white'}
                fontStyle={'normal'}>
                {liveScore?.team_one_score}
              </Text>
              <HStack
                mt={-2}
                w={'80%'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Pressable
                  onPress={() => {
                    if (Number(liveScore?.team_one_score) >= 1) {
                      setLiveScore({
                        ...liveScore,
                        team_one_score: Number(liveScore?.team_one_score) - 1,
                      });
                    }
                  }}>
                  <Minus width={20} height={20} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    console.log(Number(liveScore?.team_one_score));
                    // Number(liveScore?.team_one_score) > 0 &&
                    setLiveScore({
                      ...liveScore,
                      team_one_score: Number(liveScore?.team_one_score) + 1,
                    });
                  }}>
                  <PlusCircleGreen width={20} height={20} />
                </Pressable>
              </HStack>
            </Box>

            <Divider w={'5%'} h={1} bg={'secondary.400'} />
            <Box w={70} alignItems={'center'}>
              <Text
                fontSize={'4xl'}
                fontWeight={'200'}
                fontFamily={'body'}
                color={'yellow.400'}
                fontStyle={'normal'}>
                {liveScore?.team_two_score}
              </Text>
              <HStack
                w={'80%'}
                mt={-2}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Pressable
                  onPress={() => {
                    if (Number(liveScore?.team_two_score) >= 1) {
                      setLiveScore({
                        ...liveScore,
                        team_two_score: Number(liveScore?.team_two_score) - 1,
                      });
                    }
                  }}>
                  <Minus width={20} height={20} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setLiveScore({
                      ...liveScore,
                      team_two_score: Number(liveScore?.team_two_score) + 1,
                    });
                  }}>
                  <PlusCircleGreen width={20} height={20} />
                </Pressable>
              </HStack>
            </Box>
          </HStack>
          <HStack alignItems={'center'} alignSelf={'center'} my={6}>
            <MapPin width={20} height={20} />
            <Text
              ml={2}
              pt={1}
              fontSize={'sm'}
              fontWeight={'100'}
              fontFamily={'body'}
              color={'white'}
              fontStyle={'normal'}>
              {locale === 'en' ? venue?.name_en : venue?.name_ar}
            </Text>
          </HStack>
          {moment(currentTime, 'hh:mm:ss').isAfter(
            moment(startTime, 'hh:mm:ss'),
          ) &&
          moment(currentTime, 'hh:mm:ss').isBefore(
            moment(endTime, 'hh:mm:ss'),
          ) ? (
            <Button
              onPress={() => {
                onSubmitHandler(
                  liveScore?.winner_id,
                  liveScore?.team_one_score,
                  liveScore?.team_two_score,
                );
              }}
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
              colorScheme={'secondary'}>
              {t('Update')}
            </Button>
          ) : null}
        </Box>

        {moment(currentTime, 'hh:mm:ss').isAfter(
          moment(startTime, 'hh:mm:ss'),
        ) &&
        moment(currentTime, 'hh:mm:ss').isBefore(
          moment(endTime, 'hh:mm:ss'),
        ) ? (
          <>
            <Text
              p={3}
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              color={'secondary.400'}>
              {t('Select winner')}
            </Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: Colors.secondary},
                {backgroundColor: Colors.background},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              activeColor={Colors.background}
              containerStyle={{
                backgroundColor: Colors.background,
                borderColor: Colors.secondary,
                paddingHorizontal: 10,
              }}
              itemTextStyle={{color: 'white'}}
              itemContainerStyle={{
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.secondary,
              }}
              // data={playersList}
              data={playersList.map(f => ({
                label: f.username,
                value: f.username,
              }))}
              search={false}
              dropdownPosition={'bottom'}
              labelField="label"
              valueField="value"
              placeholder={String(t('Select Player'))}
              searchPlaceholder="Search..."
              value={dropdownValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownValue(item.value);
                setIsFocus(false);
              }}
            />
          </>
        ) : null}

        <Box
          p={5}
          bg={'background.400'}
          w={'100%'}
          position={'absolute'}
          bottom={0}>
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
            onPress={() => {
              onSubmitHandler(
                liveScore?.winner_id,
                liveScore?.team_one_score,
                liveScore?.team_two_score,
              );
            }}>
            {t('Submit')}
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.secondary,
    borderWidth: 0.5,
    borderRadius: 0,
    paddingHorizontal: 8,
    marginHorizontal: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.white,
  },
});
