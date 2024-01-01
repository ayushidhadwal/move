import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Pressable, Text} from 'native-base';

import {AppLayout} from '../../../component/common/AppLayout';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {Progress} from './components/Progress';
import {RootStackScreenProps} from '../../../navigation/types';
import {BasketBall, Cricket, Football, Tennis} from '../../../component/svg';
import {Colors} from '../../../styles';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {Loader} from '../../../component/common/Loader';

type Props = RootStackScreenProps<'PlayerSport'>;

export const PlayerSportScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [select, setSelect] = useState<string>('');
  const [playerSportLoading, setPlayerSportLoading] = useState<boolean>(true);

  const getPlayerSport = () => {
    setPlayerSportLoading(true);

    Axios.get(`${ApiEndpoints.playerInfo.playerSport}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          // setReviewQuestions(response.data.data.step_two);
        }
      })
      .catch((error: any) => {
        //
      })
      .finally(() => {
        setPlayerSportLoading(false);
      });
  };

  useEffect(() => {
    getPlayerSport();
  }, []);

  return (
    <AppLayout>
      <ScreenHeader heading={String(t('Player info'))} />
      {playerSportLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <Progress value={1} />

          <Text
            fontFamily={'heading'}
            mt={2}
            mb={4}
            textAlign={'center'}
            fontWeight={'100'}
            fontStyle={'italic'}
            fontSize={'sm'}
            color={'secondary.400'}>
            {t('Choose sport')}
          </Text>
          <Pressable
            alignSelf={'center'}
            borderWidth={'1'}
            borderColor={'white'}
            alignItems={'center'}
            justifyContent={'center'}
            p={3}
            w={120}
            h={120}
            bg={select === 'Padel' ? 'yellow.400' : 'background.400'}
            onPress={() => setSelect('Padel')}>
            <Tennis
              width={60}
              height={60}
              color={select === 'Padel' ? Colors.primary : Colors.white}
            />
            <Text
              fontFamily={'body'}
              mt={2}
              fontWeight={select === 'Padel' ? '200' : '100'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={select === 'Padel' ? 'primary.400' : 'white'}>
              {t('Padel')}
            </Text>
          </Pressable>
          <HStack
            justifyContent={'space-between'}
            my={10}
            mx={5}
            w={'80%'}
            alignSelf={'center'}>
            <Pressable
              alignSelf={'center'}
              borderWidth={'1'}
              borderColor={'white'}
              alignItems={'center'}
              justifyContent={'center'}
              p={3}
              w={120}
              h={120}
              bg={select === 'Basketball' ? 'yellow.400' : 'background.400'}
              onPress={() => setSelect('Basketball')}>
              <BasketBall
                width={60}
                height={60}
                color={select === 'Basketball' ? Colors.primary : Colors.white}
              />
              <Text
                fontFamily={'body'}
                mt={2}
                fontWeight={select === 'Basketball' ? '200' : '100'}
                fontStyle={'normal'}
                fontSize={'md'}
                color={select === 'Basketball' ? 'primary.400' : 'white'}>
                {t('Basketball')}
              </Text>
            </Pressable>
            <Pressable
              alignSelf={'center'}
              borderWidth={'1'}
              borderColor={'white'}
              alignItems={'center'}
              justifyContent={'center'}
              p={3}
              w={120}
              h={120}
              bg={select === 'Football' ? 'yellow.400' : 'background.400'}
              onPress={() => setSelect('Football')}>
              <Football
                width={60}
                height={60}
                color={select === 'Football' ? Colors.primary : Colors.white}
              />
              <Text
                fontFamily={'body'}
                mt={2}
                fontWeight={select === 'Football' ? '200' : '100'}
                fontStyle={'normal'}
                fontSize={'md'}
                color={select === 'Football' ? 'primary.400' : 'white'}>
                {t('Football')}
              </Text>
            </Pressable>
          </HStack>
          <Pressable
            alignSelf={'center'}
            borderWidth={'1'}
            borderColor={'white'}
            alignItems={'center'}
            justifyContent={'center'}
            p={3}
            w={120}
            h={120}
            bg={select === 'Tennis' ? 'yellow.400' : 'background.400'}
            onPress={() => setSelect('Tennis')}>
            <Cricket
              width={60}
              height={60}
              color={select === 'Tennis' ? Colors.primary : Colors.white}
            />
            <Text
              fontFamily={'body'}
              mt={2}
              fontWeight={select === 'Tennis' ? '200' : '100'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={select === 'Tennis' ? 'primary.400' : 'white'}>
              {t('Tennis')}
            </Text>
          </Pressable>
        </Box>
      )}
      <Box pt={5} px={5} pb={5} bg={'background.400'}>
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
          onPress={() => navigation.navigate('AvailableDay')}>
          {t('Next')}
        </Button>
      </Box>
    </AppLayout>
  );
};
