import React, {FC, useEffect, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {ActivityIndicator, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';

import {BasketBall, Cricket, Football, NewComer, Tennis} from '../svg';
import {Colors} from '../../styles';
import i18n from 'i18next';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {Loader} from './Loader';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {useError} from '../../context/ErrorProvider';
import CircularProgress from 'react-native-circular-progress-indicator';
import {SvgUri} from 'react-native-svg';

export const UserStatistics: FC = () => {
  const [statisticsLoading, setStatisticsLoading] = useState<boolean>(true);
  const [statisticsList, setStatisticsList] = useState<any[]>([]);
  const {userId} = useSelector((state: RootState) => state.auth);
  const setError = useError();

  const getStatistics = () => {
    setStatisticsLoading(true);

    Axios.get(`${ApiEndpoints.statistics.statistics}?user_id=${userId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setStatisticsList(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((e: any) => {
        setError(e?.message);
      })
      .finally(() => {
        setStatisticsLoading(false);
      });
  };

  useEffect(() => {
    getStatistics();
  }, []);

  const {t} = useTranslation();
  const locale = i18n.language;

  return (
    <Box>
      <Text
        fontFamily={'heading'}
        mb={3}
        mt={8}
        px={5}
        fontWeight={'100'}
        fontStyle={'normal'}
        fontSize={'lg'}
        color={'secondary.400'}>
        {t('Statistics')}
      </Text>

      {statisticsLoading ? (
        <Box h={100} justifyContent={'center'} alignItems={'center'}>
          {/*<ActivityIndicator />*/}
          <Loader />
        </Box>
      ) : (
        <>
          {statisticsList.map(m => {
            return (
              <Pressable
                key={m?.game}
                borderWidth={1}
                borderColor={'secondary.400'}
                pt={2}
                mx={5}
                mb={5}
                bg={'background.400'}>
                <HStack
                  alignItems={'center'}
                  bg={'yellow.400'}
                  position={'absolute'}
                  top={0}
                  w={'50%'}
                  justifyContent={'center'}
                  alignSelf={'center'}>
                  {/*<Cricket width={20} height={20} color={Colors.black} />*/}
                  <SvgUri width={20} height={20} uri={m?.icon_url} />
                  <Text
                    ml={2}
                    fontFamily={'heading'}
                    fontWeight={'100'}
                    fontStyle={'italic'}
                    fontSize={'md'}
                    color={'black'}>
                    {m?.game}
                  </Text>
                </HStack>
                <Text
                  fontFamily={'body'}
                  mt={7}
                  mb={2}
                  textAlign={'center'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}
                  color={'secondary.400'}>
                  {t('Win rate')}
                </Text>
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mx={2}
                  mb={5}>
                  <Box alignItems={'center'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={'sm'}
                      color={'secondary.400'}
                      mb={3}>
                      {t('level assessment')}
                    </Text>
                    {/*<ImageBackground*/}
                    {/*  source={require('../../assets/img/Circle3.png')}*/}
                    {/*  resizeMode={'cover'}*/}
                    {/*  style={{*/}
                    {/*    width: 60,*/}
                    {/*    height: 60,*/}
                    {/*    alignItems: 'center',*/}
                    {/*    justifyContent: 'center',*/}
                    {/*  }}>*/}
                    {/*  <Text*/}
                    {/*    fontFamily={'heading'}*/}
                    {/*    fontWeight={'100'}*/}
                    {/*    fontStyle={'normal'}*/}
                    {/*    fontSize={'sm'}*/}
                    {/*    color={'white'}>*/}
                    {/*    {m?.levelCount}*/}
                    {/*  </Text>*/}
                    {/*</ImageBackground>*/}
                    {/*<CircularProgress*/}
                    {/*  // maxValue={10}*/}
                    {/*  value={110}*/}
                    {/*  // value={parseFloat(m?.levelCount.toString() ?? '0.0')}*/}
                    {/*  activeStrokeColor={'#FFD53D'}*/}
                    {/*  titleColor={'white'}*/}
                    {/*  progressValueStyle={{color: 'white'}}*/}
                    {/*  circleBackgroundColor={'#0F1F38'}*/}
                    {/*  radius={30}*/}
                    {/*  activeStrokeWidth={8}*/}
                    {/*  inActiveStrokeWidth={8}*/}
                    {/*  progressFormatter={(value: number) => {*/}
                    {/*    'worklet';*/}

                    {/*    return (value / 100).toFixed(1); // 2 decimal places*/}
                    {/*  }}*/}
                    {/*  duration={0}*/}
                    {/*  startInPausedState={true}*/}
                    {/*  initialValue={110}*/}
                    {/*/>*/}
                    <CircularProgress
                      value={+m?.levelCount}
                      radius={30}
                      progressFormatter={(value: number) => {
                        'worklet';

                        return value.toFixed(1); // 2 decimal places
                      }}
                      activeStrokeColor={'#FFD53D'}
                      titleColor={'white'}
                      progressValueStyle={{color: 'white'}}
                      circleBackgroundColor={'#0F1F38'}
                    />
                  </Box>
                  {locale === 'en' ? (
                    <ImageBackground
                      source={require('../../assets/img/halfCircle.png')}
                      resizeMode={'cover'}
                      style={{
                        width: 85,
                        height: 85,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <HStack
                        w={85}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}>
                        <Text
                          fontFamily={'heading'}
                          fontWeight={'100'}
                          fontStyle={'normal'}
                          fontSize={'sm'}
                          color={'primary.400'}>
                          {m?.lose}
                        </Text>
                        <Text
                          fontFamily={'heading'}
                          fontWeight={'100'}
                          fontStyle={'normal'}
                          fontSize={'sm'}
                          color={'yellow.400'}>
                          {m?.win}
                        </Text>
                      </HStack>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={require('../../assets/halfCircle1.png')}
                      resizeMode={'cover'}
                      style={{
                        width: 85,
                        height: 85,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <HStack
                        w={85}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}>
                        <Text
                          fontFamily={'heading'}
                          fontWeight={'100'}
                          fontStyle={'normal'}
                          fontSize={'sm'}
                          color={'primary.400'}>
                          {m?.lose}
                        </Text>
                        <Text
                          fontFamily={'heading'}
                          fontWeight={'100'}
                          fontStyle={'normal'}
                          fontSize={'sm'}
                          color={'yellow.400'}>
                          {m?.win}
                        </Text>
                      </HStack>
                    </ImageBackground>
                  )}

                  <Box alignItems={'center'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={'sm'}
                      color={'secondary.400'}
                      mb={3}>
                      {t('Sportsmanship')}
                    </Text>
                    {/*<ImageBackground*/}
                    {/*  source={require('../../assets/img/Circle2.png')}*/}
                    {/*  resizeMode={'cover'}*/}
                    {/*  style={{*/}
                    {/*    width: 60,*/}
                    {/*    height: 60,*/}
                    {/*    alignItems: 'center',*/}
                    {/*    justifyContent: 'center',*/}
                    {/*  }}>*/}
                    {/*  <Text*/}
                    {/*    fontFamily={'heading'}*/}
                    {/*    fontWeight={'100'}*/}
                    {/*    fontStyle={'normal'}*/}
                    {/*    fontSize={'sm'}*/}
                    {/*    color={'white'}>*/}
                    {/*    {m?.sportmanshipCount}*/}
                    {/*  </Text>*/}
                    {/*</ImageBackground>*/}
                    {/*<CircularProgress*/}
                    {/*  // value={parseFloat(*/}
                    {/*  //   m?.sportmanshipCount ?? '0.0',*/}
                    {/*  // )}*/}
                    {/*  progressFormatter={(value: number) => {*/}
                    {/*    'worklet';*/}

                    {/*    return value.toFixed(1); // 2 decimal places*/}
                    {/*  }}*/}
                    {/*  value={1.1}*/}
                    {/*  // maxValue={10}*/}
                    {/*  activeStrokeColor={'#FFD53D'}*/}
                    {/*  titleColor={'white'}*/}
                    {/*  circleBackgroundColor={'#0F1F38'}*/}
                    {/*  radius={30}*/}
                    {/*  activeStrokeWidth={8}*/}
                    {/*  inActiveStrokeWidth={8}*/}
                    {/*  progressValueStyle={{color: 'white'}}*/}
                    {/*  duration={0}*/}
                    {/*  startInPausedState={true}*/}
                    {/*  initialValue={1.1}*/}
                    {/*/>*/}
                    <CircularProgress
                      value={+m?.sportmanshipCount}
                      radius={30}
                      progressFormatter={(value: number) => {
                        'worklet';

                        return value.toFixed(1); // 2 decimal places
                      }}
                      activeStrokeColor={'#FFD53D'}
                      titleColor={'white'}
                      progressValueStyle={{color: 'white'}}
                      circleBackgroundColor={'#0F1F38'}
                    />
                  </Box>
                </HStack>
                <HStack
                  w={'100%'}
                  py={1}
                  px={2}
                  alignItems={'center'}
                  bg={'rgba(138,202,255,0.1)'}
                  justifyContent={'space-between'}>
                  <HStack>
                    <Image
                      alt={'npo img'}
                      source={require('../../assets/img/clipboard.png')}
                      w={5}
                      h={5}
                      mr={1}
                    />
                    <Text
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={'sm'}
                      color={'white'}>
                      Games organized- {m?.total}
                    </Text>
                  </HStack>
                  <HStack>
                    <NewComer width={18} height={18} />
                    <Text
                      ml={1}
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={'sm'}
                      color={'white'}>
                      {m?.type}
                    </Text>
                  </HStack>
                </HStack>
              </Pressable>
            );
          })}
        </>
      )}
    </Box>
  );
};
