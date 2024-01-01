import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator, Linking, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {ProgressBar} from '../choose-sport/components/ProgressBar';
import {AppLayout} from '../../../component/common/AppLayout';
import {useAppDispatch} from '../../../store';
import {useError} from '../../../context/ErrorProvider';
import {createMatch, matchCheckout} from '../../../store/game/gameSlice';
import {Colors} from '../../../styles';

type Props = RootStackScreenProps<'GamePayment'>;

export const GamePaymentScreen: FC<Props> = ({navigation, route}) => {
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
    startDate,
    startTime,
    endTime,
  } = route.params;

  const [refundable, setRefundable] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>('');

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setError = useError();

  const [isError, setIsError] = useState<null | string>(null);
  const [payableAmount, setPayableAmount] = useState<null | string>(null);
  const [receivableAmount, setReceivableAmount] = useState<null | string>(null);
  const [moveCommission, setMoveCommission] = useState<null | string>(null);
  const [pricePerPlayer, setPricePerPlayer] = useState<null | string>(null);
  const [matchId, setMatchId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await dispatch(
          matchCheckout({noOfPlayers, amount}),
        ).unwrap();
        if (result) {
          setPayableAmount(result.payableAmount);
          setReceivableAmount(result.receivableAmount);
          setMoveCommission(result.moveCommission);
          setPricePerPlayer(result.pricePerPlayer);
        }
        setLoading(false);
      } catch (e: any) {
        console.log(e.message);
        setLoading(false);
        setError(e);
      }
    })();
  }, [amount]);

  const onClickHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      // console.log({startDate, startTime, endTime});

      const result = await dispatch(
        createMatch({
          venueId,
          SportId,
          levelId,
          formationId,
          genderId,
          gameType,
          accessType,
          goLiveScoring,
          title,
          description,
          startDate,
          startTime,
          endTime,
          amount: amount as string,
          refundable,
        }),
      ).unwrap();
      if (result) {
        setMatchId(result.matchId);
        console.log(result.paymentUrl);
        navigation.navigate('MatchPayment', {url: result.paymentUrl});
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      console.log(e.message);
      setError(e);
    }
  }, [moveCommission, amount]);

  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader heading={String(t('Payment'))} matchCreating={true} />
        <ProgressBar value={6} />
        <ScrollView flex={1}>
          <Box px={5}>
            <Text
              mt={2}
              textAlign={'left'}
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={Platform.OS === 'ios' ? 20 : 18}
              color={'white'}>
              {t('You will receive Amount per player in your payout.')}
            </Text>
            <FormControl isInvalid={!!isError}>
              <Input
                _input={{
                  selectionColor: '#ffffff',
                  cursorColor: '#ffffff',
                }}
                cursorColor={'#ffffff'}
                selectionColor={'#ffffff'}
                colorScheme={'primary'}
                size={'md'}
                variant="outline"
                mt={7}
                p={1}
                mb={isError ? 0 : 3}
                color={'white'}
                alignSelf={'center'}
                value={amount}
                onChangeText={text => setAmount(text)}
                fontFamily={'body'}
                fontWeight={'200'}
                fontStyle={'normal'}
                fontSize={'2xl'}
                textAlign={'center'}
                borderColor={'yellow.400'}
                _focus={{
                  backgroundColor: 'background.400',
                }}
                invalidOutlineColor={'secondary.400'}
                width={'45%'}
                bg={'background.400'}
                focusOutlineColor={'yellow.400'}
                keyboardType={'number-pad'}
              />
              <FormControl.ErrorMessage
                alignSelf={'center'}
                mb={3}
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {isError}
              </FormControl.ErrorMessage>
            </FormControl>
            <Box bg={'background.400'} p={3}>
              <HStack justifyContent={'space-between'} mb={3}>
                <Text
                  color={'secondary.400'}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {t('Game amount')}
                </Text>
                <Text
                  color={'yellow.400'}
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {amount} KD
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'} mb={3}>
                <Text
                  color={'secondary.400'}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {t('Number of player')}
                </Text>
                <Text
                  color={'white'}
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {noOfPlayers} {t('Players')}
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'} mb={3}>
                <Text
                  color={'secondary.400'}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {t('Price per player')}
                </Text>
                {loading ? (
                  <ActivityIndicator size={'small'} color={Colors.yellow} />
                ) : (
                  <Text
                    color={'white'}
                    fontFamily={'body'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    fontSize={'sm'}>
                    {pricePerPlayer} KD
                  </Text>
                )}
              </HStack>
              <HStack justifyContent={'space-between'} mb={3}>
                <Text
                  color={'secondary.400'}
                  fontFamily={'body'}
                  fontWeight={'100'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {t('Move’s commission')}
                  <Text fontSize={10}> {t('per player')}</Text>
                </Text>
                <Text
                  color={'white'}
                  fontFamily={'body'}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                  fontSize={'sm'}>
                  {moveCommission} KD
                </Text>
              </HStack>
              <Text
                mt={5}
                fontFamily={'body'}
                fontWeight={'200'}
                fontStyle={'normal'}
                fontSize={'lg'}
                px={2}
                pt={3}
                pb={2}
                textAlign={'center'}
                borderWidth={1}
                borderColor={'yellow.400'}
                bg={'background.400'}
                color={'white'}>
                {t('Amount receivable')}{' '}
                {receivableAmount ? Number(receivableAmount).toFixed(3) : 0} KWD
              </Text>
              <Text
                mt={4}
                mb={2}
                fontFamily={'body'}
                fontWeight={'200'}
                fontStyle={'normal'}
                fontSize={'lg'}
                p={2}
                textAlign={'center'}
                bg={'secondary.400'}
                color={'primary.400'}>
                {t('Amount payable')} {payableAmount} KWD
              </Text>
            </Box>
            <Text
              textAlign={'left'}
              my={8}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              fontSize={Platform.OS === 'ios' ? 13 : 'xs'}
              color={'yellow.400'}>
              {t('Disclaimer')}:{' '}
              <Text
                fontFamily={'body'}
                fontWeight={'100'}
                fontStyle={'normal'}
                color={'yellow.400'}>
                {t('Host has to pay the share of Move’s commission')}
              </Text>
            </Text>
          </Box>
        </ScrollView>
        <Box mt={3} px={5}>
          <HStack mb={1} alignItems={'center'} ml={-3}>
            {refundable ? (
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
              <Pressable onPress={() => setRefundable(!refundable)}>
                <Ionicons name="square-outline" size={24} color="white" />
              </Pressable>
            )}
            <Text
              ml={2}
              fontFamily={'body'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={Platform.OS === 'ios' ? 'sm' : 13}
              color={'yellow.400'}>
              {t('This is a non-refundable transaction')}
            </Text>
          </HStack>
        </Box>
        <HStack
          px={8}
          py={5}
          bg={'background.400'}
          borderTopColor={'yellow.400'}
          borderTopWidth={0.5}
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
            isDisabled={amount === '' || isLoading}
            rounded={0}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}
            onPress={onClickHandler}
            spinnerPlacement={'end'}
            isLoading={isLoading}
            isLoadingText={String(t('Pay'))}>
            {t('Pay')}
          </Button>
        </HStack>
      </Box>
    </AppLayout>
  );
};
