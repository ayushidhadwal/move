import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';

export const GET_LIVE_SCORE = '/api/get-live-score';

export const getBookingList = createAsyncThunk(
  GET_LIVE_SCORE,
  async (matchId: number, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.booking.getLiveScore, {
      params: {
        match_id: matchId,
      },
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const liveScoreSlice = createSlice({
  name: 'liveScore',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = liveScoreSlice.actions;

export default liveScoreSlice.reducer;
