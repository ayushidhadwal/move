import React, {FC} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useTranslation} from 'react-i18next';

import {
  Calender,
  Card,
  Map,
  MapPin,
  NewComer,
  Player,
  Share,
} from '../../../../component/svg';
import {Loader} from '../../../../component/common/Loader';
import {infoDTO} from '../../../../hooks/match/useMatchDetails';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../../navigation/types';
import {SvgUri} from 'react-native-svg';
import i18n from 'i18next';
import {ScreenHeader} from '../../../../component/common/ScreenHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store';
import {View} from 'react-native';

type Props = {
  info: infoDTO;
  dataLoading: boolean;
  matchId: number;
};

export const GameInfoScreen: FC<Props> = ({info, dataLoading, matchId}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationProps>();
  const locale = i18n.language;
  const {userId} = useSelector((state: RootState) => state.auth);

  console.log('Game info match id', matchId);

  return (
      <Box flex={1}>
        {dataLoading ? (
            <Loader/>
        ) : (
            <>
              <ScrollView flex={1}>
                <Box bg={'background.400'} m={3}>
                  <HStack
                      px={2}
                      pt={2}
                      pb={4}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                    <HStack alignItems={'center'} width={'60%'}>
                      <Calender width={15} height={15}/>
                      <Text
                          fontFamily="body"
                          fontWeight="100"
                          fontStyle="normal"
                          color={'secondary.400'}
                          fontSize={'md'}
                          ml={2}>
                        {info?.datetime?.date + ' , ' + info?.datetime?.start_time}
                      </Text>
                    </HStack>
                    <Share width={15} height={15}/>
                    {/*<VStack>*/}
                    {/*  <Pressable*/}
                    {/*    onPress={() =>*/}
                    {/*      navigation.navigate('SendInvitation', {*/}
                    {/*        matchId,*/}
                    {/*      })*/}
                    {/*    }>*/}
                    {/*    <Text color={'white'}>Invite Only</Text>*/}
                    {/*  </Pressable>*/}
                    {/*  <Pressable*/}
                    {/*    onPress={() =>*/}
                    {/*      navigation.navigate('ManageRequest', {*/}
                    {/*        matchId,*/}
                    {/*      })*/}
                    {/*    }>*/}
                    {/*    <Text color={'white'}>Public Access</Text>*/}
                    {/*  </Pressable>*/}
                    {/*</VStack>*/}
                  </HStack>
                  <Divider bg={'#2C3C56'} mb={2} ml={8} mr={2} w={'88%'}/>
                  <HStack px={2} pt={4} pb={4} alignItems={'center'}>
                    <NewComer width={15} height={15}/>
                    <Text
                        fontFamily="body"
                        fontWeight="100"
                        fontStyle="normal"
                        color={'white'}
                        fontSize={'md'}
                        ml={2}>
                      {locale === 'en'
                          ? info?.level?.title_en
                          : info?.level?.title_ar}
                    </Text>
                  </HStack>
                  <Divider bg={'#2C3C56'} mb={2} ml={8} mr={2} w={'88%'}/>
                  <HStack px={2} pt={4} pb={4} alignItems={'center'}>
                    <Player width={15} height={15}/>
                    <Text
                        fontFamily="body"
                        fontWeight="100"
                        fontStyle="normal"
                        color={'white'}
                        fontSize={'md'}
                        ml={2}>
                      {info?.formation?.key2}{' '}
                      <Text color={'secondary.400'}>{t('vs')}</Text>{' '}
                      {info?.formation?.key2}
                    </Text>
                  </HStack>
                  <Divider bg={'#2C3C56'} mb={2} ml={8} mr={2} w={'88%'}/>
                  <HStack px={2} pt={4} pb={4} alignItems={'center'}>
                    <SvgUri height={16} uri={info?.gender?.icon}/>
                    <Text
                        fontFamily="body"
                        fontWeight="100"
                        fontStyle="normal"
                        color={'white'}
                        fontSize={'md'}
                        ml={2}>
                      {info?.gender?.name}
                    </Text>
                  </HStack>
                  <Divider bg={'#2C3C56'} mb={2} ml={8} mr={2} w={'88%'}/>
                  <HStack px={2} pt={4} pb={4} alignItems={'center'}>
                    <Card width={15} height={15}/>
                    <Text
                        fontFamily="body"
                        fontWeight="100"
                        fontStyle="normal"
                        color={'white'}
                        fontSize={'md'}
                        ml={2}>
                      {info?.price_per_player?.price_per_player} K.D / per person
                    </Text>
                  </HStack>
                  <Divider bg={'#2C3C56'} mb={2} ml={8} mr={2} w={'88%'}/>
                  <HStack
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      mt={3}
                      ml={8}
                      mr={2}
                      pb={2}
                      w={'88%'}>
                    {info?.venue_details?.image.map(i => (
                        <Image
                            key={i.id}
                            alt={'no img'}
                            source={{uri: i.image_url}}
                            w={'49%'}
                            h={100}
                            resizeMode={'cover'}
                        />
                    ))}
                  </HStack>
                  <HStack
                      pl={2}
                      pr={2}
                      py={1}
                      bg={'rgba(138,202,255,0.1)'}
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                    <HStack alignItems={'center'}>
                      <Map width={14} height={14}/>
                      <VStack ml={2}>
                        <Text
                            fontFamily="body"
                            fontWeight="100"
                            fontStyle="normal"
                            color={'secondary.400'}
                            fontSize={10}>
                          {info?.venue_details?.name}
                        </Text>
                        <Text
                            fontFamily="body"
                            fontWeight="100"
                            fontStyle="normal"
                            color={'white'}
                            fontSize={10}>
                          {info?.venue_details?.location}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack alignItems={'center'}>
                      <MapPin width={12} height={12}/>
                      <Text
                          ml={0.5}
                          fontFamily="body"
                          fontWeight="100"
                          fontStyle="normal"
                          color={'white'}
                          fontSize={10}>
                        {info?.venue_details?.distance} {t('km')}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
                <Text
                    fontFamily="body"
                    fontWeight="100"
                    fontStyle="normal"
                    color={'white'}
                    fontSize={'md'}
                    mb={3}
                    mt={2}
                    mx={3}>
                  {info?.details?.description}
                </Text>
              </ScrollView>
              <Box pt={5} px={5} pb={5} bg={'background.400'} w={'100%'}>
                {info?.is_host ? (
                    info?.is_privtae_invite_only ? (
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
                            onPress={() =>
                                navigation.navigate('SendInvitation', {
                                  matchId,
                                })
                            }>
                          {t('Invite')}
                        </Button>
                    ) : info?.is_private_public_access ? (
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
                            onPress={() =>
                                navigation.navigate('ManageRequest', {
                                  matchId: matchId,
                                })
                            }>
                          {t('Manage Requests')}
                        </Button>
                    ) : (
                        <View/>
                    )
                ) : info?.is_joined ? (
                    <View/>

                ) : (
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
                        onPress={() =>
                            navigation.navigate('GameTopTab', {
                              screen: 'Lineup',
                              matchId: matchId,
                            })
                        }>
                      {t('Join this match')}
                    </Button>
                )}
              </Box>
            </>
        )}
      </Box>
  );
};
