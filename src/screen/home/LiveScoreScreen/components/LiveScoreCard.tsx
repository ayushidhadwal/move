import React, {FC} from 'react';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import {ImageSourcePropType} from 'react-native';
import {MapPin} from '../../../../component/svg';

type LiveScoreType = {
  index: number;
  player1Img: ImageSourcePropType;
  player2Img: ImageSourcePropType;
  player1Name: string;
  player2Name: string;
  score1: string;
  score2: string;
  address: string;
};

export const LiveScoreCard: FC<LiveScoreType> = ({
  index,
  player1Img,
  player2Img,
  player1Name,
  player2Name,
  score1,
  score2,
  address,
}) => {
  return (
    <Box
      bg={'background.400'}
      flex={1 / 2}
      ml={index % 2 !== 0 ? 3 : 0}
      mb={5}
      pt={2}
      mt={index === 0 || index === 1 ? 3 : 0}>
      <Box>
        <HStack justifyContent={'space-between'} px={2} pt={3}>
          <Box alignItems={'center'} w={'40%'}>
            <Image
              source={player1Img}
              w={60}
              h={60}
              alt={'no img'}
              resizeMode={'cover'}
              rounded={100}
              borderWidth={1}
              borderColor={'secondary.400'}
            />
            <Text
              mt={3}
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={'xs'}
              fontWeight={'200'}
              numberOfLines={1}
              color={'secondary.400'}>
              {player1Name}
            </Text>
            <Text
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={'5xl'}
              fontWeight={'200'}
              color={score1 === '1' ? 'white' : 'yellow.400'}>
              {score1}
            </Text>
          </Box>
          <VStack alignItems={'center'} w={'20%'} h={130}>
            <Text
              mt={5}
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={'md'}
              fontWeight={'200'}
              color={'yellow.400'}>
              vs
            </Text>
            <Box
              w={'40%'}
              h={'4%'}
              bg={'secondary.400'}
              position={'absolute'}
              bottom={0}
            />
          </VStack>
          <Box alignItems={'center'} w={'40%'}>
            <Image
              source={player2Img}
              w={60}
              h={60}
              alt={'no img'}
              resizeMode={'cover'}
              rounded={100}
              borderWidth={1}
              borderColor={'secondary.400'}
            />
            <Text
              mt={3}
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={'xs'}
              fontWeight={'200'}
              color={'secondary.400'}>
              {player2Name}
            </Text>
            <Text
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={'5xl'}
              fontWeight={'200'}
              color={score2 === '1' ? 'white' : 'yellow.400'}>
              {score2}
            </Text>
          </Box>
        </HStack>
      </Box>
      <HStack
        alignItems={'center'}
        justifyContent={'center'}
        bg={'#263C59'}
        p={2}>
        <MapPin width={15} height={15} />
        <Text color={'white'} fontSize={'xs'} ml={2}>
          {address}
        </Text>
      </HStack>
    </Box>
  );
};
