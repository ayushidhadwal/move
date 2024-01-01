import React, {FC, useState} from 'react';
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {AppLayout} from '../../component/common/AppLayout';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {Setting, Trophy} from '../../component/svg';
import {Colors} from '../../styles';
import {
  randomUser,
  useGetUserDetails,
} from '../../hooks/user/useGetUserDetails';
import {Loader} from '../../component/common/Loader';
import {RootState} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';
import {ConfirmModal} from '../../component/common/ConfirmModal';
import {FrameSVG} from '../../component/common/FrameSvg';
import {UserStatistics} from '../../component/common/UserStatistics';

type Props = RootBottomTabScreenProps<'Profile'>;

export const ProfileScreen: FC<Props> = ({navigation, route}) => {
  const {userId} = useSelector((state: RootState) => state.auth);
  console.log(userId);

  // console.log(route.params?.userId);

  const [show, setShow] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

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
    randomUser,
    toggleFollow,
  } = useGetUserDetails(userId);

  const onPressHandler = async (status: boolean) => {
    try {
      const result = await toggleFollow(status, selectedId);
      if (result) {
        setShow(false);
        setMessage(String(t('Followed Successfully !!!')));
      } else {
        setVisible(false);
        setMessage(String(t('Unfollowed Successfully !!!')));
      }
    } catch (e: any) {
      setShow(false);
      setVisible(false);
      setError(e.message);
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
            <Box w={'12.5%'} />
            <Box w={'75%'}>
              <Text
                fontFamily={'heading'}
                fontStyle={'italic'}
                color={'white'}
                textAlign={'center'}
                fontWeight={'100'}
                fontSize={'md'}>
                {t('Profile')}
              </Text>
            </Box>
            <Pressable
              w={'12.5%'}
              alignItems={'flex-end'}
              onPress={() => navigation.navigate('Settings')}>
              <Setting width={20} height={20} />
            </Pressable>
          </HStack>
          <ScrollView flex={1}>
            <HStack mx={5} mt={2}>
              <Box w={'15%'} />
              <HStack
                w={'85%'}
                borderWidth={1}
                borderColor={'secondary.400'}
                bg={'background.400'}>
                <Box w={'20%'} />
                <Box w={'77%'} ml={2} paddingRight={8}>
                  <Text
                    textAlign={'left'}
                    pt={2}
                    fontFamily={'heading'}
                    fontStyle={'italic'}
                    color={'white'}
                    fontWeight={'100'}
                    fontSize={'lg'}
                    noOfLines={2}>
                    {userDetails.username}
                  </Text>
                  <Text
                    textAlign={'left'}
                    pr={2}
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
                    pr={2}
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
                  <HStack alignItems={'center'} mt={0.5} mb={2}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Follower', {userId: userId})
                      }>
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
                      onPress={() =>
                        navigation.navigate('Following', {userId: userId})
                      }>
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
                  top: 4,
                  alignSelf: 'center',
                }}
                width={100}
                height={100}
              />
            </HStack>
            <UserStatistics />
            <Text
              fontFamily={'heading'}
              mb={2}
              mt={8}
              px={5}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={'lg'}
              color={'secondary.400'}>
              {t('Movers you might know')}
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={randomUser}
              keyExtractor={item => String(item.id)}
              renderItem={({item}: {item: randomUser}) => (
                <Pressable
                  w={120}
                  h={170}
                  ml={5}
                  mb={5}
                  onPress={() =>
                    navigation.navigate('PlayerProfile', {userId: item.id})
                  }>
                  <Box
                    w={120}
                    h={120}
                    position={'absolute'}
                    bottom={0}
                    bg={'background.400'}
                    borderWidth={1}
                    borderColor={'secondary.400'}>
                    <Image
                      alt={'no img'}
                      source={
                        item.avatar_url
                          ? {uri: item.avatar_url}
                          : require('../../assets/data/user2.png')
                      }
                      w={90}
                      h={90}
                      borderRadius={100}
                      borderWidth={1}
                      borderColor={'secondary.400'}
                      mt={-12}
                      alignSelf={'center'}
                    />
                    <Text
                      mt={1}
                      w={'90%'}
                      alignSelf={'center'}
                      color={'white'}
                      textAlign={'center'}
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={'sm'}>
                      {item.username}
                    </Text>
                    {!item.isFollowed ? (
                      <Text
                        onPress={() => {
                          setShow(true);
                          setSelectedId(String(item.id));
                        }}
                        bg={'yellow.400'}
                        px={1}
                        py={0}
                        position={'absolute'}
                        bottom={0}
                        mb={1.5}
                        alignSelf={'center'}
                        textAlign={'center'}
                        w={'60%'}
                        fontFamily={'body'}
                        fontWeight={'200'}
                        fontStyle={'normal'}
                        fontSize={'sm'}
                        color={'black'}>
                        {t('Follow')}
                      </Text>
                    ) : (
                      <Text
                        onPress={() => {
                          setVisible(true);
                          setSelectedId(String(item.id));
                        }}
                        bg={'yellow.400'}
                        px={1}
                        py={0}
                        position={'absolute'}
                        bottom={0}
                        mb={1.5}
                        alignSelf={'center'}
                        textAlign={'center'}
                        w={'70%'}
                        fontFamily={'body'}
                        fontWeight={'200'}
                        fontStyle={'normal'}
                        fontSize={'sm'}
                        color={'black'}>
                        {t('Unfollow')}
                      </Text>
                    )}
                  </Box>
                </Pressable>
              )}
            />
            <ConfirmModal
              message={String(
                t('Are you sure you want to follow this player?'),
              )}
              onClose={() => setShow(false)}
              onPressHandler={() => onPressHandler(true)}
              visible={show}
            />
            <ConfirmModal
              message={String(
                t('Are you sure you want to unfollow this player?'),
              )}
              onClose={() => setVisible(false)}
              onPressHandler={() => onPressHandler(false)}
              visible={visible}
            />
          </ScrollView>
        </>
      )}
    </AppLayout>
  );
};
