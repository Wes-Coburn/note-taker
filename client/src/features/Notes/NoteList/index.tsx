/* eslint-disable no-underscore-dangle */
import { useAppSelector } from '../../../app/hooks';
import { Note as NoteType, selectNotesStatus } from '../notesSlice';
import Note from '../Note';
import FullPageLoading from '../../Utilities/Loading/FullPageLoading';
import Error from '../../Utilities/Error';

interface IProps {
  notes: Array<NoteType>;
}

export default function NotesList({ notes }: IProps) {
  try {
    const notesStatus = useAppSelector(selectNotesStatus);

    if (notesStatus === 'loading') {
      return <FullPageLoading />;
    }

    if (notesStatus === 'failed') {
      return <Error />;
    }

    if (notes.length < 1) {
      return <p className="pt-12">You don&apos;t have any notes.</p>;
    }

    const notesList = notes
      .map((note) => <Note key={note._id} _id={note._id} text={note.text} />)
      .reverse();

    return <div className="flex flex-wrap justify-between">{notesList}</div>;
  } catch (e) {
    return <Error />;
  }
}
