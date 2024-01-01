import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dimensions, ImageBackground, View} from 'react-native';
import {useSelector} from 'react-redux';

import {Users} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import {RootNavigationProps} from '../../../../navigation/types';
import {Loader} from '../../../../component/common/Loader';
import {infoDTO, lineupDTO} from '../../../../hooks/match/useMatchDetails';
import {
  checkSlotAvailability,
  NotifyForSlot,
} from '../../../../store/game/matchJoinSlice';
import {RootState, useAppDispatch} from '../../../../store';
import {useError} from '../../../../context/ErrorProvider';
import {useMessage} from '../../../../hooks/useMessage';
import i18n from 'i18next';
import {useGetWishToJoin} from '../../../../hooks/home/useGetWishToJoin';
import {Axios} from '../../../../lib/Axios';
import {ApiEndpoints} from '../../../../store/ApiEndpoints';

type Props = {
  lineup: lineupDTO;
  info: infoDTO;
  dataLoading: boolean;
  matchId: number;
  onPressHandler: (val: boolean) => void;
};

export const GameLineupScreen: FC<Props> = ({
                                              info,
                                              lineup,
                                              dataLoading,
                                              matchId,
                                              onPressHandler,
                                            }) => {
  const {t} = useTranslation();
  const locale = i18n.language;

  const navigation = useNavigation<RootNavigationProps>();

  const dispatch = useAppDispatch();
  const setError = useError();
  const setMessage = useMessage();

  const {userId} = useSelector((state: RootState) => state.auth);

  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [teamOneBlanks, setTeamOneBlanks] = useState<number[]>([]);
  const [teamTwoBlanks, setTeamTwoBlanks] = useState<number[]>([]);

  const [loggedInUserJoin, setLoggedInUserJoin] = useState<boolean>(false);
  const [availableSlot, setAvailableSlot] = useState<number>(0);

  const [showNotify, setShowNotify] = useState<boolean>(true);
  const {updateWishStatus} = useGetWishToJoin();

  const WIDTH = Dimensions.get('screen').width;

  const _onSelectHandler = () => {
    if (teamOneBlanks.length === 0 && teamTwoBlanks.length === 0) {
      let teamA: number;
      let teamB: number;
      setTeamOneBlanks(prevState => {
        const x = [...prevState];
        teamA = lineup?.team_one?.formation - lineup?.team_one?.players.length;
        for (let i = 0; i < teamA; i++) {
          x.push(i);
        }
        return x;
      });
      setTeamTwoBlanks(prevState => {
        const t = [...prevState];
        teamB = lineup?.team_two?.formation - lineup?.team_two?.players.length;
        for (let i = 0; i < teamB; i++) {
          t.push(i);
        }
        return t;
      });
    }
  };

  const onClickHandler = async () => {
    try {
      setLoading(true);
      const res = await dispatch(checkSlotAvailability({matchId})).unwrap();
      if (res) {
        setAvailableSlot(res.availableSlot);
        setLoggedInUserJoin(res.loggedInUserJoin);
        if (res.availableSlot === 0) {
          setShowNotify(false);
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _onSelectHandler();
    onClickHandler();
  }, []);

  const onPressGameJoinHandler = () => {
    if (info?.is_private_public_access) {
      // toggleRequestSendModal();
      setShowModal(true);
    } else {
      if (availableSlot === 1) {
        navigation.navigate('PaymentDetail', {
          matchId: matchId,
          selectedPlayerList: [userId],
        });
      } else if (availableSlot > 1) {
        setVisibleModal(true);
        onPressHandler(true);
      }
    }
  };

  const [requestModalVisible, setRequestModalVisible] = useState(false);

  const toggleRequestSendModal = () => {
    setRequestModalVisible(!requestModalVisible);
  };

  const onPressNotifyHandler = async () => {
    if (info?.is_joined === false && info?.is_slot_full) {
      sendRequestBackendSlot()
    } else if (info?.is_joined === false && info?.is_slot_full === false) {
      try {
        setLoader(true);
        // const res = await dispatch(NotifyForSlot({matchId})).unwrap();

        const res = await Axios.post(
            ApiEndpoints.invitation.sendMatchInvitation,
            {
              match_id: matchId,
              receiver_id: userId,
              type: 2,
            },
        );
        if (res) {
          setShowNotify(false);
          setMessage(String(t('Request Send Successfully.')));
          navigation.navigate('BottomTabs');
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }


  };

  const sendRequestBackendSlot = async () => {
    try {
      setLoader(true);
      // const res = await dispatch(ForSlot({matchId})).unwrap();

      const res = await Axios.post(
          `${ApiEndpoints.requestBackend.requestBackend}?match_id=${matchId}`,
          {
            match_id: matchId,
          },
      );
      if (res) {
        setShowNotify(false);
        setMessage(String(t('Request Send Successfully.')));
        navigation.navigate('BottomTabs');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box flex={1}>
        {dataLoading ? (
            <Loader/>
        ) : (
            <ScrollView flex={1}>
              <HStack mt={7} alignItems={'center'}>
                <VStack alignItems={'center'} w={'50%'}>
                  <Text
                      fontFamily={'body'}
                      fontWeight={'200'}
                      fontStyle={'normal'}
                      color={'secondary.400'}>
                    {locale === 'en'
                        ? lineup?.team_one?.title_en
                        : lineup?.team_one?.title_ar}
                  </Text>
                  <HStack alignItems={'center'}>
                    <Users width={18} height={18} color={Colors.secondary}/>
                    <Text
                        fontFamily={'body'}
                        fontWeight={'100'}
                        fontStyle={'normal'}
                        fontSize={12}
                        color={'white'}>
                      {' '}
                      {lineup?.team_one?.added_players}/
                      {lineup?.team_one?.formation}
                    </Text>
                  </HStack>
                  {lineup?.team_one?.players.map(i => (
                      <Box key={i.id} alignItems={'center'} width={100} h={110}>
                        <Image
                            source={{
                              uri: i.avatar_url,
                            }}
                            alt={'no img'}
                            w={70}
                            h={70}
                            resizeMode={'cover'}
                            borderRadius={100}
                            mt={3}
                        />
                        <Text
                            fontFamily={'body'}
                            fontWeight={'100'}
                            fontStyle={'normal'}
                            fontSize={'sm'}
                            textAlign={'center'}
                            mt={1}
                            numberOfLines={1}
                            color={'secondary.400'}>
                          {i.username}
                        </Text>
                      </Box>
                  ))}
                  {teamOneBlanks.map(i => (
                      <Box
                          key={i}
                          width={100}
                          h={110}
                          justifyContent={'center'}
                          alignItems={'center'}>
                        <Box
                            w={'90%'}
                            h={'80%'}
                            borderWidth={1}
                            borderRadius={100}
                            alignItems={'center'}
                            justifyContent={'center'}
                            borderColor={'secondary.400'}
                            borderStyle={'dashed'}>
                          <AntDesign name="plus" size={24} color={Colors.secondary}/>
                        </Box>
                      </Box>
                  ))}
                  <Box mb={40}/>
                </VStack>
                <VStack alignItems={'center'} w={'50%'}>
                  <Text
                      fontFamily={'body'}
                      fontWeight={'200'}
                      fontStyle={'normal'}
                      color={'yellow.400'}>
                    {locale === 'en'
                        ? lineup?.team_two?.title_en
                        : lineup?.team_two?.title_ar}
                  </Text>
                  <HStack alignItems={'center'}>
                    <Users width={18} height={18} color={Colors.yellow}/>
                    <Text
                        fontFamily={'body'}
                        fontWeight={'100'}
                        fontStyle={'normal'}
                        fontSize={12}
                        color={'white'}>
                      {' '}
                      {lineup?.team_two?.added_players}/
                      {lineup?.team_two?.formation}
                    </Text>
                  </HStack>
                  {lineup?.team_two?.players.map(i => (
                      <Box
                          key={String(i.id)}
                          alignItems={'center'}
                          width={100}
                          h={110}>
                        <Image
                            source={{
                              uri: i.avatar_url,
                            }}
                            alt={'no img'}
                            w={70}
                            h={70}
                            resizeMode={'cover'}
                            borderRadius={100}
                            mt={3}
                        />
                        <Text
                            fontFamily={'body'}
                            fontWeight={'100'}
                            fontStyle={'normal'}
                            fontSize={'sm'}
                            textAlign={'center'}
                            mt={1}
                            color={'yellow.400'}>
                          {i.username}
                        </Text>
                      </Box>
                  ))}
                  {/* --------------- blank card  --------------- */}
                  {teamTwoBlanks.map(i => (
                      <Box
                          key={i}
                          width={100}
                          h={110}
                          justifyContent={'center'}
                          alignItems={'center'}>
                        <Box
                            w={'90%'}
                            h={'80%'}
                            borderWidth={1}
                            borderRadius={100}
                            alignItems={'center'}
                            justifyContent={'center'}
                            borderColor={'yellow.400'}
                            borderStyle={'dashed'}>
                          <AntDesign name="plus" size={24} color={Colors.yellow}/>
                        </Box>
                      </Box>
                  ))}
                  <Box mb={40}/>
                </VStack>
              </HStack>
              {/*---------------------NOTIFICATION MODAL ------------------------*/}
              <Modal
                  isOpen={showModal}
                  defaultIsOpen={true}
                  justifyContent="flex-end"
                  onClose={() => setShowModal(false)}
                  _backdrop={{
                    _dark: {
                      bg: 'gray.800',
                    },
                    bg: 'gray.800',
                  }}
                  size="xl">
                <ImageBackground
                    source={require('../../../../assets/modalBg.png')}
                    resizeMode={'cover'}
                    style={{width: WIDTH}}>
                  <Divider
                      w={'8%'}
                      bg={'yellow.400'}
                      alignSelf={'center'}
                      h={'1%'}
                      borderRadius={5}
                  />
                  <Text
                      fontFamily="heading"
                      fontWeight="100"
                      fontStyle="italic"
                      color={'white'}
                      fontSize={'lg'}
                      py={4}
                      textAlign={'center'}>
                    {t('Send request')}
                  </Text>
                  <AntDesign
                      name="closecircle"
                      size={20}
                      color="red"
                      style={{position: 'absolute', top: 0, right: 0, padding: 5}}
                  />
                  <Divider bg={'muted.600'}/>
                  <Box p={3}>
                    <Text
                        my={3}
                        fontFamily={'body'}
                        fontWeight="100"
                        fontStyle="normal"
                        color={'white'}
                        textAlign={'center'}
                        lineHeight={20}
                        fontSize={'sm'}>
                      {t('Are you sure you want to join this game ?')}
                    </Text>
                    <Button
                        variant="solid"
                        colorScheme={'secondary'}
                        my={3}
                        _text={{
                          fontFamily: 'heading',
                          fontWeight: '100',
                          fontStyle: 'italic',
                          fontSize: 'md',
                          color: 'primary.400',
                        }}
                        onPress={onPressNotifyHandler}>
                      {t('Yes, notify me')}
                    </Button>
                    <Button
                        variant="link"
                        colorScheme={'yellow'}
                        onPress={() => {
                          setShowModal(false);
                        }}
                        _text={{
                          fontFamily: 'body',
                          fontWeight: '200',
                          fontStyle: 'normal',
                          fontSize: 'sm',
                        }}>
                      {t('Cancel')}
                    </Button>
                  </Box>
                </ImageBackground>
              </Modal>
              {/*----------------------public access modal---------------------------------*/}
              <Modal
                  isOpen={visibleModal}
                  onClose={() => {
                    setVisibleModal(false);
                    onPressHandler(true);
                  }}
                  defaultIsOpen={true}
                  justifyContent="flex-end"
                  _backdrop={{
                    _dark: {
                      bg: 'gray.800',
                    },
                    bg: 'gray.800',
                  }}
                  size="xl">
                <ImageBackground
                    source={require('../../../../assets/modalBg.png')}
                    resizeMode={'cover'}
                    style={{width: WIDTH}}>
                  <Divider
                      w={'8%'}
                      bg={'yellow.400'}
                      alignSelf={'center'}
                      h={'1%'}
                      borderRadius={5}
                  />
                  <Text
                      fontFamily="heading"
                      fontWeight="100"
                      fontStyle="italic"
                      color={'white'}
                      fontSize={'lg'}
                      py={4}
                      textAlign={'center'}>
                    {t('Join game')}
                  </Text>
                  <Pressable
                      position={'absolute'}
                      top={0}
                      right={0}
                      p={2}
                      onPress={() => {
                        onPressHandler(false);
                        setVisibleModal(false);
                      }}>
                    <AntDesign name="closecircle" size={20} color="red"/>
                  </Pressable>
                  <Divider bg={'muted.600'}/>
                  <Box p={3}>
                    <Text
                        my={3}
                        fontFamily={'body'}
                        fontWeight="100"
                        fontStyle="normal"
                        color={'white'}
                        textAlign={'center'}
                        lineHeight={20}
                        fontSize={'sm'}>
                      {t(
                          'Would you like to bring a friend? You can sign them up as your guest',
                      )}
                    </Text>
                    {!loggedInUserJoin && (
                        <Button
                            variant="solid"
                            colorScheme={'secondary'}
                            my={3}
                            _text={{
                              fontFamily: 'heading',
                              fontWeight: '100',
                              fontStyle: 'italic',
                              fontSize: 'md',
                              color: 'primary.400',
                            }}
                            onPress={() => {
                              setVisibleModal(false);
                              onPressHandler(false);
                              navigation.navigate('PaymentDetail', {
                                matchId: matchId,
                                selectedPlayerList: [userId],
                              });
                            }}>
                          {t('Just me')}
                        </Button>
                    )}
                    <Button
                        variant="link"
                        colorScheme={'yellow'}
                        onPress={() => {
                          setVisibleModal(false);
                          onPressHandler(false);
                          navigation.navigate('ManageGuest', {
                            loggedInUserJoin: loggedInUserJoin,
                            matchId: matchId,
                          });
                        }}
                        _text={{
                          fontFamily: 'body',
                          fontWeight: '200',
                          fontStyle: 'normal',
                          fontSize: 'sm',
                        }}>
                      {t('I will bring a friend')}
                    </Button>
                    {/*{loggedInUserJoin && (*/}
                    {/*    <Button*/}
                    {/*        variant="solid"*/}
                    {/*        colorScheme={'secondary'}*/}
                    {/*        my={3}*/}
                    {/*        onPress={() => {*/}
                    {/*        }}*/}
                    {/*        _text={{*/}
                    {/*          fontFamily: 'heading',*/}
                    {/*          fontWeight: '100',*/}
                    {/*          fontStyle: 'italic',*/}
                    {/*          fontSize: 'md',*/}
                    {/*          color: 'primary.400',*/}
                    {/*        }}>*/}
                    {/*      {t('Leave Game')}*/}
                    {/*    </Button>*/}
                    {/*)}*/}
                  </Box>
                </ImageBackground>
              </Modal>
            </ScrollView>
        )}
        {showNotify ? (
            <Box
                p={5}
                bg={'background.400'}
                w={'100%'}
                position={'absolute'}
                bottom={0}>
              {loggedInUserJoin ? (
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
                        if (availableSlot > 1) {
                          setVisibleModal(true);
                          onPressHandler(true);
                        }
                      }}>
                    {t('Manage Booking')}
                  </Button>
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
                      onPress={onPressGameJoinHandler}>
                    {t('Join')}
                  </Button>
              )}
            </Box>
        ) : (
            <HStack
                p={5}
                w={'100%'}
                position={'absolute'}
                bottom={0}
                bg={'background.400'}
                justifyContent={'space-between'}>
              {info?.is_slot_full && info?.is_joined === false ? (
                  <Button
                      onPress={() => {
                        setShowModal(true);
                        onPressHandler(true);
                      }}
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
                      colorScheme={'yellow'}>
                    {t('Notify me')}
                  </Button>
              ) : (
                  <View/>
              )}

              <Button
                  variant={'solid'}
                  w={'48%'}
                  rounded={0}
                  isDisabled={true}
                  _text={{
                    fontFamily: 'heading',
                    fontWeight: '100',
                    fontStyle: 'italic',
                    fontSize: 'md',
                    color: 'primary.400',
                  }}
                  colorScheme={'secondary'}>
                {t('Join')}
              </Button>
            </HStack>
        )}
      </Box>
  );
};
