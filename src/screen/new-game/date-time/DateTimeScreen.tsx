import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  ChevronDownIcon,
  HStack,
  Input,
  Pressable,
  Text,
} from 'native-base';
import {format} from 'date-fns';
import {Calendar} from 'react-native-calendars';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';

import {Colors} from '../../../styles';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {ProgressBar} from '../choose-sport/components/ProgressBar';
import {AppLayout} from '../../../component/common/AppLayout';
import {RootStackScreenProps} from '../../../navigation/types';
import {useError} from '../../../context/ErrorProvider';

type Props = RootStackScreenProps<'DateTime'>;

export const DateTimeScreen: FC<Props> = ({navigation, route}) => {
  const {
    venueId,
    SportId,
    levelId,
    formationId,
    genderId,
    gameType,
    accessType,
    goLiveScoring,
    noOfPlayers,
    title,
    description,
  } = route.params;

  const [selected, setSelected] = useState('');
  const [timeZone1, setTimeZone1] = useState<string>(format(new Date(), 'a'));
  const [timeZone2, setTimeZone2] = useState<string>(format(new Date(), 'a'));

  const [startTime, setStartTime] = useState(new Date());
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [endTime, setEndTime] = useState(new Date());
  const [isFocus1, setIsFocus1] = useState<boolean>(false);

  const {t} = useTranslation();
  const setError = useError();

  useEffect(() => {
    setSelected(format(new Date(), 'yyyy-MM-dd'));
  }, []);
  console.log('timeZone1', timeZone1);
  console.log('timeZone2', timeZone2);
  console.log('startTime', startTime);
  console.log('endTime', endTime);
  const onPressHandler = () => {
    if (
      new Date(selected).toISOString().slice(0, 10) <
      new Date().toISOString().slice(0, 10)
    ) {
      setError(String(t('Please select date valid.')));
    } else if (endTime.getTime() <= startTime.getTime()) {
      setError(String(t('Please Choose Correct Start and End Time')));
    } else {
      navigation.navigate('GamePayment', {
        venueId: venueId,
        SportId: SportId,
        levelId: levelId,
        formationId: formationId,
        genderId: genderId,
        gameType: gameType,
        accessType: accessType,
        goLiveScoring: goLiveScoring,
        noOfPlayers: noOfPlayers,
        title: title,
        description: description,
        startDate: selected,
        startTime: String(format(startTime, 'HH:mm:ss')),
        endTime: String(format(endTime, 'HH:mm:ss')),
      });
    }
  };

  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader heading={String(t('Date & time'))} matchCreating={true} />
        <ProgressBar value={5} />
        <Calendar
          minDate={'2001-01-01'}
          maxDate={'2035-12-31'}
          monthFormat={'MMMM yyyy'}
          style={{
            marginTop: 3,
            borderWidth: 1,
            borderColor: Colors.secondary,
            marginHorizontal: 15,
          }}
          markingType={'custom'}
          markedDates={{
            [selected]: {
              selected: true,
              customStyles: {
                container: {
                  backgroundColor: Colors.yellow,
                  elevation: 2,
                  width: 30,
                  height: 30,
                  borderRadius: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                text: {
                  color: Colors.primary,
                },
              },
            },
          }}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          hideArrows={false}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          theme={{
            backgroundColor: Colors.background,
            calendarBackground: Colors.background,
            dayTextColor: Colors.white,

            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',

            todayTextColor: Colors.black,
            textDisabledColor: '#808080',
            arrowColor: 'white',

            monthTextColor: Colors.secondary,
            indicatorColor: Colors.secondary,
            textDayFontFamily: 'Helvetica',
            textMonthFontFamily: 'Helvetica',
            textDayHeaderFontFamily: 'Helvetica',

            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          px={4}
          mt={10}>
          <Pressable onPress={() => setIsFocus(true)} width={'50%'}>
            <View pointerEvents={'none'} style={{width: '100%'}}>
              <Input
                colorScheme={'primary'}
                size={'xl'}
                variant="outline"
                width={'100%'}
                borderRadius={0}
                editable={false}
                color={'white'}
                alignSelf={'center'}
                borderColor={'secondary.400'}
                invalidOutlineColor={'secondary.400'}
                backgroundColor={'#1B2C46'}
                focusOutlineColor={'secondary.400'}
                value={format(startTime, 'hh:mm')}
                placeholderTextColor={'gray.400'}
                InputRightElement={<ChevronDownIcon color={'white'} mr={4} />}
              />
            </View>
          </Pressable>
          <DatePicker
            modal
            open={isFocus}
            date={startTime}
            mode={'time'}
            onConfirm={date => {
              setIsFocus(false);
              setStartTime(date);
              setTimeZone1(format(date, 'a'));
            }}
            onCancel={() => {
              setIsFocus(false);
            }}
          />
          <HStack
            w={'35%'}
            alignItems={'center'}
            borderColor={'secondary.400'}
            bg={'background.400'}
            justifyContent={'space-around'}
            borderWidth={1}>
            <Text
              p={2}
              lineHeight={26}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'md'}
              color={timeZone1.toString() === 'AM' ? 'black' : 'white'}
              w={'50%'}
              bg={
                timeZone1.toString() === 'AM'
                  ? 'secondary.400'
                  : 'background.400'
              }
              textAlign={'center'}>
              {t('AM')}
            </Text>
            <Text
              w={'50%'}
              p={2}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'md'}
              lineHeight={26}
              bg={
                timeZone1.toString() === 'PM'
                  ? 'secondary.400'
                  : 'background.400'
              }
              color={timeZone1.toString() === 'PM' ? 'black' : 'white'}
              textAlign={'center'}>
              {t('PM')}
            </Text>
          </HStack>
        </HStack>
        <HStack justifyContent={'space-between'} alignItems={'center'} p={4}>
          <Pressable onPress={() => setIsFocus1(true)} width={'50%'}>
            <View pointerEvents={'none'} style={{width: '100%'}}>
              <Input
                colorScheme={'primary'}
                size={'xl'}
                variant="outline"
                width={'100%'}
                borderRadius={0}
                editable={false}
                color={'white'}
                alignSelf={'center'}
                borderColor={'secondary.400'}
                invalidOutlineColor={'secondary.400'}
                backgroundColor={'#1B2C46'}
                focusOutlineColor={'secondary.400'}
                value={format(endTime, 'hh:mm')}
                placeholderTextColor={'gray.400'}
                InputRightElement={<ChevronDownIcon color={'white'} mr={4} />}
              />
            </View>
          </Pressable>
          <DatePicker
            modal
            open={isFocus1}
            date={endTime}
            mode={'time'}
            onConfirm={date => {
              setIsFocus1(false);
              setEndTime(date);
              setTimeZone2(format(date, 'a'));
            }}
            onCancel={() => {
              setIsFocus1(false);
            }}
          />
          <HStack
            w={'35%'}
            alignItems={'center'}
            borderColor={'secondary.400'}
            bg={'background.400'}
            justifyContent={'space-around'}
            borderWidth={1}>
            <Text
              p={2}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'md'}
              w={'50%'}
              lineHeight={26}
              bg={
                timeZone2.toString() === 'AM'
                  ? 'secondary.400'
                  : 'background.400'
              }
              color={timeZone2.toString() === 'AM' ? 'black' : 'white'}
              textAlign={'center'}>
              {t('AM')}
            </Text>
            <Text
              w={'50%'}
              p={2}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={'md'}
              lineHeight={26}
              bg={
                timeZone2.toString() === 'PM'
                  ? 'secondary.400'
                  : 'background.400'
              }
              color={timeZone2.toString() === 'PM' ? 'black' : 'white'}
              textAlign={'center'}>
              {t('PM')}
            </Text>
          </HStack>
        </HStack>
        <HStack
          p={5}
          bg={'background.400'}
          justifyContent={'space-between'}
          position={'absolute'}
          left={0}
          right={0}
          bottom={0}>
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
            onPress={onPressHandler}>
            {t('Next')}
          </Button>
        </HStack>
      </Box>
    </AppLayout>
  );
};
