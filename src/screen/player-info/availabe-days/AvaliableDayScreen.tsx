import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Pressable, Text, FlatList} from 'native-base';

import {AppLayout} from '../../../component/common/AppLayout';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {RootStackScreenProps} from '../../../navigation/types';
import {Progress} from '../choose-sport/components/Progress';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {Loader} from '../../../component/common/Loader';

type Props = RootStackScreenProps<'AvailableDay'>;

export const AvailableDayScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [select, setSelect] = useState<string>('');
  const arr = [
    `${t('Sunday')}`,
    `${t('Monday')}`,
    `${t('Tuesday')}`,
    `${t('Wednesday')}`,
    `${t('Thursday')}`,
    `${t('Saturday')}`,
  ];
  const [availableDayLoading, setAvailableDayLoading] = useState<boolean>(true);

  const getAvailableDay = () => {
    setAvailableDayLoading(true);

    Axios.get(`${ApiEndpoints.playerInfo.availableDay}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          // setReviewQuestions(response.data.data.step_two);
        }
      })
      .catch((error: any) => {
        //
      })
      .finally(() => {
        setAvailableDayLoading(false);
      });
  };

  useEffect(() => {
    getAvailableDay();
  }, []);

  const renderItem = ({item}: {item: string}) => (
    <Pressable
      onPress={() => setSelect(item)}
      bg={select === item ? 'yellow.400' : 'background.400'}
      borderWidth={0.5}
      alignSelf={'center'}
      w={'70%'}
      mb={5}
      p={2}
      borderColor={select === item ? 'yellow.400' : 'secondary.400'}>
      <Text
        pt={0.5}
        fontFamily={'body'}
        textAlign={'center'}
        fontWeight={select === item ? '200' : '100'}
        fontStyle={'normal'}
        fontSize={'sm'}
        color={select === item ? 'primary.400' : 'white'}>
        {item}
      </Text>
    </Pressable>
  );
  return (
    <AppLayout>
      <ScreenHeader heading={String(t('Player info'))} />
      {availableDayLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <Progress value={2} />

          <Text
            fontFamily={'heading'}
            mt={2}
            mb={4}
            textAlign={'center'}
            fontWeight={'100'}
            fontStyle={'italic'}
            fontSize={'sm'}
            color={'secondary.400'}>
            {t('Which days are you available')}
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={arr}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </Box>
      )}
      <HStack p={5} bg={'background.400'} justifyContent={'space-between'}>
        <Button
          variant={'outline'}
          w={'48%'}
          rounded={0}
          borderColor={'yellow.400'}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'md',
            color: 'white',
          }}
          colorScheme={'yellow'}
          onPress={() => navigation.goBack()}>
          {t('Back')}
        </Button>
        <Button
          variant={'solid'}
          w={'48%'}
          rounded={0}
          _text={{
            fontFamily: 'heading',
            fontWeight: '100',
            fontStyle: 'italic',
            fontSize: 'md',
            color: 'primary.400',
          }}
          colorScheme={'secondary'}
          onPress={() => navigation.navigate('Position')}>
          {t('Next')}
        </Button>
      </HStack>
    </AppLayout>
  );
};
