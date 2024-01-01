import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {getMatchPayload} from './types';

export type HomeSliceState = {};

export const GET_MATCH_LIST = '/get-match-list';

export const getMatchList = createAsyncThunk(
  GET_MATCH_LIST,
  async (
    {
      search,
      newDate,
      sports,
      radius,
      gender,
      level,
      isPaginate,
    }: getMatchPayload,
    {rejectWithValue},
  ) => {
    const result = await Axios.get(ApiEndpoints.explore.matchListing, {
      params: {
        keyword: search,
        date: newDate,
        sport_id: sports,
        radius: radius,
        gender_id: gender,
        level_en: level,
        is_paginate: isPaginate, //  send 5 from home screen otherwise blank string
      },
    });

    if (result.data.status === 'ok') {
      return {
        matchList: result.data.data.match_list,
        upcomingMatch: result.data.data.upcomming_match,
      };
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

const initialState: HomeSliceState = {};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {},
});

export const {} = homeSlice.actions;

export default homeSlice.reducer;
