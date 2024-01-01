import React, {FC, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {ActivityIndicator, Dimensions, ImageSourcePropType} from 'react-native';

import {Map, MapPin, Trophy} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import {Header} from '../../../../component/common/Header';
import {useTranslation} from 'react-i18next';

type InvitationCardType = {
  index: number;
  guestName: string;
  id: string;
  img: ImageSourcePropType;
  onPressHandler: () => void;
  updateWishStatus: (id: string, status: number) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const InvitationCard: FC<InvitationCardType> = ({
  index,
  id,
  guestName,
  img,
  onPressHandler,
  updateWishStatus,
}) => {
  const [declineLoading, setDeclineLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const {t} = useTranslation();
  return (
    <Pressable
      onPress={onPressHandler}
      bg={'background.400'}
      mb={5}
      w={WIDTH - 40}
      borderColor={'yellow.400'}
      alignSelf={'center'}
      mt={index === 0 ? 5 : 0}>
      <HStack
        alignItems={'center'}
        p={2}
        // bg={'blue.300'}
        // justifyContent={'space-between'}
      >
        <HStack alignItems={'center'}>
          <Image
            alt={'no img'}
            source={img}
            w={44}
            h={44}
            resizeMode={'cover'}
          />
          <Text
            fontFamily={'body'}
            fontSize={'sm'}
            fontWeight={'100'}
            fontStyle={'normal'}
            ml={2}
            color={'white'}>
            {guestName}
          </Text>
        </HStack>

        <HStack
          // ml={15}
          // backgroundColor={'#FFFF00'}
          space={4}
          // width={23}
          alignSelf={'flex-end'}
          alignItems={'flex-end'}
          position={'absolute'}
          bottom={2}
          right={19}>
          <Box style={{width: 60}} bg={'#01FD48'}>
            {!acceptLoading ? (
              <Pressable
                onPress={async () => {
                  setAcceptLoading(true);
                  await updateWishStatus(id, 1);
                  // setAcceptLoading(false);
                }}>
                <Text
                  fontFamily={'heading'}
                  fontSize={9}
                  p={0.5}
                  // w={'60%'}
                  textAlign={'center'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  color={'primary.400'}>
                  {t('Accept')}
                </Text>
              </Pressable>
            ) : (
              <ActivityIndicator size={17} color={'black'} />
            )}
          </Box>
          <Box style={{width: 60}} bg={'#FD0101'}>
            {!declineLoading ? (
              <Pressable
                onPress={async () => {
                  setDeclineLoading(true);
                  await updateWishStatus(id, 1);
                  // setAcceptLoading(false);
                }}>
                <Text
                  fontFamily={'heading'}
                  fontSize={9}
                  p={0.5}
                  // w={'60%'}
                  textAlign={'center'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  // ml={2}
                  color={'white'}>
                  {t('Decline')}
                </Text>
              </Pressable>
            ) : (
              <ActivityIndicator size={17} color={'white'} />
            )}
          </Box>
        </HStack>
      </HStack>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'#263C59'}
        p={2}>
        <HStack>
          <Trophy
            height={15}
            width={15}
            color={id === '1' ? 'white' : Colors.secondary}
          />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {t('Player of the match award')}- 10
          </Text>
        </HStack>
        <Text
          color={id === '1' ? 'white' : 'secondary.400'}
          fontSize={'xs'}
          ml={1}>
          {t('View profile')}
        </Text>
      </HStack>
    </Pressable>
  );
};
