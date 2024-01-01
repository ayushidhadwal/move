import {load, save} from '../../utils/storage';
import Config from '../../config';
import {LocationSliceState} from './types';

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const LOCATION_RESTORE = '/api/location/restore';

export const locationSession = async (payload: {
  lat: string | null;
  long: string | null;
}) => {
  await save(Config.USER_LOCATION, payload);
};

export const restoreLocation = createAsyncThunk(LOCATION_RESTORE, async () => {
  const result = await load(Config.USER_LOCATION);
  if (result) {
    return result;
  }
});

const initialState: LocationSliceState = {
  locationLoading: false,
  lat: null,
  long: null,
};

export const authSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    // restore location
    builder.addCase(restoreLocation.pending, state => {
      state.locationLoading = true;
    });
    builder.addCase(restoreLocation.fulfilled, (state, action) => {
      state.locationLoading = false;
      if (action.payload?.lat || action.payload?.long) {
        state.lat = action.payload.lat;
        state.long = action.payload.long;
      }
    });
    builder.addCase(restoreLocation.rejected, state => {
      state.locationLoading = false;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
