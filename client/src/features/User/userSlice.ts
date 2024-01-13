/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkStatus } from '../../app/store';
import API from '../../app/api';

export interface User {
  username: string;
  password: string;
}

export interface UserState extends ThunkStatus {
  userId: string;
  authToken: string;
}

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: { jwt: string };
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue: AsyncThunkError;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

interface AsyncThunkError {
  error: string;
}

interface LoginResponse {
  token: string;
  userId: string;
}

const initialState: UserState = {
  userId: '',
  authToken: '',
  status: 'idle',
};

export const login = createAsyncThunk<LoginResponse, User, AsyncThunkConfig>(
  'user/login',
  async (arg: User, thunkAPI) => {
    const response = await API.login(arg);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        (await response.json()) as AsyncThunkError,
      );
    }
    return (await response.json()) as LoginResponse;
  },
);

export const register = createAsyncThunk<any, User, AsyncThunkConfig>(
  'user/register',
  async (arg: User, thunkAPI) => {
    const response = await API.register(arg);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        (await response.json()) as AsyncThunkError,
      );
    }
    return response.json();
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.authToken = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) {
          // eslint-disable-next-line no-alert
          alert(payload.error);
        }
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) {
          // eslint-disable-next-line no-alert
          alert(payload.error);
        }
      });
  },
});

export const selectAuthToken = (state: RootState) => state.user.authToken;
export const selectUserStatus = (state: RootState) => state.user.status;
export default userSlice.reducer;
