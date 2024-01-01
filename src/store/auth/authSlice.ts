import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {
  AuthSliceState,
  LoginPayload,
  OtpPayload,
  RegisterPayload,
} from './types';
import Config from '../../config';
import {load, remove, save} from '../../utils/storage';
import {VerificationFor} from '../../navigation/types';
import {store} from '../index';
import i18n from 'i18next';
import {I18nManager} from 'react-native';

export const AUTH_LOGOUT = '/api/auth/logout';
export const AUTH_RESTORE = '/api/auth/restore';
export const REGISTER = '/auth/register';
export const LOGIN = '/auth/login';
export const AUTH_VERIFY_OTP = '/auth/verify-otp';
export const CHOOSE_SPORTS = 'auth/choose-sport';
export const UNIQUE_CHECK = 'auth/unique-check';
export const AUTH_RESEND_OTP = 'auth/resend-otp';

const createSession = async (payload: {
  userId: number | null;
  token: string | null;
  chooseSport: string | null;
}) => {
  await save(Config.USER_SESSION, payload);
};

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  const lang = await load(Config.USER_LANG);
  console.log(lang);
  if (lang) {
    if (lang === 'ar') {
      i18n?.changeLanguage('ar');
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      I18nManager.swapLeftAndRightInRTL(true);
    } else {
      i18n?.changeLanguage('en');
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      I18nManager.swapLeftAndRightInRTL(false);
    }
  }

  const result = await load(Config.USER_SESSION);
  if (result) {
    return result;
  }
});

export const logout = createAsyncThunk(
  AUTH_LOGOUT,
  async (_, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.auth.logout);
    if (result.data.status === 'ok') {
      await remove(Config.USER_SESSION);
      return true;
    }
    rejectWithValue(false);
  },
);

export const register = createAsyncThunk(
  REGISTER,
  async (
    {
      dob,
      genderId,
      email,
      fullName,
      mobile,
      password,
      confirmPassword,
      username,
    }: RegisterPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    let lat = 0;
    let long = 0;
    const res = await load(Config.USER_LOCATION);
    if (res) {
      lat = res.lat;
      long = res.long;
    }
    const result = await Axios.post(ApiEndpoints.auth.register, {
      dob: dob,
      gender_id: genderId,
      email: email,
      full_name: fullName,
      mobile: mobile,
      password: password,
      confirm_password: confirmPassword,
      user_name: username,
      area_id: '',
      lat: lat,
      long: long,
      address: '',
    });
    if (result.data.status === 'ok') {
      console.warn(result.data.data.otp);
      return fulfillWithValue({
        userId: result.data.data.id,
      });
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const login = createAsyncThunk(
  LOGIN,
  async (
    {number, password}: LoginPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    const result = await Axios.post(ApiEndpoints.auth.login, {
      number: number,
      password: password,
    });
    if (result.data.status === 'ok') {
      let chooseSport = null;
      if (
        result?.data?.data?.choose_sport &&
        result?.data?.data?.choose_sport?.length > 0
      ) {
        [chooseSport] = result?.data?.data?.choose_sport;
      }
      const success = {
        userId: result.data.data.user.id,
        token: result.data.data.token,
        chooseSport: chooseSport?.sports_name,
      };

      await createSession(success);
      return fulfillWithValue(success);
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

export const chooseSport = createAsyncThunk(
  CHOOSE_SPORTS,
  async (selected: number[], {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.userSport, {
      sport_id: selected,
    });
    if (result.data.status === 'ok') {
      const {userId, token}: AuthSliceState = store.getState().auth;
      await createSession({userId, chooseSport: String(selected), token});
      return {
        chooseSport: String(selected),
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  AUTH_VERIFY_OTP,
  async (
    {otp, mobile, verificationFor, userId}: OtpPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    const result = await Axios.post(ApiEndpoints.auth.verifyOtp, {
      user_id: userId,
      otp: otp,
      mobile: mobile,
      verification_for: verificationFor,
    });

    if (result.data.status === 'ok') {
      let {
        token,
        user: {id: userId},
      } = result.data.data;

      if (verificationFor === VerificationFor.REGISTRATION) {
        await createSession({
          userId: userId,
          token: token,
          chooseSport: null,
        });
      } else {
        token = null;
      }

      return fulfillWithValue({
        userId: userId,
        token: token,
        chooseSport: null,
      });
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const resendOTP = createAsyncThunk(
  AUTH_RESEND_OTP,
  async ({phone}: {phone: string}, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.auth.resendOTP, {
      mobile: phone,
      verification_for: VerificationFor.FORGET_PASSWORD,
    });
    if (result.data.status === 'ok') {
      console.warn(result.data.data.otp);
      return true;
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

const initialState: AuthSliceState = {
  isLoading: false,
  userId: null,
  token: null,
  chooseSport: null,
  language: 'en',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.chooseSport = action.payload.chooseSport;
    });

    builder.addCase(chooseSport.fulfilled, (state, action) => {
      state.chooseSport = action.payload.chooseSport;
    });

    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      }
    });

    // restore session
    builder.addCase(restoreSession.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.token) {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.chooseSport = action.payload.chooseSport;
      }
    });
    builder.addCase(restoreSession.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
