import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useError} from '../../context/ErrorProvider';
import {RootState, useAppDispatch} from '../../store';
import {getBookingDetails} from '../../store/booking/bookingSlice';
import {useSelector} from 'react-redux';

type PaymentDetailsDTO = {
  key: string;
  title_en: string;
  title_ar: string;
  value_en: string;
  value_ar: string;
};

type dataDTO = {
  title_en: string;
  title_ar: string;
  value_en: string;
  value_ar: string;
};

export type PaymentStructureDTO = {
  game_value: dataDTO;
  number_of_player: dataDTO;
  price_per_player: dataDTO;
  move_commission: dataDTO;
  amount_receivable: dataDTO;
  amount_paid: dataDTO;
  refrence_id: dataDTO;
};

type OtherDetailDTO = {
  key: boolean;
  title_ar: string;
  title_en: string;
};

type OtherDetails = {
  cancel_button: OtherDetailDTO;
  live_scoring: OtherDetailDTO;
};

type venueDTO = {
  title_en: string;
  title_ar: string;
  value_en: string;
  value_ar: string;
  location: string;
};

type DateTimeDTO = {
  title_en: string;
  start_time: string;
  end_time: string;
  title_ar: string;
  value_en: string;
  value_ar: string;
};

type gameDetailDTO = {
  venue: venueDTO;
  date_time: DateTimeDTO;
  team: dataDTO;
};

export const useGetMatchBookingDetails = (matchBookingId: number) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const setError = useError();

  const [loading, setLoading] = useState<boolean>(false);
  const [gameDetails, setGameDetails] = useState<gameDetailDTO | null>(null);
  const [matchId, setMatchId] = useState<number | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsDTO[]>([]);
  const [otherDetails, setOtherDetails] = useState<OtherDetails | null>(null);
  const [paymentStructure, setPaymentStructure] =
    useState<PaymentStructureDTO | null>(null);
  const [hostId, setHostId] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [liveScoring, setLiveScoring] = useState<boolean>(false);

  const getMatchBookingDetails = async () => {
    try {
      setLoading(true);
      console.log({matchBookingId});
      const result = await dispatch(getBookingDetails(matchBookingId)).unwrap();
      if (result) {
        setHostId(result.hostId);
        setMatchId(result.matchId);
        setGameDetails(result.gameDetails);
        setPaymentDetails(result.paymentDetails);
        setOtherDetails(result.otherDetails);
        setPaymentStructure(result.paymentStructure);
        setEndTime(result.endTime);
        setCurrentTime(result.currentTime);
        setStartTime(result.startTime);
        setLoading(false);
        setLiveScoring(result.liveScoring);
      }
    } catch (e: any) {
      console.log(e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getMatchBookingDetails();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    hostId,
    matchId,
    gameDetails,
    paymentDetails,
    otherDetails,
    paymentStructure,
    currentTime,
    endTime,
    startTime,
    loading,
    liveScoring,
  };
};
