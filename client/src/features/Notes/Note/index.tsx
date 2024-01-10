import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { deleteNote, updateNote } from '../notesSlice';

type IProps = {
  _id: string;
  text: string;
};

export default function Note({ _id, text }: IProps) {
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isEditable && currentText) {
      dispatch(updateNote({ _id, text: currentText }));
    }
    setIsEditable(!isEditable);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setCurrentText(event.target.value);
  };

  return (
    <div className="m-6 border-2 border-solid border-blue-900">
      <textarea
        defaultValue={text}
        disabled={!isEditable}
        onChange={handleChange}
        className={`w-full text-center ${
          isEditable ? 'text-black' : 'text-gray-500'
        }`}
      />
      <div className="my-2">
        <button
          type="button"
          onClick={handleClick}
          className="mr-2 rounded-lg bg-gray-300 px-2 py-1 hover:bg-gray-400"
        >
          {isEditable ? 'Save' : 'Edit'}
        </button>
        <button
          type="button"
          onClick={() => dispatch(deleteNote({ _id }))}
          className="rounded-lg bg-gray-300 px-2 py-1 hover:bg-gray-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
