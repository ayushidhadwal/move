import React, {FC, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {
  ActivityIndicator,
  Dimensions,
  ImageSourcePropType,
  View,
} from 'react-native';

import {Map, MapPin, Trophy} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import {Header} from '../../../../component/common/Header';
import {useTranslation} from 'react-i18next';

type InvitationCardType = {
  isInvited: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  index: number;
  award: number;
  guestName: string;
  userId: string;
  img: {uri: string};
  onPressHandler: () => void;
  sendMatchInvitation: (receiverId: any, type: string) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const SendInvitationCard: FC<InvitationCardType> = ({
  index,
  userId,
  guestName,
  img,
  onPressHandler,
  sendMatchInvitation,
  isInvited,
  award,
  isAccepted,
  isRejected,
}) => {
  const [inviteLoading, setInviteLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const {t} = useTranslation();
  console.log('user id is', userId);
  return (
    <View
      style={{
        height: 130,
        // width: '100%',
        backgroundColor: '#1B2C46',
        marginBottom: 16,
        marginHorizontal: 8,
        borderColor: '#FFD53D',
      }}>
      {/* part 1 */}
      <View
        style={{
          height: 100,
          width: '100%',
          flexDirection: 'row',
          paddingLeft: 8,
          paddingRight: 22,
          // backgroundColor: 'yellow',
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          </View>

          {/* button */}
          {!isInvited || isRejected ? (
            <Box
              alignItems={'center'}
              style={{width: 'Invite again' ? 80 : 50}}
              bg={'#00FFFF'}>
              {!inviteLoading ? (
                <Pressable
                  disabled={isInvited}
                  onPress={async () => {
                    // if (isInvited) {
                    //   return;
                    // }
                    setInviteLoading(true);
                    await sendMatchInvitation(userId, '1');

                    setInviteLoading(false);
                  }}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={9}
                    p={1}
                    textAlign={'center'}
                    fontWeight={'100'}
                    fontStyle={'normal'}
                    color={'black'}>
                    {isInvited
                      ? t('Invited')
                      : isRejected
                      ? t('Invite again')
                      : t('Invite')}
                  </Text>
                </Pressable>
              ) : (
                <ActivityIndicator
                  style={{alignSelf: 'center'}}
                  size={17}
                  color={'black'}
                />
              )}
            </Box>
          ) : null}
        </View>
      </View>

      {/* part 2 */}
      <View
        style={{
          height: 30,
          width: '100%',
          backgroundColor: 'background.400',
        }}>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={'#263C59'}
          p={2}>
          <HStack>
            <Trophy
              height={15}
              width={15}
              color={userId === '1' ? 'white' : Colors.secondary}
            />
            <Text color={'white'} fontSize={'xs'} ml={1}>
              {t('Player of the match award')}- {award}
            </Text>
          </HStack>
          <Text
            color={userId === '1' ? 'white' : 'secondary.400'}
            fontSize={'xs'}
            ml={1}>
            {t('View profile')}
          </Text>
        </HStack>
      </View>

      {/* status chip */}
      {isInvited || isRejected ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: isAccepted
              ? '#7CFC00'
              : isRejected
              ? '#ff0000'
              : '#00FFFF',
            padding: 4,
            alignItems: 'center',
            right: 0,
            justifyContent: 'center',
          }}>
          <Text
            fontFamily={'heading'}
            textAlign={'center'}
            fontWeight={'100'}
            fontStyle={'normal'}
            fontSize={9}
            style={{
              color: isAccepted ? 'white' : isRejected ? 'white' : 'black',
            }}>
            {isAccepted
              ? t('Accepted')
              : isRejected
              ? t('Rejected')
              : t('Invited')}
          </Text>
        </View>
      ) : null}

      {/* status chip ends here */}
    </View>
  );
};
