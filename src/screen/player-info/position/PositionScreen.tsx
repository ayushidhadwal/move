import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Pressable, Text, FlatList} from 'native-base';

import {AppLayout} from '../../../component/common/AppLayout';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {RootStackScreenProps} from '../../../navigation/types';
import {Progress} from '../choose-sport/components/Progress';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';

type Props = RootStackScreenProps<'Position'>;

export const PositionScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [select, setSelect] = useState<string>('');
  const arr = [
    `${t('Defender')}`,
    `${t('Striker')}`,
    `${t('Midfielder')}`,
    `${t('Goalkeeper')}`,
  ];
  const [positionLoading, setPositionLoading] = useState<boolean>(true);

  const getPosition = () => {
    setPositionLoading(true);

    Axios.get(`${ApiEndpoints.playerInfo.position}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          // setReviewQuestions(response.data.data.step_two);
        }
      })
      .catch((error: any) => {
        //
      })
      .finally(() => {
        setPositionLoading(false);
      });
  };

  useEffect(() => {
    getPosition();
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
      <Progress value={3} />
      <Box flex={1}>
        <Text
          fontFamily={'heading'}
          mt={2}
          mb={4}
          textAlign={'center'}
          fontWeight={'100'}
          fontStyle={'italic'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Which position do you play')}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={arr}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </Box>
      <Box p={5} bg={'background.400'}>
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
          onPress={() => navigation.navigate('Settings')}>
          {t('Save')}
        </Button>
      </Box>
    </AppLayout>
  );
};
