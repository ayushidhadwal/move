import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {
  joiningMatchSliceState,
  joinMatchCheckoutSliceState,
  matchSliceState,
} from './types';
import {AuthSliceState} from '../auth/types';
import {store} from '../index';
import i18n from 'i18next';
import {useMessage} from '../../hooks/useMessage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export const SLOT_AVAILABILITY = '/check-slot-availability';
export const JOIN_MATCH_CHECKOUT = '/joining-checkout';
export const MATCH_JOINING = '/match-joining';
export const MATCH_JOINING_DETAILS = '/match-joining-details';

export const checkSlotAvailability = createAsyncThunk(
  SLOT_AVAILABILITY,
  async ({matchId}: {matchId: number}, {rejectWithValue}) => {
    const {userId}: AuthSliceState = store.getState().auth;
    const result = await Axios.get(ApiEndpoints.match.slotAvailability, {
      params: {
        match_id: matchId,
        user_id: userId,
      },
    });
    if (result.data.status === 'ok') {
      return {
        totalSlots: result.data.data.slots.total_slots,
        availableSlot: result.data.data.slots.available_slot,
        loggedInUserJoin: result.data.data.slots.logged_in_user_join,
      };
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);
const locale = i18n.language;

export const joinMatchCheckout = createAsyncThunk(
  JOIN_MATCH_CHECKOUT,
  async (
    {
      paymentMethod,
      coupon,
      matchId,
      selectedPlayerList,
    }: joinMatchCheckoutSliceState,
    {rejectWithValue},
  ) => {
    console.log('matchId', matchId);
    const result = await Axios.post(ApiEndpoints.match.joinMatchCheckout, {
      match_id: matchId,
      player_id: selectedPlayerList,
      coupan_code: coupon,
      payment_method_id: paymentMethod,
    });
    if (result.data.status === 'ok') {
      console.log(result?.data?.data?.payment_details);

      const item = result?.data?.data?.payment_details.find(
        (item: any) => item.title === 'Payable amount',
      );

      let payableAmt = 0;

      if (item) {
        payableAmt = +item.value;
      }

      return {
        paymentDetails: result?.data?.data?.payment_details,
        payableAmount: payableAmt,

        // totalAmount: result?.data?.data?.payment_details?.total_amount,
        // paidFromWallet: result?.data?.data?.payment_details?.paid_from_wallet,
        // coupon: result?.data?.data?.payment_details?.coupon,
        // payableAmount: result?.data?.data?.payment_details?.payable_amount,
      };
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

export const matchJoining = createAsyncThunk(
  MATCH_JOINING,
  async (
    {paymentMethod, matchId, selectedPlayerList}: joiningMatchSliceState,
    {rejectWithValue},
  ) => {
    console.log('getting matchId', matchId);
    const {userId}: AuthSliceState = store.getState().auth;
    console.log('getting userId', userId);

    const result = await Axios.post(ApiEndpoints.match.joinMatch, {
      match_id: matchId,
      player_id: selectedPlayerList,
      join_by: userId,
      payment_method_id: paymentMethod,
    });

    if (result.data.status === 'ok') {
      return {
        matchBookingPaymentId: result.data.data.match_booking_payment_id,
        paymentUrl: result.data.data.payment_url,
        message: result.data.message,
      };
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

export const NotifyForSlot = createAsyncThunk(
  MATCH_JOINING,
  async ({matchId}: {matchId: number}, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.match.notifyMatch, {
      match_id: matchId,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

export const getMatchJoiningDetails = createAsyncThunk(
  MATCH_JOINING_DETAILS,
  async ({paymentId}: {paymentId: number}, {rejectWithValue}) => {
    console.log(
      'ApiEndpoints.match.notifyMatch + paymentId',
      ApiEndpoints.match.notifyMatch + paymentId,
    );
    const result = await Axios.post(ApiEndpoints.match.notifyMatch + paymentId);
    if (result.data.status === 'ok') {
      return {
        bookingDetails: result.data.data.booking_details,
        paymentDetails: result.data.data.payment_details,
      };
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

const initialState: matchSliceState = {
  totalSlots: null,
  availableSlot: null,
  loggedInUserJoin: false,

  totalAmount: 0,
  paidFromWallet: 0,
  coupon: 0,
  payableAmount: 0,

  matchBookingPaymentId: 0,
  paymentUrl: null,
  bookingDetails: [],
  paymentDetails: [],
};

export const matchJoinSlice = createSlice({
  name: 'matchJoin',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkSlotAvailability.fulfilled, (state, action) => {
      state.totalSlots = action.payload.totalSlots;
      state.availableSlot = action.payload.availableSlot;
      state.loggedInUserJoin = action.payload.loggedInUserJoin;
    });

    builder.addCase(joinMatchCheckout.fulfilled, (state, action) => {
      state.totalAmount = action.payload.totalAmount;
      state.paidFromWallet = action.payload.paidFromWallet;
      state.coupon = action.payload.coupon;
      state.payableAmount = action.payload.payableAmount;
    });
    builder.addCase(matchJoining.fulfilled, (state, action) => {
      state.matchBookingPaymentId = action.payload.matchBookingPaymentId;
      state.paymentUrl = action.payload.paymentUrl;
    });

    builder.addCase(getMatchJoiningDetails.fulfilled, (state, action) => {
      state.bookingDetails = action.payload.bookingDetails;
      state.paymentDetails = action.payload.paymentDetails;
    });
  },
});

export const {} = matchJoinSlice.actions;

export default matchJoinSlice.reducer;
