import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {RequestVenueFormValues} from '../../types';

export const createVenue = createAsyncThunk(
  '/api/venue/create',
  async (
    {venueName, location, otherDetails}: RequestVenueFormValues,
    {rejectWithValue},
  ) => {
    const result = await Axios.post(ApiEndpoints.venue.createVenue, {
      name: venueName,
      location: location,
      other_details: otherDetails,
    });
    if (result.data.status !== 'ok') {
      return rejectWithValue(result.data.message);
    }
  },
);

export const venueSlice = createSlice({
  name: 'venue',
  initialState: null,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = venueSlice.actions;

export default venueSlice.reducer;
