import { setNewNote, selectNewNote, saveNewNote } from '../notesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './NewNote.module.css';

export default function NewNote() {
  const dispatch = useAppDispatch();
  const newNote = useAppSelector(selectNewNote);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setNewNote(event.target.value));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert(newNote);
    dispatch(saveNewNote(newNote));
    dispatch(setNewNote(''));
  };

  return (
    <div className={styles.NewNoteContainer}>
      <p>New Note</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.NewNoteInput}>
          <input
            id="newNoteInput"
            type="text"
            value={newNote}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
