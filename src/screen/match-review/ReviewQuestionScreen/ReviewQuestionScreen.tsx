import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Pressable, ScrollView, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';

import {AppLayout} from '../../../component/common/AppLayout';
import {RootStackScreenProps} from '../../../navigation/types';
import {Progress} from '../../player-info/choose-sport/components/Progress';
import {Header} from '../../../component/common/Header';
import {Star} from '../../../component/svg';
import {Colors} from '../../../styles';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {t} from 'i18next';
import {Loader} from '../../../component/common/Loader';
import {useError} from '../../../context/ErrorProvider';

type Props = RootStackScreenProps<'ReviewQuestion'>;

const RatingItem1 = ({title, venue, value, onPress}: any) => {
  return (
    <Box>
      <Text
        mt={5}
        mx={3}
        fontFamily={'heading'}
        fontWeight={'100'}
        fontStyle={'italic'}
        fontSize={12}
        color={'secondary.400'}>
        {title}
      </Text>
      <HStack
        mx={3}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={3}
        mt={1}
        bg={'background.400'}>
        {venue ? (
          <Text
            fontFamily={'body'}
            fontWeight={'100'}
            fontStyle={'normal'}
            fontSize={12}
            color={'white'}>
            {venue}
          </Text>
        ) : null}
        <HStack>
          <Pressable onPress={() => onPress(1)}>
            <Star
              width={15}
              height={15}
              color={value >= 1 ? Colors.yellow : Colors.white}
            />
          </Pressable>
          <Pressable onPress={() => onPress(2)}>
            <Star
              width={15}
              height={15}
              color={value >= 2 ? Colors.yellow : Colors.white}
            />
          </Pressable>
          <Pressable onPress={() => onPress(3)}>
            <Star
              width={15}
              height={15}
              color={value >= 3 ? Colors.yellow : Colors.white}
            />
          </Pressable>
          <Pressable onPress={() => onPress(4)}>
            <Star
              width={15}
              height={15}
              color={value >= 4 ? Colors.yellow : Colors.white}
            />
          </Pressable>
          <Pressable onPress={() => onPress(5)}>
            <Star
              width={15}
              height={15}
              color={value >= 5 ? Colors.yellow : Colors.white}
            />
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
};

const RatingItem2 = ({title, checked, onPress}: any) => {
  return (
    <Box>
      <Text
        mt={5}
        mx={3}
        fontFamily={'heading'}
        fontWeight={'100'}
        fontStyle={'italic'}
        fontSize={12}
        color={'secondary.400'}>
        {title}
      </Text>
      <HStack alignItems={'center'} p={3} mx={3} mt={1} bg={'background.400'}>
        <HStack alignItems={'center'}>
          {checked === '1' ? (
            <AntDesign
              name="checkcircle"
              size={20}
              color={Colors.yellow}
              onPress={() => onPress('1')}
            />
          ) : (
            <FontAwesome
              name="circle"
              size={22}
              color="white"
              onPress={() => onPress('1')}
            />
          )}
          <Text
            onPress={() => onPress('1')}
            ml={2}
            fontFamily={'body'}
            fontWeight={'100'}
            fontStyle={'normal'}
            fontSize={13}
            color={'white'}>
            {t('Yes')}
          </Text>
        </HStack>
        <HStack alignItems={'center'} ml={8}>
          {checked === '0' ? (
            <AntDesign
              name="checkcircle"
              size={20}
              color={Colors.yellow}
              onPress={() => onPress('0')}
            />
          ) : (
            <FontAwesome
              name="circle"
              size={22}
              color="white"
              onPress={() => onPress('0')}
            />
          )}
          <Text
            onPress={() => onPress('0')}
            ml={2}
            fontFamily={'body'}
            fontWeight={'100'}
            fontStyle={'normal'}
            fontSize={13}
            color={'white'}>
            {t('No')}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export const ReviewQuestionScreen: FC<Props> = ({navigation, route}) => {
  const [reviewQuestions, setReviewQuestions] = useState<any[]>([]);
  const [playerLoading, setPlayerLoading] = useState<boolean>(true);
  const [input, setInput] = useState<any>(null);
  const setError = useError();

  const {matchId, selectedPlayer} = route.params;
  console.log('input', input);

  const getPlayer = () => {
    setPlayerLoading(true);

    Axios.get(`${ApiEndpoints.matchReview.matchReview}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setReviewQuestions(response?.data?.data?.step_two);
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

  useEffect(() => {
    if (reviewQuestions) {
      reviewQuestions.forEach(reviewQuestion => {
        setInput((prevState: any) => {
          const newState = prevState ? {...prevState} : {};
          if (reviewQuestion?.is_vanue_rating === 1) {
            newState[reviewQuestion.id] = '5';
          } else {
            newState[reviewQuestion.id] = '1';
          }

          return newState;
        });
      });
    }
  }, [reviewQuestions]);

  return (
    <AppLayout>
      <Header heading={String(t('Match review'))} />
      {playerLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <Progress value={2} />

          <ScrollView>
            {reviewQuestions.map((reviewQuestion): any => {
              return reviewQuestion?.type === 1 ? (
                <RatingItem1
                  title={reviewQuestion.title_en}
                  value={+input?.[reviewQuestion.id]}
                  onPress={(val: any) => {
                    setInput({...input, [reviewQuestion.id]: val});
                  }}
                />
              ) : (
                <RatingItem2
                  title={reviewQuestion.title_en}
                  checked={input?.[reviewQuestion.id]}
                  onPress={(val: any) => {
                    setInput({...input, [reviewQuestion.id]: val});
                  }}
                />
              );
            })}
          </ScrollView>

          <HStack
            p={5}
            w={'100%'}
            position={'absolute'}
            bottom={0}
            bg={'background.400'}
            justifyContent={'space-between'}>
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
              onPress={() =>
                navigation.navigate('ReviewRating', {
                  matchId: matchId,
                  stepTwo: input,
                  selectedPlayer,
                })
              }>
              {t('Next')}
            </Button>
          </HStack>
        </Box>
      )}
    </AppLayout>
  );
};
