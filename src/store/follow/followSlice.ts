import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ApiEndpoints} from '../ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {blockDTO, blockListDTO, followerDTO, followingDTO} from './types';

export type FollowSliceState = {
  id: null | string;
  type: null | number;
  removedId: null | number;
  unFollowId: null | number;
  blockList: blockListDTO[];
  followerList: followerDTO[];
  followingList: followingDTO[];
};

export const UN_FOLLOW = '/api/unFollow';
export const FOLLOW = '/api/follow';
export const BLOCK = '/api/block-unblock';
export const GET_BLOCK = '/api/get-block';
export const REMOVE_FOLLOWER = '/api/remove-follower';

export const FOLLOWER_LIST = '/api/follower-list';
export const FOLLOWING_LIST = '/api/following-list';

export const userFollowerList = createAsyncThunk(
  FOLLOWER_LIST,
  async (id: number | null, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.user.follower, {
      params: {user_id: id},
    });
    if (result.data.status === 'ok') {
      return {
        followerList: result.data.data,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const getFollowingList = createAsyncThunk(
  FOLLOWING_LIST,
  async (id: number | null, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.user.following, {
      params: {user_id: id},
    });
    if (result.data.status === 'ok') {
      return {
        followingList: result.data.data,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const userBlockList = createAsyncThunk(
  GET_BLOCK,
  async (_, {rejectWithValue}) => {
    const result = await Axios.get(ApiEndpoints.user.blockList);
    if (result.data.status === 'ok') {
      return {
        blockList: result.data.data,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const unFollow = createAsyncThunk(
  UN_FOLLOW,
  async (id: string, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.unFollow, {
      unfollow_to: id,
    });
    if (result.data.status === 'ok') {
      return {
        unFollowId: id,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const follow = createAsyncThunk(
  FOLLOW,
  async (id: string, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.follow, {
      follow_to: id,
    });
    if (result.data.status === 'ok') {
      return true;
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const block = createAsyncThunk(
  BLOCK,
  async ({id, type}: blockDTO, {rejectWithValue}) => {
    // type 1 for block and 2 for unblock
    const result = await Axios.post(ApiEndpoints.user.block, {
      block_whome: id,
      type: type,
    });
    if (result.data.status === 'ok') {
      return {id: id, type: type};
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

export const removeFollower = createAsyncThunk(
  REMOVE_FOLLOWER,
  async (id: string, {rejectWithValue}) => {
    const result = await Axios.post(ApiEndpoints.user.remove, {
      remove_to: id,
    });
    if (result.data.status === 'ok') {
      return {
        removedId: id,
      };
    } else {
      return rejectWithValue(result.data.message);
    }
  },
);

const initialState: FollowSliceState = {
  id: null,
  type: null,
  removedId: null,
  unFollowId: null,
  blockList: [],
  followerList: [],
  followingList: [],
};

export const followSlice = createSlice({
  name: 'follow',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userFollowerList.fulfilled, (state, action) => {
      state.followerList = action.payload.followerList;
    });

    builder.addCase(removeFollower.fulfilled, (state, action) => {
      state.followerList = state.followerList.filter(
        x => Number(x.follow_from.id) !== Number(action.payload.removedId),
      );
    });

    builder.addCase(getFollowingList.fulfilled, (state, action) => {
      state.followingList = action.payload.followingList;
    });

    builder.addCase(unFollow.fulfilled, (state, action) => {
      state.followingList = state.followingList.filter(
        x => Number(x.follow_to.id) !== Number(action.payload.unFollowId),
      );
    });

    builder.addCase(userBlockList.fulfilled, (state, action) => {
      state.blockList = action.payload.blockList;
    });

    builder.addCase(block.fulfilled, (state, action) => {
      const blockedId = action.payload.id;
      if (action.payload.type === 2) {
        state.blockList = state.blockList.filter(
          x => Number(x.block_whome.id) !== Number(blockedId),
        );
      }
    });
  },
});

export const {} = followSlice.actions;

export default followSlice.reducer;
