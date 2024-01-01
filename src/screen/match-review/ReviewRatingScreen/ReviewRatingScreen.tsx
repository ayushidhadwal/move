import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Pressable, Text} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
import {StyleSheet} from 'react-native';

import {AppLayout} from '../../../component/common/AppLayout';
import {RootStackScreenProps} from '../../../navigation/types';
import {Progress} from '../../player-info/choose-sport/components/Progress';
import {Header} from '../../../component/common/Header';
import {Colors} from '../../../styles';
import {Star} from '../../../component/svg';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {RatingItem1} from '../ReviewQuestionScreen';
import i18n from 'i18next';
import {Loader} from '../../../component/common/Loader';
import {useError} from '../../../context/ErrorProvider';
import {useMessage} from '../../../hooks/useMessage';

type Props = RootStackScreenProps<'ReviewRating'>;

type playerItem = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  avatar_url: string;
};

type levelItem = {
  id: number;
  title_en: string;
  title_ar: string;
  choose_type: number;
};

type SportmanItem = {
  id: number;
  title_en: string;
  title_ar: string;
  choose_type: number;
};

const RatingItem = ({title, value, onPress}: any) => {
  return (
    <HStack
      mx={3}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={3}
      mt={2}
      bg={'background.400'}>
      <Text
        fontFamily={'body'}
        fontWeight={'100'}
        fontStyle={'normal'}
        fontSize={'sm'}
        color={'white'}>
        {title}
      </Text>
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
  );
};

export const ReviewRatingScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<any>(null);
  const [reviewLoading, setReviewLoading] = useState<boolean>(true);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [playersList, setPlayersList] = useState<playerItem[]>([]);
  const [levelList, setLevelList] = useState<levelItem[]>([]);
  const [sportmanList, setSportmanList] = useState<SportmanItem[]>([]);
  const [levelInput, setLevelInput] = useState<any>(null);
  const [sportmanInput, setSportmanInput] = useState<any>(null);
  const [select, setSelect] = useState<any>(null);

  const {matchId, selectedPlayer, stepTwo} = route.params;
  const locale = i18n.language;
  const setError = useError();
  const setMessage = useMessage();

  const getReviewRating = () => {
    setReviewLoading(true);

    Axios.get(`${ApiEndpoints.matchReview.matchReview}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setReviewRating(response.data.data.step_three);
          setPlayersList(response.data.data.step_three.players);
          setLevelList(response.data.data.step_three.level_assessment);
          setSportmanList(response.data.data.step_three.sportmanship);
          // console.log(response.data.data.step_three.level_assessment);
        }
      })
      .catch((e: any) => {
        setError(e?.message);
      })
      .finally(() => {
        setReviewLoading(false);
      });
  };

  useEffect(() => {
    getReviewRating();
  }, []);

  const updateMatchReview = async () => {
    try {
      const response = await Axios.post(
        ApiEndpoints.matchReview.updateMatchReview,
        {
          match_id: matchId,
          step_one: {
            man_of_the_match_id: selectedPlayer,
          },
          step_two: stepTwo,
          step_three: {
            '1': levelInput,
            '2': sportmanInput,
          },
        },
      );

      console.log(response.data);

      if (response.data.status === 'ok') {
        navigation.navigate('Home');
        setMessage(response.data.message);
      }
    } catch (e: any) {
      setError(e?.message);
    }
  };

  useEffect(() => {
    if (levelList) {
      levelList.forEach(level => {
        setLevelInput((prevState: any) => {
          const newLevelState = prevState ? {...prevState} : {};
          if (level?.choose_type === 1) {
            newLevelState[level.id] = '5';
          } else {
            newLevelState[level.id] = '1';
          }

          return newLevelState;
        });
      });
    }
  }, [levelList]);

  useEffect(() => {
    if (sportmanList) {
      sportmanList.forEach(sportman => {
        setSportmanInput((prevState: any) => {
          const newSportmanState = prevState ? {...prevState} : {};
          if (sportman?.choose_type === 1) {
            newSportmanState[sportman.id] = '5';
          } else {
            newSportmanState[sportman.id] = '1';
          }

          return newSportmanState;
        });
      });
    }
  }, [sportmanList]);

  return (
    <AppLayout>
      <Header heading={String(t('Match review'))} />
      {reviewLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <Progress value={3} />
          <Text
            p={3}
            fontFamily={'heading'}
            fontWeight={'100'}
            fontStyle={'italic'}
            fontSize={'sm'}
            color={'secondary.400'}>
            {t('Select player')}
          </Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: Colors.secondary},
              {backgroundColor: Colors.background},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            activeColor={Colors.background}
            containerStyle={{
              backgroundColor: Colors.background,
              borderColor: Colors.secondary,
              paddingHorizontal: 10,
            }}
            itemTextStyle={{color: 'white'}}
            itemContainerStyle={{
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.secondary,
            }}
            data={playersList.map(f => ({
              label: f.username,
              value: f.username,
            }))}
            search={false}
            dropdownPosition={'bottom'}
            labelField="label"
            valueField="value"
            placeholder={String(t('Select Player'))}
            searchPlaceholder="Search..."
            value={dropdownValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDropdownValue(item.value);
              setIsFocus(false);
            }}
          />
          <Text
            px={3}
            pt={5}
            fontFamily={'heading'}
            fontWeight={'100'}
            fontStyle={'italic'}
            fontSize={'sm'}
            color={'secondary.400'}>
            {t('Level assessment')}
          </Text>

          {levelList.map((level): any => {
            return (
              <RatingItem
                title={locale === 'en' ? level.title_en : level.title_ar}
                value={+levelInput?.[level.id]}
                onPress={(val: any) => {
                  setLevelInput({...levelInput, [level.id]: val});
                }}
              />
            );
          })}

          <Text
            px={3}
            pt={5}
            fontFamily={'heading'}
            fontWeight={'100'}
            fontStyle={'italic'}
            fontSize={'sm'}
            color={'secondary.400'}>
            {t('Sportmanship')}
          </Text>
          {sportmanList.map(sportman => (
            <RatingItem
              title={locale === 'en' ? sportman.title_en : sportman.title_ar}
              value={+sportmanInput?.[sportman.id]}
              onPress={(val: any) => {
                setSportmanInput({...sportmanInput, [sportman.id]: val});
              }}
            />
          ))}

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
              onPress={updateMatchReview}>
              {t('Submit')}
            </Button>
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.secondary,
    borderWidth: 0.5,
    borderRadius: 0,
    paddingHorizontal: 8,
    marginHorizontal: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.white,
  },
});
