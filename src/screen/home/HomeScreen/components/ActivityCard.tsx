import React, {FC} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {
  Calender,
  CoEd,
  Football,
  Map,
  MapPin,
  NewComer,
  Player,
  Users,
} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import {SvgUri} from 'react-native-svg';
import {t} from 'i18next';

type ActivityCardType = {
  index: number;
  matchId: number;
  name: string;
  img: ImageSourcePropType;
  game: string;
  icon: string;
  verses: number;
  date: string;
  type: string;
  level: string;
  player: string;
  address: string;
  distance: string;
  price: string;
  genderIcon: string;
  onPressHandler: (matchId: number) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const ActivityCard: FC<ActivityCardType> = ({
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
      mr={3}
      ml={index === 0 ? 3 : 0}
      w={WIDTH - 50}
      onPress={() => onPressHandler(matchId)}>
      <HStack>
        <Box w={'20%'} alignItems={'center'} justifyContent={'center'}>
          <Image
            source={img}
            w={50}
            h={50}
            rounded={100}
            alt={'img'}
            borderColor={'yellow.400'}
            borderWidth={1}
            resizeMode={'cover'}
          />
          <Text
            fontFamily={'body'}
            fontSize={'xs'}
            pt={1}
            color={'yellow.400'}
            fontWeight={'100'}>
            {name}
          </Text>
        </Box>
        <Box pl={2} w={'80%'}>
          <HStack alignItems={'center'} pt={2}>
            <SvgUri uri={icon} height={30} width={30} />
            <Box
              backgroundColor={'yellow.400'}
              px={1}
              position={'absolute'}
              right={0}
              top={0}>
              <Text fontWeight={'200'} fontSize={'sm'}>
                {price}
              </Text>
            </Box>
          </HStack>
          <HStack alignItems={'center'} mb={3}>
            <Text
              textAlign={'left'}
              fontWeight={'200'}
              fontSize={'md'}
              flexShrink={1}
              noOfLines={1}
              w={'65%'}
              backgroundColor={'red.200'}
              fontFamily={'body'}
              color={'secondary.400'}>
              {game}
            </Text>
            <HStack alignItems={'center'} w={'38%'} pl={4}>
              <SvgUri height={18} uri={genderIcon} />
              <Text color={'white'} fontSize={'xs'} ml={1}>
                {type}
              </Text>
            </HStack>
          </HStack>
          <HStack alignItems={'center'} mb={3}>
            <HStack alignItems={'center'} w={'60%'}>
              <Player width={18} height={18} />
              <Text color={'white'} fontWeight={'200'} fontSize={'md'} ml={1}>
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
            <HStack alignItems={'center'} w={'40%'} pl={5}>
              <NewComer width={20} height={20} />
              <Text color={'white'} fontSize={'xs'} ml={1}>
                {level}
              </Text>
            </HStack>
          </HStack>
          <HStack alignItems={'center'} mb={3}>
            <HStack alignItems={'center'} w={'60%'}>
              <Calender width={18} height={18} />
              <Text color={'white'} fontWeight={'200'} fontSize={'xs'} ml={1}>
                {date}
              </Text>
            </HStack>
            <HStack alignItems={'center'} w={'40%'} pl={5}>
              <Users width={20} height={20} color={Colors.secondary} />
              <Text color={'white'} fontSize={'xs'} ml={2}>
                {player}
              </Text>
            </HStack>
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
        <HStack mr={2}>
          <MapPin width={15} height={15} />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {distance} {t('km')}
          </Text>
        </HStack>
      </HStack>
    </Pressable>
  );
};
