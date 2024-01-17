import { selectAuthToken } from '../../User/userSlice';
import { setNewNote, selectCurrentNote, createNewNote } from '../notesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export default function NewNote() {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(selectAuthToken);
  const newNote = useAppSelector(selectCurrentNote);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    dispatch(setNewNote(event.target.value));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(createNewNote({ authToken, text: newNote }));
    dispatch(setNewNote(''));
  };

  return (
    <div className="mx-auto max-w-[70vw] lg:max-w-[50vw]">
      <p className="pb-2">New Note</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newNote}
          onChange={handleChange}
          required
          className="h-32 w-full resize-none"
        />
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
