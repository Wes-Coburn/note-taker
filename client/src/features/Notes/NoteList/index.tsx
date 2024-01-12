/* eslint-disable no-underscore-dangle */
import Note from '../Note';
import { Note as NoteType } from '../notesSlice';
import NotFound from '../../Utilities/NotFound';

interface IProps {
  notes: Array<NoteType>;
}

export default function NotesList({ notes }: IProps) {
  try {
    const notesList = notes.map((note) => (
      <Note key={note._id} _id={note._id} text={note.text} />
    ));

    // TODO: Replace <NotFound /> with 'no notes' message
    return notesList.length > 0 ? <>{notesList.reverse()}</> : <NotFound />;
  } catch (e) {
    return <NotFound />;
  }
}
