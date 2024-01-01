import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Asset} from 'react-native-image-picker';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {ChangeInfoPayload, PhonePayload} from './types';
import {updatePasswordPayload} from '../auth/types';
import {store} from '../index';

export const UPDATE_PROFILE = '/api/update-profile';
export const USER_CHANGE_PASSWORD = '/api/user-update-password';
export const SEND_FEEDBACK = '/api/post-feedback';

export const updateProfile = createAsyncThunk(
  UPDATE_PROFILE,
  async ({username, fullName, email}: ChangeInfoPayload, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.updateProfile, {
      username: username,
      name: fullName,
      email: email,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const changeNumber = createAsyncThunk(
  UPDATE_PROFILE,
  async ({phone}: PhonePayload, {rejectWithValue, fulfillWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.changeNumber, {
      new_number: phone,
    });
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

export const updatePicture = createAsyncThunk(
  '/api/update-profile-pic',
  async ([file]: Asset[], {rejectWithValue, fulfillWithValue}) => {
    const formData = new FormData();

    if (file?.uri) {
      formData.append('image', {
        uri: file?.uri,
        name: file?.fileName,
        type: file?.type,
      });
    }

    const result = await Axios.post(
      ApiEndpoints.user.uploadUserImage,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    if (result.data.status === 'ok') {
      return fulfillWithValue({res: result.data.status});
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const addFeedback = createAsyncThunk(
  SEND_FEEDBACK,
  async ({feedback}: {feedback: string}, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.feedback, {
      feedback: feedback,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const userUpdatePassword = createAsyncThunk(
  USER_CHANGE_PASSWORD,
  async (
    {password, confirmPassword}: updatePasswordPayload,
    {rejectWithValue},
  ) => {
    const {userId} = store.getState().auth;
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

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
