/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAllNotes, getAllNotes } from '../notesSlice';
import Note from '../Note';
import NotFound from '../../NotFound';

export default function NotesList() {
  const allNotes = useAppSelector(selectAllNotes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  const notesList = allNotes.map((note) => (
    <Note key={note._id} text={note.text} />
  ));

  // TODO: Replace <NotFound /> with 'no notes' message
  return notesList.length > 0 ? <div>{notesList}</div> : <NotFound />;
}
