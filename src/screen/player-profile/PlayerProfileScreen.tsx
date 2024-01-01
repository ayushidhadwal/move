import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {AppLayout} from '../../component/common/AppLayout';
import {RootStackScreenProps} from '../../navigation/types';
import {Trophy} from '../../component/svg';
import {Colors} from '../../styles';
import {useGetUserDetails} from '../../hooks/user/useGetUserDetails';
import {Loader} from '../../component/common/Loader';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';
import {ConfirmModal} from '../../component/common/ConfirmModal';
import {FrameSVG} from '../../component/common/FrameSvg';
import {UserStatistics} from '../../component/common/UserStatistics';
import {I18nManager} from 'react-native';
import i18n from 'i18next';

type Props = RootStackScreenProps<'PlayerProfile'>;

export const PlayerProfileScreen: FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;
  const [show, setShow] = useState<boolean>(false);
  const [unfollowUser, setUnfollowUser] = useState<boolean>(false);
  const [blockUser, setBlockUser] = useState<boolean>(false);
  const [unblockUser, setUnblockUser] = useState<boolean>(false);
  const locale = i18n.language;

  console.log({userId});

  const {t} = useTranslation();

  const setMessage = useMessage();
  const setError = useError();

  const {
    userDetails,
    loading,
    follower,
    following,
    gamesPlayed,
    manOfTheMatch,
    toggleUserFollow,
    toggleBlockFollow,
  } = useGetUserDetails(userId);

  const onPressHandler = async (status: boolean) => {
    try {
      const result = await toggleUserFollow(status);
      if (result) {
        setShow(false);
        setMessage(String(t('Followed Successfully !!!')));
      } else {
        setUnfollowUser(false);
        setMessage(String(t('Unfollowed Successfully !!!')));
      }
    } catch (e: any) {
      setShow(false);
      setUnfollowUser(false);
      setError(e?.message || e);
    }
  };

  const blockHandler = async (status: boolean) => {
    try {
      const result = await toggleBlockFollow(status);
      if (result) {
        setBlockUser(false);
        setMessage(String(t('Blocked Successfully !!!')));
      } else {
        setUnblockUser(false);
        setMessage(String(t('UnBlocked Successfully !!!')));
      }
    } catch (e: any) {
      setError(e?.message || e);
    }
  };

  return (
    <AppLayout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            px={3}
            py={3}>
            <Pressable w={'12.5%'} onPress={() => navigation.goBack()}>
              {locale === 'en' ? (
                <AntDesign name="arrowleft" size={24} color={'white'} />
              ) : (
                <AntDesign name="arrowright" size={24} color={'white'} />
              )}
            </Pressable>
            <Box w={'75%'}>
              <Text
                fontFamily={'heading'}
                fontStyle={'italic'}
                color={'white'}
                textAlign={'center'}
                fontWeight={'100'}
                fontSize={'md'}>
                {t('Player Profile')}
              </Text>
            </Box>
            <Box w={'12.5%'} />
          </HStack>
          <ScrollView flex={1}>
            <HStack mx={5} mt={2}>
              <Box w={'15%'} />
              <HStack
                w={'85%'}
                borderWidth={1}
                borderColor={'secondary.400'}
                bg={'background.400'}>
                <Box w={'20%'}>
                  <Box
                    width={'100%'}
                    position={'absolute'}
                    bottom={0}
                    bg={
                      userDetails.isFollowByUser && !userDetails.isBlockByMe
                        ? 'rgba(138,202,255,0.1)'
                        : 'background.400'
                    }
                    pt={7}
                  />
                </Box>
                <Box w={'80%'}>
                  <Text
                    textAlign={'left'}
                    w={'85%'}
                    numberOfLines={2}
                    pt={2}
                    px={1}
                    fontFamily={'heading'}
                    fontStyle={'italic'}
                    color={'white'}
                    fontWeight={'100'}
                    fontSize={'lg'}>
                    {userDetails.username}
                  </Text>
                  <Text
                    textAlign={'left'}
                    px={2}
                    fontFamily={'body'}
                    fontStyle={'normal'}
                    color={'secondary.400'}
                    fontWeight={'100'}
                    fontSize={13}>
                    {userDetails.firstName +
                      ' ' +
                      userDetails.middleName +
                      ' ' +
                      userDetails.lastName}
                  </Text>
                  <Text
                    textAlign={'left'}
                    px={2}
                    fontFamily={'body'}
                    fontStyle={'normal'}
                    color={'secondary.400'}
                    fontWeight={'100'}
                    fontSize={13}>
                    {t('Games Played')}:{' '}
                    <Text bold color={'white'}>
                      {gamesPlayed}
                    </Text>
                  </Text>
                  <HStack alignItems={'center'} mt={0.5} ml={2} mb={2}>
                    <Pressable
                      onPress={() => {
                        if (!userDetails.isBlockByMe) {
                          navigation.navigate('Follower', {userId: userId});
                        }
                      }}>
                      <Text
                        fontFamily={'body'}
                        fontStyle={'normal'}
                        color={'secondary.400'}
                        fontWeight={'100'}
                        fontSize={13}>
                        {t('Followers')}:{' '}
                        <Text bold color={'white'}>
                          {follower}
                        </Text>
                      </Text>
                    </Pressable>
                    <Divider
                      bg="gray.500"
                      thickness="2"
                      mx="2"
                      orientation="vertical"
                    />
                    <Pressable
                      onPress={() => {
                        if (!userDetails.isBlockByMe) {
                          navigation.navigate('Following', {userId: userId});
                        }
                      }}>
                      <Text
                        pr={2}
                        fontFamily={'body'}
                        fontStyle={'normal'}
                        color={'secondary.400'}
                        fontWeight={'100'}
                        fontSize={13}>
                        {t('Following')}:{' '}
                        <Text bold color={'white'}>
                          {following}
                        </Text>
                      </Text>
                    </Pressable>
                  </HStack>
                  <HStack
                    alignItems={'center'}
                    bg={'yellow.400'}
                    position={'absolute'}
                    top={0}
                    right={0}
                    p={1}>
                    <Trophy width={12} height={12} color={Colors.black} />
                    <Text
                      ml={1}
                      fontFamily={'heading'}
                      fontStyle={'italic'}
                      color={'black'}
                      fontWeight={'100'}
                      fontSize={10}>
                      {manOfTheMatch}
                    </Text>
                  </HStack>
                  {userDetails.isBlockByMe ? (
                    <Button
                      onPress={() => {
                        setUnblockUser(true);
                      }}
                      variant={'solid'}
                      rounded={0}
                      h={5}
                      p={0}
                      mb={1}
                      mr={3}
                      _text={{
                        fontFamily: 'heading',
                        fontWeight: '100',
                        fontStyle: 'italic',
                        fontSize: 12,
                        color: 'white',
                      }}
                      colorScheme={'red'}>
                      Unblock
                    </Button>
                  ) : userDetails.isFollowByUser ? (
                    <HStack
                      justifyContent={'space-around'}
                      alignItems={'center'}
                      width={'100%'}
                      py={1}
                      pl={1.5}
                      bg={'rgba(138,202,255,0.1)'}>
                      <Button
                        onPress={() => setUnfollowUser(true)}
                        variant={'solid'}
                        rounded={0}
                        h={5}
                        py={0}
                        w={'45%'}
                        _text={{
                          fontFamily: 'heading',
                          fontWeight: '100',
                          fontStyle: 'italic',
                          fontSize: 12,
                          color: 'primary.400',
                        }}
                        colorScheme={'secondary'}>
                        {t('Unfollow')}
                      </Button>
                      <Button
                        onPress={() => setBlockUser(true)}
                        variant={'solid'}
                        rounded={0}
                        h={5}
                        py={0}
                        px={3}
                        w={'45%'}
                        _text={{
                          fontFamily: 'heading',
                          fontWeight: '100',
                          fontStyle: 'italic',
                          fontSize: 12,
                          color: 'white',
                        }}
                        colorScheme={'red'}>
                        {t('Block')}
                      </Button>
                    </HStack>
                  ) : (
                    <Button
                      onPress={() => {
                        setShow(true);
                      }}
                      variant={'solid'}
                      rounded={0}
                      h={5}
                      p={0}
                      mb={1}
                      mr={3}
                      _text={{
                        fontFamily: 'heading',
                        fontWeight: '100',
                        fontStyle: 'italic',
                        fontSize: 12,
                        color: 'primary.400',
                      }}
                      colorScheme={'secondary'}>
                      {t('Follow')}
                    </Button>
                  )}
                </Box>
              </HStack>
              <FrameSVG
                userImg={
                  userDetails.avatarUrl
                    ? userDetails.avatarUrl
                    : 'http://46.101.9.156/assets/media/users/blank.png'
                }
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 10,
                  alignSelf: 'center',
                }}
                width={100}
                height={100}
              />
            </HStack>
            {userDetails.isBlockByMe ? (
              <Box
                flex={1}
                alignItems={'center'}
                justifyItems={'center'}
                my={10}>
                <Image
                  source={require('../../assets/img/lock.png')}
                  w={20}
                  h={20}
                  alignSelf={'center'}
                  alt={'no img'}
                  resizeMode={'contain'}
                  mb={3}
                />
                <Text
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}
                  color={'secondary.400'}>
                  {t('You have blocked this account.')}
                </Text>
              </Box>
            ) : (
              <UserStatistics />
            )}
            {/*<Text*/}
            {/*  fontFamily={'heading'}*/}
            {/*  mb={2}*/}
            {/*  mt={8}*/}
            {/*  px={5}*/}
            {/*  fontWeight={'100'}*/}
            {/*  fontStyle={'normal'}*/}
            {/*  fontSize={'lg'}*/}
            {/*  color={'secondary.400'}>*/}
            {/*  {t('Movers you might know')}*/}
            {/*</Text>*/}
            {/*<FlatList*/}
            {/*  horizontal={true}*/}
            {/*  showsHorizontalScrollIndicator={false}*/}
            {/*  data={randomUser}*/}
            {/*  keyExtractor={item => String(item.id)}*/}
            {/*  renderItem={({item}: {item: randomUser}) => (*/}
            {/*    <Pressable*/}
            {/*      w={120}*/}
            {/*      h={170}*/}
            {/*      ml={5}*/}
            {/*      mb={5}*/}
            {/*      onPress={() =>*/}
            {/*        navigation.navigate('PlayerProfile', {userId: item.id})*/}
            {/*      }>*/}
            {/*      <Box*/}
            {/*        w={120}*/}
            {/*        h={120}*/}
            {/*        position={'absolute'}*/}
            {/*        bottom={0}*/}
            {/*        bg={'background.400'}*/}
            {/*        borderWidth={1}*/}
            {/*        borderColor={'secondary.400'}>*/}
            {/*        <Image*/}
            {/*          alt={'no img'}*/}
            {/*          source={*/}
            {/*            item.avatar_url*/}
            {/*              ? {uri: item.avatar_url}*/}
            {/*              : require('../../assets/data/user2.png')*/}
            {/*          }*/}
            {/*          w={90}*/}
            {/*          h={90}*/}
            {/*          borderRadius={100}*/}
            {/*          borderWidth={1}*/}
            {/*          borderColor={'secondary.400'}*/}
            {/*          mt={-12}*/}
            {/*          alignSelf={'center'}*/}
            {/*        />*/}
            {/*        <Text*/}
            {/*          mt={1}*/}
            {/*          w={'90%'}*/}
            {/*          alignSelf={'center'}*/}
            {/*          color={'white'}*/}
            {/*          textAlign={'center'}*/}
            {/*          fontFamily={'body'}*/}
            {/*          fontWeight={'100'}*/}
            {/*          fontStyle={'normal'}*/}
            {/*          fontSize={'sm'}>*/}
            {/*          {item.username ? item.username : 'testUser'}*/}
            {/*        </Text>*/}
            {/*        <Text*/}
            {/*          onPress={() => {*/}
            {/*            setShow(true);*/}
            {/*          }}*/}
            {/*          bg={'yellow.400'}*/}
            {/*          px={1}*/}
            {/*          py={0}*/}
            {/*          position={'absolute'}*/}
            {/*          bottom={0}*/}
            {/*          mb={1.5}*/}
            {/*          alignSelf={'center'}*/}
            {/*          textAlign={'center'}*/}
            {/*          w={'60%'}*/}
            {/*          fontFamily={'body'}*/}
            {/*          fontWeight={'200'}*/}
            {/*          fontStyle={'normal'}*/}
            {/*          fontSize={'sm'}*/}
            {/*          color={'black'}>*/}
            {/*          {t('Follow')}*/}
            {/*        </Text>*/}
            {/*      </Box>*/}
            {/*    </Pressable>*/}
            {/*  )}*/}
            {/*/>*/}
            <ConfirmModal
              message={t('Are you sure you want to follow this player?')}
              onClose={() => setShow(false)}
              onPressHandler={() => onPressHandler(true)}
              visible={show}
            />
            <ConfirmModal
              message={t('Are you sure you want to unfollow this player?')}
              onClose={() => setUnfollowUser(false)}
              onPressHandler={() => onPressHandler(false)}
              visible={unfollowUser}
            />
            <ConfirmModal
              message={t('Are you sure you want to block this player?')}
              onClose={() => setBlockUser(false)}
              onPressHandler={() => blockHandler(true)}
              visible={blockUser}
            />
            <ConfirmModal
              message={t('Are you sure you want to unblock this player?')}
              onClose={() => setUnblockUser(false)}
              onPressHandler={() => blockHandler(false)}
              visible={unblockUser}
            />
          </ScrollView>
        </>
      )}
    </AppLayout>
  );
};
