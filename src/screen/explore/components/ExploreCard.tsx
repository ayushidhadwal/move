import React, {FC} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {
  Calender,
  Map,
  MapPin,
  NewComer,
  Player,
  Users,
} from '../../../component/svg';
import {Colors} from '../../../styles';
import {t} from 'i18next';

type ExploreCardType = {
  index: number;
  matchId: number;
  name: string;
  img: ImageSourcePropType;
  game: string;
  icon: string;
  genderIcon: string;
  verses: number;
  date: string;
  type: string;
  level: string;
  player: string;
  address: string;
  distance: string;
  price: string;
  onPressHandler: (matchId: number) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const ExploreCard: FC<ExploreCardType> = ({
  index,
  name,
  img,
  game,
  icon,
  verses,
  date,
  type,
  level,
  player,
  address,
  distance,
  price,
  genderIcon,
  matchId,
  onPressHandler,
}) => {
  return (
    <Pressable
      bg={'background.400'}
      mb={5}
      w={WIDTH - 40}
      alignSelf={'center'}
      onPress={() => onPressHandler(matchId)}>
      <HStack>
        <HStack
          backgroundColor={'yellow.400'}
          pl={1}
          alignItems={'center'}
          position={'absolute'}
          top={0}
          left={2}>
          <SvgUri uri={icon} height={12} width={10} />
          <Text fontWeight={'200'} fontSize={'xs'} mx={2}>
            {game}
          </Text>
        </HStack>
        <Box w={'25%'} alignItems={'center'} justifyContent={'center'}>
          <Image
            source={img}
            w={44}
            h={44}
            rounded={100}
            alt={'img'}
            resizeMode={'cover'}
            mt={2}
          />
          <Text
            fontFamily={'body'}
            fontSize={'sm'}
            pt={1}
            color={'yellow.400'}
            fontWeight={'200'}>
            {name}
          </Text>
        </Box>
        <Box w={'75%'} mt={3} p={2}>
          <HStack alignItems={'center'} mb={3} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              <Calender width={18} height={18} />
              <Text
                color={'secondary.400'}
                fontWeight={'200'}
                fontSize={'xs'}
                ml={2}>
                {date}
              </Text>
            </HStack>
            <HStack alignItems={'center'} w={'30%'}>
              <SvgUri height={18} uri={genderIcon} />
              <Text color={'white'} fontSize={'xs'} ml={2}>
                {type}
              </Text>
            </HStack>
          </HStack>

          <HStack alignItems={'center'} mb={3} justifyContent={'space-between'}>
            <HStack>
              <Player width={18} height={18} />
              <Text color={'white'} fontWeight={'200'} fontSize={'md'} ml={2}>
                {verses}
                <Text
                  fontFamily={'body'}
                  fontWeight={'100'}
                  color={'secondary.400'}>
                  {' '}
                  {t('vs')}{' '}
                </Text>
                {verses}
              </Text>
            </HStack>

            <HStack alignItems={'center'} w={'30%'}>
              <Users width={20} height={20} color={Colors.secondary} />
              <Text color={'white'} fontSize={'xs'} ml={2}>
                {player}
              </Text>
            </HStack>
          </HStack>

          <HStack alignItems={'center'} mb={3} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              <NewComer width={20} height={20} />
              <Text color={'white'} fontWeight={'100'} fontSize={'xs'} ml={2}>
                {level}
              </Text>
            </HStack>
            <Box backgroundColor={'yellow.400'} px={0} py={0} ml={2} w={'30%'}>
              <Text
                fontWeight={'200'}
                fontSize={'xs'}
                textAlign={'center'}
                pt={0.5}>
                {price}
              </Text>
            </Box>
          </HStack>
        </Box>
      </HStack>
      <HStack justifyContent={'space-between'} bg={'#263C59'} p={2}>
        <HStack alignItems={'center'}>
          <Map height={15} width={15} />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {address}
          </Text>
        </HStack>
        <HStack>
          <MapPin width={15} height={15} />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {distance} {t('km')}
          </Text>
        </HStack>
      </HStack>
    </Pressable>
  );
};
