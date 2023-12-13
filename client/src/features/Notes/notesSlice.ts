/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, ThunkStatus, ThunkStatusOptions } from '../../app/store';
import API from '../../app/api';

export interface Note {
  _id: string;
  text: string;
}

export interface NotesState extends ThunkStatus {
  allNotes: Array<Note>;
  newNote: string;
}

const initialState: NotesState = {
  allNotes: [],
  newNote: '',
  status: 'idle',
};

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async () => {
  const response = await API.getAllNotes();
  const jsonResponse = await response.json();
  return jsonResponse;
});

export const saveNewNote = createAsyncThunk(
  'notes/saveNewNote',
  async (note: string) => {
    const response = await API.saveNewNote(note);
    const jsonResponse = await response.json();
    return jsonResponse;
  },
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNewNote: (state, action: PayloadAction<string>) => {
      state.newNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.status = ThunkStatusOptions.loading;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.status = ThunkStatusOptions.idle;
        state.allNotes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state) => {
        state.status = ThunkStatusOptions.failed;
      });
  },
});

export const { setNewNote } = notesSlice.actions;
export const selectAllNotes = (state: RootState) => state.notes.allNotes;
export const selectNewNote = (state: RootState) => state.notes.newNote;
export const selectNotesStatus = (state: RootState) => state.notes.status;
export default notesSlice.reducer;
