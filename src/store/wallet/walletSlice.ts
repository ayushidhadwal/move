import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {walletSliceState} from './types';
import {TopUpListItem} from '../../data/TopUpList';
import {TransactionItem} from '../../data/TransactionList';
import {topUpValues} from '../../types';

export const GET_WALLET = '/get-packages';

export const getPackages = createAsyncThunk(
  GET_WALLET,
  async (_, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.wallet.getPackages);
    if (result.data.status === 'ok') {
      return {
        couponList: result.data.data,
      };
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

export const getTransactionList = createAsyncThunk(
  '/api/wallet/transaction',
  async ({date, transactionId, amtPaid}: topUpValues, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.wallet.transaction, {
      date: date,
      transaction_id: transactionId,
      amount: amtPaid,
    });
    if (result.data.status !== 'ok') {
      return rejectWithValue(result.data.message);
    }
  },
);

const initialState: walletSliceState = {
  couponList: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPackages.fulfilled, (state, action) => {
      state.couponList = action.payload.couponList;
    });
  },
});

export const {} = walletSlice.actions;

export default walletSlice.reducer;
