import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {BlurView} from '@react-native-community/blur';

import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../common/Header';
import {Message} from '../svg';
import {AppLayout} from '../common/AppLayout';
import {GameInfoScreen} from '../../screen/existed-game/existed-game-details/game-info';
import {GameLineupScreen} from '../../screen/existed-game/existed-game-details/game-lineup';
import {useGetMatchDetails} from '../../hooks/match/useMatchDetails';
import {Loader} from '../common/Loader';
import {Platform} from 'react-native';
import {IosChatScreen} from '../../screen/existed-game/chat/IosChatScreen';
import {AndroidChatScreen} from '../../screen/existed-game/chat/AndroidChatScreen';

type Props = RootStackScreenProps<'GameTopTab'>;

export const GameTopTabNavigation: FC<Props> = ({route, navigation}) => {
  const [screen, setScreen] = useState<string>(route.params.screen);
  const [blur, setBlur] = useState<boolean>(false);
  const matchId: number = route.params.matchId;

  const {info, lineup, dataLoading} = useGetMatchDetails({matchId});

  const {t} = useTranslation();

  useEffect(() => {
    setScreen(route.params.screen);
  }, [route.params.screen]);

  const onPressScreenChange = () => {
    if (screen === 'Info') {
      return (
        <GameInfoScreen
          info={info}
          matchId={matchId}
          dataLoading={dataLoading}
        />
      );
    } else if (screen === 'Lineup') {
      return (
        <GameLineupScreen
          matchId={matchId}
          info={info}
          lineup={lineup}
          dataLoading={dataLoading}
          onPressHandler={val => setBlur(val)}
        />
      );
    } else {
      // return <ChatScreen navigation={navigation} route={route} />;
      return Platform.OS === 'ios' ? (
        <IosChatScreen navigation={navigation} route={route} />
      ) : (
        <AndroidChatScreen route={route} navigation={navigation} />
      );
    }
  };
  return (
    <AppLayout>
      <Box flex={1}>
        <Header heading={info?.details?.title}>
          {/*<Pressable*/}
          {/*  onPress={() => navigation.navigate('Chat', {matchId: matchId})}>*/}
          {/*  <Message width={22} height={22} />*/}
          {/*</Pressable>*/}
        </Header>
        <HStack
          mt={2}
          mb={3}
          w={'90%'}
          alignSelf={'center'}
          borderColor={'yellow.400'}
          borderWidth={1}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Pressable
            bg={screen === 'Info' ? 'yellow.400' : 'primary.400'}
            px={5}
            py={2}
            w={'25%'}
            alignItems={'center'}
            onPress={() => setScreen('Info')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              textTransform={'capitalize'}
              color={screen === 'Info' ? 'primary.400' : 'white'}>
              {t('Info')}
            </Text>
          </Pressable>
          <Pressable
            bg={screen === 'Lineup' ? 'yellow.400' : 'primary.400'}
            px={4}
            py={2}
            w={'30%'}
            alignItems={'center'}
            onPress={() => setScreen('Lineup')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              textTransform={'capitalize'}
              color={screen === 'Lineup' ? 'primary.400' : 'white'}>
              {t('Lineup')}
            </Text>
          </Pressable>

          <Pressable
            bg={screen === 'Chat' ? 'yellow.400' : 'primary.400'}
            px={4}
            py={2}
            w={'40%'}
            alignItems={'center'}
            onPress={() => setScreen('Chat')}>
            <Text
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'italic'}
              fontSize={'sm'}
              textTransform={'capitalize'}
              color={screen === 'Chat' ? 'primary.400' : 'white'}>
              {t('Comments')}
            </Text>
          </Pressable>
        </HStack>
        {dataLoading ? <Loader /> : <>{onPressScreenChange()}</>}

        {blur && (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor={'#0f1f38'}
          />
        )}
      </Box>
    </AppLayout>
  );
};
