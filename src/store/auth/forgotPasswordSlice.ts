import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  ForgotPasswordPayload,
  ForgotPasswordSliceState,
  updatePasswordPayload,
} from './types';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {store} from '../index';

export const FORGOT_PASSWORD = '/auth/forgot-password';
export const UPDATE_PASSWORD = 'auth/update-password';

export const forgotPassword = createAsyncThunk(
  FORGOT_PASSWORD,
  async (
    {phone}: ForgotPasswordPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    const result = await Axios.post(
      ApiEndpoints.forgotPassword.forgotPassword,
      {
        number: phone,
      },
    );

    if (result.data.status === 'ok') {
      console.warn(result.data.data.otp);
      return fulfillWithValue({
        userId: result.data.data.user.id,
      });
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const updatePassword = createAsyncThunk(
  UPDATE_PASSWORD,
  async (
    {password, confirmPassword}: updatePasswordPayload,
    {rejectWithValue},
  ) => {
    const {userId} = store.getState().forgotPassword;
    const result = await Axios.post(
      ApiEndpoints.forgotPassword.updatePassword,
      {
        user_id: userId,
        password: password,
        confirm_password: confirmPassword,
      },
    );

    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

const initialState: ForgotPasswordSliceState = {
  userId: null,
};

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
    });
  },
});

export const {} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
