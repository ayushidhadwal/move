import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import {AppLayout} from '../../../component/common/AppLayout';
import {RootStackScreenProps} from '../../../navigation/types';
import {Progress} from '../../player-info/choose-sport/components/Progress';
import {Header} from '../../../component/common/Header';
import {Trophy, Users} from '../../../component/svg';
import {Colors} from '../../../styles';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import i18n from 'i18next';
import {Loader} from '../../../component/common/Loader';
import {useMessage} from '../../../hooks/useMessage';
import {useError} from '../../../context/ErrorProvider';

type Props = RootStackScreenProps<'SelectPlayer'>;

const PlayerItem = ({image, isSelected, name, isYellow, onPress}: any) => {
  return (
    <Pressable onPress={onPress}>
      <VStack alignItems={'center'}>
        <Image
          source={{uri: image}}
          alt={'no img'}
          w={70}
          h={70}
          resizeMode={'cover'}
          borderRadius={100}
          mt={3}
          opacity={3}
        />
        {isSelected ? (
          <Box
            bg={'yellow.400'}
            mt={-4}
            width={4}
            height={4}
            justifyContent={'center'}
            alignItems={'center'}
            alignSelf={'center'}
            borderRadius={100}>
            <Trophy width={9} height={9} color={Colors.black} />
          </Box>
        ) : null}

        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          textAlign={'center'}
          mt={1}
          color={isYellow ? 'yellow.400' : 'secondary.400'}>
          {name}
        </Text>
      </VStack>
    </Pressable>
  );
};

export const SelectPlayerScreen: FC<Props> = ({navigation, route}) => {
  const [playerLoading, setPlayerLoading] = useState<boolean>(true);
  const [step1, setStep1] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const setMessage = useMessage();
  const setError = useError();

  const {matchId} = route.params;
  const locale = i18n.language;

  const getPlayer = () => {
    setPlayerLoading(true);

    Axios.get(`${ApiEndpoints.matchReview.matchReview}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setStep1(response.data.data.step_one);
          console.log(response.data.data.step_one);
        }
      })
      .catch((e: any) => {
        setError(e?.message);
      })
      .finally(() => {
        setPlayerLoading(false);
      });
  };

  useEffect(() => {
    getPlayer();
  }, []);

  const {t} = useTranslation();
  return (
    <AppLayout>
      <Box flex={1}>
        <Header heading={String(t('Match review'))} />
        {playerLoading ? (
          <Loader />
        ) : (
          <>
            <Progress value={1} />
            <ScrollView>
              <Text
                mt={4}
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                fontSize={'md'}
                textAlign={'center'}
                color={'secondary.400'}>
                {t('Select player of the match')}
              </Text>
              <HStack mt={10}>
                <VStack alignItems={'center'} w={'50%'}>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    color={'secondary.400'}>
                    {locale === 'en'
                      ? step1?.team_one?.title_en
                      : step1?.team_one?.title_ar}
                  </Text>
                  <HStack alignItems={'center'}>
                    <Users width={18} height={18} color={Colors.secondary} />
                    <Text
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={12}
                      color={'white'}>
                      {' '}
                      3/{step1?.team_one?.added_players}
                    </Text>
                  </HStack>
                  {step1?.team_one?.players.map(player => (
                    <PlayerItem
                      name={player.username}
                      image={player.avatar}
                      isSelected={selected === player.id}
                      isYellow={false}
                      onPress={() => {
                        setSelected(player.id);
                      }}
                    />
                  ))}
                </VStack>
                <VStack alignItems={'center'} w={'50%'}>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    color={'yellow.400'}>
                    {locale === 'en'
                      ? step1?.team_two?.title_en
                      : step1?.team_two?.title_ar}
                  </Text>
                  <HStack alignItems={'center'}>
                    <Users width={18} height={18} color={Colors.yellow} />
                    <Text
                      fontFamily={'body'}
                      fontWeight={'100'}
                      fontStyle={'normal'}
                      fontSize={12}
                      color={'white'}>
                      {' '}
                      2/{step1?.team_two?.added_players}
                    </Text>
                  </HStack>

                  {step1?.team_two?.players.map(player => (
                    <PlayerItem
                      name={player.username}
                      image={player.avatar}
                      isSelected={selected === player.id}
                      isYellow={true}
                      onPress={() => {
                        console.log(player);
                        setSelected(player.id);
                      }}
                    />
                  ))}
                </VStack>
              </HStack>
            </ScrollView>
          </>
        )}
        <Box
          p={5}
          bg={'background.400'}
          w={'100%'}
          position={'absolute'}
          bottom={0}>
          <Button
            variant={'solid'}
            w={'100%'}
            rounded={0}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}
            onPress={() => {
              if (selected) {
                navigation.navigate('ReviewQuestion', {
                  matchId: matchId,
                  selectedPlayer: selected,
                });
              } else {
                setMessage('Please Select a Player');
              }
            }}>
            {t('Next')}
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
};
