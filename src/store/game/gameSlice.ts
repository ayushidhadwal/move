import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {
  GameSliceState,
  matchCheckoutPayload,
  matchCreatePayload,
} from './types';
import {PaymentMethodId} from '../../navigation/types';

export const MATCH_CHECKOUT = '/match-checkout';
export const CREATE_MATCH = '/create-match';
export const MATCH_DETAILS = '/get-match-details';

export const matchCheckout = createAsyncThunk(
  MATCH_CHECKOUT,
  async ({noOfPlayers, amount}: matchCheckoutPayload, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.match.checkout, {
      total_no_of_player: noOfPlayers,
      amount: amount,
      payment_method_id: '1',
    });
    if (result.data.status === 'ok') {
      return {
        payableAmount: result.data.data.payment_details.payable_amount.value_en,
        receivableAmount:
          result.data.data.payment_details.amount_receivable.value_en,
        moveCommission:
          result.data.data.payment_details.move_commission.value_en,
        pricePerPlayer:
          result.data.data.payment_details.price_per_person.value_en,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const createMatch = createAsyncThunk(
  MATCH_CHECKOUT,
  async (
    {
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
      amount,
      refundable,
    }: matchCreatePayload,
    {rejectWithValue},
  ) => {
    const result = await Axios.post(ApiEndpoints.match.store, {
      sport_id: SportId,
      level_id: levelId,
      venue_id: venueId,
      formation_id: formationId,
      gender_id: genderId,
      game_type: gameType,
      access_type: accessType,
      go_live_scoring: goLiveScoring,
      non_refundable: refundable ? '1' : '0',
      date: startDate,
      start_time: startTime,
      end_time: endTime,
      amount: amount,
      payment_method_id: PaymentMethodId.KNET,
      title: title,
      description: description,
    });
    if (result.data.status === 'ok') {
      return {
        matchId: result.data.data.match_id,
        paymentUrl: result.data.data.payment_url,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const getMatchDetails = createAsyncThunk(
  MATCH_DETAILS,
  async ({matchId}: {matchId: number}, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.match.matchDetails, {
      params: {
        match_id: matchId,
      },
    });
    if (result.data.status === 'ok') {
      return {
        infoData: result.data.data.info,
        lineupData: result.data.data.lineup,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

const initialState: GameSliceState = {
  payableAmount: null,
  receivableAmount: null,
  moveCommission: null,
  pricePerPlayer: null,
  matchId: null,
  paymentUrl: null,
  infoData: null,
  lineupData: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMatchDetails.fulfilled, (state, action) => {
      state.infoData = action.payload.infoData;
      state.lineupData = action.payload.lineupData;
    });
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
