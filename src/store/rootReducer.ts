import {AnyAction, CombinedState, combineReducers} from '@reduxjs/toolkit';

import authReducer, {AUTH_LOGOUT} from './auth/authSlice';
import userReducer from './user/userSlice';
import venueReducer from './venue/venueSlice';
import forgotPasswordReducer from './auth/forgotPasswordSlice';
import followReducer, {FollowSliceState} from './follow/followSlice';
import bankReducer from './bankDetails/bankSlice';
import gameReducer from './game/gameSlice';
import homeReducer, {HomeSliceState} from './home/homeSlice';
import locationReducer from './location/locationSlice';
import walletReducer from './wallet/walletSlice';
import bookingReducer from './booking/bookingSlice';

import {AuthSliceState, ForgotPasswordSliceState} from './auth/types';
import {GameSliceState, matchSliceState} from './game/types';
import {LocationSliceState} from './location/types';
import {walletSliceState} from './wallet/types';
import {BookingSliceState} from './booking/types';

const combinedReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  user: userReducer,
  venue: venueReducer,
  forgotPassword: forgotPasswordReducer,
  follow: followReducer,
  bank: bankReducer,
  game: gameReducer,
  home: homeReducer,
  wallet: walletReducer,
  booking: bookingReducer,
});

export const rootReducer = (
  state:
    | CombinedState<{
        location: LocationSliceState;
        auth: AuthSliceState;
        user: null;
        venue: null;
        forgotPassword: ForgotPasswordSliceState;
        follow: FollowSliceState;
        bank: null;
        game: GameSliceState;
        home: HomeSliceState;
        matchJoin: matchSliceState;
        wallet: walletSliceState;
        booking: BookingSliceState;
      }>
    | undefined,
  action: AnyAction,
) => {
  if (action.type === `${AUTH_LOGOUT}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
