import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {BookingSliceState} from './types';

export const GET_BOOKING_LIST = '/api/get-bookingList';

export const getBookingList = createAsyncThunk(
  GET_BOOKING_LIST,
  async (_, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.booking.getBookingList);
    if (result.data.status === 'ok') {
      return {
        attendingList: result.data.data.attending,
        playedList: result.data.data.played,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);
export const getBookingDetails = createAsyncThunk(
  GET_BOOKING_LIST,
  async (matchBookingId: number, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.booking.getBookingDetails, {
      params: {
        match_booking_id: matchBookingId,
      },
    });
    if (result.data.status === 'ok') {
      // console.log(result.data.data.current_time);
      // console.log(result.data.data.end_time);

      return {
        hostId: result.data.data.host_id,
        matchId: result.data.data.match_id,
        gameDetails: result.data.data.game_detail,
        paymentDetails: result.data.data.payment_details,
        otherDetails: result.data.data.other_details,
        paymentStructure: result.data.data.payment_structure,
        currentTime: result.data.data.current_time,
        endTime: result.data.data.end_time,
        startTime: result.data.data.start_time,
        liveScoring: result.data.data.other_details.live_scoring.key,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

const initialState: BookingSliceState = {
  attendingList: [],
  playedList: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBookingList.fulfilled, (state, action) => {
      state.attendingList = action.payload.attendingList;
      state.playedList = action.payload.playedList;
    });
  },
});

export const {} = bookingSlice.actions;

export default bookingSlice.reducer;
