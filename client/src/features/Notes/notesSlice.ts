/* eslint-disable no-underscore-dangle */
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
  currentNote: string;
}

const initialState: NotesState = {
  allNotes: [],
  currentNote: '',
  status: 'idle',
};

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async () => {
  const response = await API.getAllNotes();
  const jsonResponse = await response.json();
  return jsonResponse;
});

export const createNewNote = createAsyncThunk(
  'notes/createNewNote',
  async (text: string, thunkAPI) => {
    const response = await API.createNewNote(text);
    const jsonResponse = await response.json();
    thunkAPI.dispatch(getAllNotes());
    return jsonResponse;
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (arg: { _id: string; text: string }) => {
    const response = await API.updateNote(arg._id, arg.text);
    const jsonResponse = await response.json();
    return jsonResponse;
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (arg: { _id: string }) => {
    const response = await API.deleteNote(arg._id);
    const jsonResponse = await response.json();
    return jsonResponse;
  },
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNewNote: (state, action: PayloadAction<string>) => {
      state.currentNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllNotes
      .addCase(getAllNotes.pending, (state) => {
        state.status = ThunkStatusOptions.loading;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.status = ThunkStatusOptions.idle;
        state.allNotes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state) => {
        state.status = ThunkStatusOptions.failed;
      })
      // updateNote
      .addCase(updateNote.pending, (state) => {
        state.status = ThunkStatusOptions.loading;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = ThunkStatusOptions.idle;
        const updatedNote = state.allNotes.find(
          (note) => note._id === action.meta.arg._id,
        );
        if (updatedNote) {
          updatedNote.text = action.meta.arg.text;
        }
      })
      // deleteNote
      .addCase(deleteNote.pending, (state) => {
        state.status = ThunkStatusOptions.loading;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = ThunkStatusOptions.idle;
        state.allNotes = state.allNotes.filter(
          (note) => note._id !== action.meta.arg._id,
        );
      });
  },
});

export const { setNewNote } = notesSlice.actions;
export const selectAllNotes = (state: RootState) => state.notes.allNotes;
export const selectCurrentNote = (state: RootState) => state.notes.currentNote;
export const selectNotesStatus = (state: RootState) => state.notes.status;
export default notesSlice.reducer;
