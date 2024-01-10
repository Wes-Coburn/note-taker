import { setNewNote, selectCurrentNote, createNewNote } from '../notesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export default function NewNote() {
  const dispatch = useAppDispatch();
  const newNote = useAppSelector(selectCurrentNote);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    dispatch(setNewNote(event.target.value));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(createNewNote(newNote));
    dispatch(setNewNote(''));
  };

  return (
    <div className="mx-6">
      <p className="pb-2">New Note</p>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={newNote}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-gray-300 px-2 py-1 hover:bg-gray-400"
        >
          Save
        </button>
      </form>
    </div>
  );
}
