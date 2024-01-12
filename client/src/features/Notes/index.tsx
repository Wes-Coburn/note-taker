import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuthToken } from '../User/userSlice';
import { selectAllNotes, getAllNotes } from './notesSlice';
import NewNote from './NewNote';
import NotesList from './NoteList';

export default function Notes() {
  const authToken = useAppSelector(selectAuthToken);
  const allNotes = useAppSelector(selectAllNotes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllNotes(authToken));
  }, [dispatch, authToken]);
  return (
    <div className="p-6">
      <NewNote />
      <NotesList notes={allNotes} />
    </div>
  );
}
