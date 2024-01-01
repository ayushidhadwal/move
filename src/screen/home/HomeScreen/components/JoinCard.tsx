import React, {FC, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {ActivityIndicator, Dimensions, ImageSourcePropType} from 'react-native';
import {
  Calender,
  Close,
  CoEd,
  Map,
  MapPin,
  NewComer,
  Users,
} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

type JoinCardType = {
  index: number;
  id: string;
  game: string;
  icon: React.ReactNode;
  name: string;
  img: ImageSourcePropType;
  date: string;
  player: string;
  type: string;
  level: string;
  address: string;
  distance: string;
  updateWishStatus: (
    matchId: number,
    userId: number,
    id: string,
    status: number,
    requestStatus: number,
  ) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const JoinCard: FC<JoinCardType> = ({
  index,
  id,
  game,
  icon,
  name,
  img,
  date,
  player,
  type,
  level,
  address,
  distance,
  updateWishStatus,
  userId,
  matchId,
}) => {
  const [closeLoading, setCloseLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <Box bg={'background.400'} mr={5} ml={index === 0 ? 5 : 0} w={WIDTH * 0.6}>
      <HStack justifyContent={'space-between'}>
        <HStack backgroundColor={'yellow.400'} px={1} alignItems={'center'}>
          {icon}
          <Text fontWeight={'200'} fontSize={'sm'} mx={2}>
            {game}
          </Text>
        </HStack>

        <Box pt={1} pr={1}>
          {!closeLoading ? (
            <Pressable
              onPress={async () => {
                setCloseLoading(true);
                await updateWishStatus(
                  userId,
                  matchId,
                  userId,
                  1, //host doing  public accesss 2  or user doing invite only 1,
                  0, //cross icon 0   and accept button 1
                );
                setCloseLoading(false);
              }}>
              <Close width={16} height={16} />
            </Pressable>
          ) : (
            <ActivityIndicator size={16} color={'red'} />
          )}
        </Box>
      </HStack>
      <Box p={2}>
        <Image
          source={img}
          w={70}
          h={70}
          rounded={100}
          alt={'img'}
          borderColor={'secondary.400'}
          borderWidth={1}
          resizeMode={'cover'}
        />
        <Text
          textAlign={'left'}
          fontFamily={'body'}
          fontSize={'md'}
          pt={1}
          color={'secondary.400'}
          textTransform={'capitalize'}
          fontWeight={'200'}>
          {name}
        </Text>
        <HStack alignItems={'center'} my={1}>
          <Calender width={18} height={18} />
          <Text
            color={'white'}
            fontWeight={'200'}
            fontSize={'sm'}
            ml={2}
            fontFamily={'body'}>
            {date}
          </Text>
        </HStack>
        <HStack alignItems={'center'} mb={1}>
          <Users width={20} height={20} color={Colors.secondary} />
          <Text
            ml={2}
            color={'white'}
            fontWeight={'200'}
            fontSize={'sm'}
            fontFamily={'body'}>
            {player}
          </Text>
        </HStack>
        <HStack alignItems={'center'} mb={1}>
          <CoEd width={22} height={22} color={'white'} subColor={'#8acaff'} />
          <Text
            color={'white'}
            fontWeight={'100'}
            fontSize={'sm'}
            ml={2}
            fontFamily={'body'}>
            {type}
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'} alignItems={'center'} mb={1}>
          <HStack alignItems={'center'}>
            <NewComer width={20} height={20} />
            <Text
              color={'white'}
              fontWeight={'200'}
              fontSize={'sm'}
              ml={2}
              fontFamily={'body'}>
              {level}
            </Text>
          </HStack>

          <Box
            style={{width: 60}}
            h={4}
            backgroundColor={'#01FD48'}
            px={2}
            py={0}
            alignItems={'center'}>
            {!acceptLoading ? (
              <Pressable
                onPress={async () => {
                  navigation.navigate('PaymentDetail', {
                    matchId: matchId,
                    selectedPlayerList: [userId],
                    coupon: null,
                  });

                  // setAcceptLoading(true);
                  // await updateWishStatus( userId,
                  //     matchId,
                  //     userId,
                  //     1,//host doing  public accesss 2  or user doing invite only 1,
                  //     1, //cross icon 0   and accept button 1
                  //
                  // );
                  // setAcceptLoading(false);
                }}>
                <Text fontWeight={'200'} fontSize={'xs'}>
                  {t('Accept')}
                </Text>
              </Pressable>
            ) : (
              <ActivityIndicator size={'small'} color={'black'} />
            )}
          </Box>
        </HStack>
      </Box>
      <HStack justifyContent={'space-between'} bg={'#263C59'} p={2}>
        <HStack alignItems={'center'}>
          <Map height={15} width={15} />
          <Text color={'white'} fontSize={'xs'} ml={2}>
            {address}
          </Text>
        </HStack>
        <HStack>
          <MapPin width={15} height={15} />
          <Text color={'white'} fontSize={'xs'} ml={2}>
            {distance} {t('km')}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};
