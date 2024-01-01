import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  Divider,
  FormControl,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {I18nManager, Platform, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from 'i18next';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

import {Colors} from '../../../styles';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {ProgressBar} from '../choose-sport/components/ProgressBar';
import {AppLayout} from '../../../component/common/AppLayout';
import {RootStackScreenProps} from '../../../navigation/types';
import {useGetMatchCreate} from '../../../hooks/match/useGetMatchCreate';
import {Loader} from '../../../component/common/Loader';
import {useGetFormation} from '../../../hooks/match/useGetFormation';

type Props = RootStackScreenProps<'GameDetails'>;

export const GameDetailsScreen: FC<Props> = ({navigation, route}) => {
  const {venueId, SportId, levelId} = route.params;

  const {formationList, isLoading: load} = useGetFormation({
    SportId,
  });
  const {accessList, gameList, scoringList, genderList, dataLoading} =
    useGetMatchCreate();

  const [formation, setFormation] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [goLiveScoring, setGoLiveScoring] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [accessValue, setAccessValue] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [noOfPlayers, setNoOfPlayers] = useState<string>('');

  const locale = i18n.language;

  const {t} = useTranslation();

  const isDisabled =
    formation === '' ||
    gender === '' ||
    type === '' ||
    title === '' ||
    description === '';

  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader
          heading={String(t('Game details'))}
          matchCreating={true}
        />
        <ProgressBar value={4} />
        {dataLoading ? (
          <Loader />
        ) : (
          <>
            <ScrollView flex={1} px={3}>
              <FormControl pt={6}>
                <FormControl.Label
                  _text={{
                    fontFamily: 'heading',
                    fontWeight: '100',
                    fontStyle: 'italic',
                    fontSize: 'sm',
                    color: 'secondary.400',
                  }}>
                  {t('Game Title')}
                </FormControl.Label>
                <Input
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  variant="underlined"
                  color={'white'}
                  focusOutlineColor={'secondary.400'}
                  colorScheme={'secondary'}
                  fontFamily="body"
                  fontStyle={'italic'}
                  fontSize={15}
                  value={title}
                  borderColor={'secondary.400'}
                  onChangeText={setTitle}
                  placeholder={String(t('Enter Title'))}
                  _input={{
                    selectionColor: '#ffffff',
                    cursorColor: '#ffffff',
                  }}
                  cursorColor={'#ffffff'}
                  selectionColor={'#ffffff'}
                />
              </FormControl>
              <Divider bg={'secondary.700'} />

              <FormControl pt={6}>
                <FormControl.Label
                  _text={{
                    fontFamily: 'heading',
                    fontWeight: '100',
                    fontStyle: 'italic',
                    fontSize: 'sm',
                    color: 'secondary.400',
                  }}>
                  {t('Description')}
                </FormControl.Label>
                <Input
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  variant="underlined"
                  color={'white'}
                  multiline={true}
                  numberOfLines={3}
                  focusOutlineColor={'secondary.400'}
                  colorScheme={'secondary'}
                  fontFamily="body"
                  fontStyle={'italic'}
                  fontSize={15}
                  value={description}
                  borderColor={'secondary.400'}
                  onChangeText={text => setDescription(text)}
                  placeholder={String(t('Enter Description'))}
                  _input={{
                    selectionColor: '#ffffff',
                    cursorColor: '#ffffff',
                  }}
                  cursorColor={'#ffffff'}
                  selectionColor={'#ffffff'}
                />
              </FormControl>

              <Text
                pt={6}
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                fontSize={'sm'}
                color={'secondary.400'}>
                {t('Formation')}
              </Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: Colors.secondary},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                activeColor={Colors.secondary}
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
                data={formationList.map(f => ({
                  label: locale === 'en' ? f.title_en : f.title_ar,
                  value: String(f.id),
                  noOfPlayers: f.no_of_players,
                }))}
                search={false}
                disable={load}
                dropdownPosition={'bottom'}
                labelField="label"
                valueField="value"
                placeholder={String(t('Select Formation'))}
                searchPlaceholder={String(t('Search'))}
                value={formation}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFormation(item.value);
                  setNoOfPlayers(String(item.noOfPlayers));
                  setIsFocus(false);
                }}
              />
              <Text
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                fontSize={'sm'}
                color={'secondary.400'}>
                {t('Gender')}
              </Text>
              <HStack py={4} justifyContent={'space-between'}>
                {genderList.map(m => (
                  <Pressable
                    flexDirection={'row'}
                    alignItems={'center'}
                    onPress={() => setGender(String(m.id))}>
                    {gender === String(m.id) ? (
                      <SvgUri height={25} uri={m.active_icon_url} />
                    ) : (
                      <SvgUri height={25} uri={m.icon_url} />
                    )}
                    <Text
                      ml={1}
                      px={gender === 'men' ? 2 : 0}
                      textAlign={'center'}
                      fontFamily="body"
                      fontStyle="normal"
                      fontSize={'sm'}
                      pt={Platform.OS === 'ios' ? 0 : 1}
                      fontWeight={gender === String(m.id) ? '200' : '100'}
                      bg={
                        gender === String(m.id) ? 'yellow.400' : 'primary.400'
                      }
                      borderWidth={gender === String(m.id) ? 1 : 0}
                      borderColor={
                        gender === String(m.id) ? 'yellow.400' : 'primary.400'
                      }
                      color={gender === String(m.id) ? 'primary.400' : 'white'}>
                      {m.name}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
              <Text
                fontFamily={'heading'}
                fontWeight={'100'}
                fontStyle={'italic'}
                fontSize={'sm'}
                color={'secondary.400'}>
                {t('Game Type')}
              </Text>
              <HStack py={4}>
                <HStack alignItems={'center'}>
                  {gameList.map(m => (
                    <Pressable onPress={() => setType(String(m.id))}>
                      <HStack alignItems={'center'} mr={5}>
                        {type === String(m.id) ? (
                          <Box
                            borderWidth={1}
                            borderColor={'yellow.400'}
                            size="5"
                            bg={'rgba(255,213,61,0.23)'}
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <CheckIcon size="4" color="white" />
                          </Box>
                        ) : (
                          <Ionicons
                            name="square-outline"
                            size={24}
                            color="white"
                          />
                        )}
                        <Text
                          fontFamily="body"
                          fontStyle="normal"
                          px={1}
                          borderRadius={0}
                          fontWeight={type === String(m.id) ? '200' : '100'}
                          color={
                            type === String(m.id) ? 'yellow.400' : 'white'
                          }>
                          {locale === 'en' ? m.title_en : m.title_ar}
                        </Text>
                      </HStack>
                    </Pressable>
                  ))}
                </HStack>
              </HStack>
              {type === String(1) && (
                <>
                  <Text
                    fontFamily={'heading'}
                    fontWeight={'100'}
                    fontStyle={'italic'}
                    fontSize={'sm'}
                    color={'secondary.400'}>
                    {t('Access Type')}
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      focus && {borderColor: Colors.secondary},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    activeColor={Colors.secondary}
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
                    data={accessList.map(f => ({
                      label: locale === 'en' ? f.title_en : f.title_ar,
                      value: String(f.id),
                    }))}
                    search={false}
                    dropdownPosition={'bottom'}
                    labelField="label"
                    valueField="value"
                    placeholder={String(t('Select Type'))}
                    searchPlaceholder={String(t('Search'))}
                    value={accessValue}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={item => {
                      setAccessValue(item.value);
                      setFocus(false);
                    }}
                  />
                </>
              )}
              {/*  Live scoring */}
              <HStack alignItems={'center'} mb={5}>
                {scoringList.map(item => (
                  <Pressable onPress={() => setGoLiveScoring(!goLiveScoring)}>
                    <HStack alignItems={'center'}>
                      {goLiveScoring ? (
                        <Box
                          borderWidth={1}
                          borderColor={'yellow.400'}
                          size="5"
                          bg={'rgba(255,213,61,0.23)'}
                          alignItems={'center'}
                          justifyContent={'center'}>
                          <CheckIcon size="4" color="white" />
                        </Box>
                      ) : (
                        <Ionicons
                          name="square-outline"
                          size={24}
                          color="white"
                        />
                      )}
                      <Text
                        fontFamily={'heading'}
                        fontWeight={'100'}
                        fontStyle={'italic'}
                        fontSize={'sm'}
                        color={'secondary.400'}
                        px={1}>
                        {locale === 'en' ? item.name_en : item.name_ar}
                      </Text>
                    </HStack>
                  </Pressable>
                ))}
              </HStack>
            </ScrollView>
            <HStack
              p={5}
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
                isDisabled={isDisabled}
                onPress={() =>
                  navigation.navigate('DateTime', {
                    venueId: venueId,
                    SportId: SportId,
                    levelId: levelId,
                    formationId: formation,
                    genderId: gender,
                    gameType: type,
                    accessType: accessValue,
                    goLiveScoring: goLiveScoring ? '1' : '0',
                    noOfPlayers: noOfPlayers,
                    title: title,
                    description: description,
                  })
                }>
                {t('Next')}
              </Button>
            </HStack>
          </>
        )}
      </Box>
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
    marginVertical: 20,
    width: '98%',
    alignSelf: 'center',
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
