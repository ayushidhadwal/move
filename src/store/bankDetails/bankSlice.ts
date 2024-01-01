import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {BankDetailsFormValues} from '../../types';

export const bankDetails = createAsyncThunk(
  '/api/bankDetails/post',
  async (
    {accountHolderName, bankName, iban}: BankDetailsFormValues,
    {rejectWithValue},
  ) => {
    const result = await Axios.post(ApiEndpoints.bankDetails.detailsPost, {
      account_holder_name: accountHolderName,
      bank_name: bankName,
      iban: iban,
    });
    if (result.data.status !== 'ok') {
      return rejectWithValue(result.data.message);
    }
  },
);

export const bankSlice = createSlice({
  name: 'bank',
  initialState: null,
  reducers: {},
});

export const {} = bankSlice.actions;

export default bankSlice.reducer;
