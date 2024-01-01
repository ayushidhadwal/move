import React, {FC, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {
  ActivityIndicator,
  Dimensions,
  ImageSourcePropType,
  View,
} from 'react-native';

import {useTranslation} from 'react-i18next';
import {Trophy} from '../../../component/svg';
import {Colors} from '../../../styles';
import {useNavigation} from '@react-navigation/native';

type InvitationCardType = {
  index: number;
  guestName: string;
  userId: string;
  img: ImageSourcePropType;
  onPressHandler: () => void;
  award: number;
  accepted: boolean;
  declined: boolean;
  joined: boolean;
  updateMatchRequest: (userId: number, status: number) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const ManageRequestCard: FC<InvitationCardType> = ({
  index,
  userId,
  guestName,
  img,
  onPressHandler,
  award,
  updateMatchRequest,
  accepted,
  declined,
  joined,
}) => {
  const [declineLoading, setDeclineLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();

  console.log({declined, accepted});

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
          {(!accepted && !declined) || accepted ? (
            <Box style={{width: 62}} bg={'#01FD48'}>
              {!acceptLoading ? (
                <Pressable
                  disabled={accepted}
                  onPress={async () => {
                    setAcceptLoading(true);
                    await updateMatchRequest(Number(userId), 1);
                    setAcceptLoading(false);
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
                    {accepted ? t('Accepted') : t('Accept')}
                  </Text>
                </Pressable>
              ) : (
                <ActivityIndicator size={17} color={'black'} />
              )}
            </Box>
          ) : null}

          {(!accepted && !declined) || (declined && !joined) ? (
            <Box style={{width: 60}} bg={'#FD0101'}>
              {!declineLoading ? (
                <Pressable
                  disabled={declined}
                  onPress={async () => {
                    setDeclineLoading(true);
                    await updateMatchRequest(Number(userId), 0);
                    setDeclineLoading(false);
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
                    {declined ? t('Declined') : t('Decline')}
                  </Text>
                </Pressable>
              ) : (
                <ActivityIndicator size={17} color={'white'} />
              )}
            </Box>
          ) : null}
        </HStack>
      </HStack>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'#263C59'}
        p={2}>
        <HStack>
          <Trophy height={15} width={15} color={Colors.secondary} />
          <Text color={'white'} fontSize={'xs'} ml={1}>
            {t('Player of the match award')}- {award}
          </Text>
        </HStack>
        <Pressable
          onPress={() => {
            //navigate to profile using userId
            navigation.navigate('PlayerProfile', {userId: userId});
          }}>
          <Text color={'secondary.400'} fontSize={'xs'} ml={1}>
            {t('View profile')}
          </Text>
        </Pressable>
      </HStack>
      {joined ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#00FFFF',
            width: 60,
            alignItems: 'center',
          }}>
          <Text
            fontFamily={'heading'}
            fontSize={9}
            p={1}
            fontWeight={'100'}
            fontStyle={'normal'}
            ml={2}
            color={'black'}>
            Joined
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
};
