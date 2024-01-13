/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import notesReducer from '../features/Notes/notesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const AllThunkStatus = ['loading', 'idle', 'failed'] as const;
export interface ThunkStatus {
  status: (typeof AllThunkStatus)[number];
}
