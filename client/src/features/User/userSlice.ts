/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkStatus, ThunkStatusOptions } from '../../app/store';
import API from '../../app/api';

export interface User {
  username: string;
  password: string;
}

export interface UserState extends ThunkStatus {
  userId: string;
  authToken: string;
}

const initialState: UserState = {
  userId: '',
  authToken: '',
  status: 'idle',
};

export const login = createAsyncThunk('user/login', async (arg: User) => {
  const response = await API.login(arg);
  const jsonResponse = await response.json();
  return jsonResponse;
});

export const register = createAsyncThunk('user/register', async (arg: User) => {
  const response = await API.register(arg);
  const jsonResponse = await response.json();
  return jsonResponse;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = ThunkStatusOptions.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = ThunkStatusOptions.idle;
        state.authToken = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state) => {
        state.status = ThunkStatusOptions.failed;
      });
  },
});

export const selectAuthToken = (state: RootState) => state.user.authToken;
export default userSlice.reducer;
