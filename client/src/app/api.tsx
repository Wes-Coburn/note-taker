/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import { Note } from '../features/Notes/notesSlice';
import { User } from '../features/User/userSlice';

const serverUrl = () => import.meta.env.VITE_SERVER_URL;
const combineUrls = (urls: string[]) => urls.join('/');
const apiUrl = (path: string) => combineUrls([serverUrl(), path]);
const authApiUrl = (path: string) => combineUrls([apiUrl('auth'), path]);
const noteApiUrl = (path?: string) => combineUrls([apiUrl('note'), path ?? '']);

const authHeaders = (authToken: string) => ({
  Authorization: `Bearer ${authToken}`,
});

const jsonHeaders = () => ({
  Accept: 'application/json',
  'Content-type': 'application/json',
});

const postHeaders = (authToken: string) => ({
  Accept: jsonHeaders().Accept,
  Authorization: authHeaders(authToken).Authorization,
  'Content-type': jsonHeaders()['Content-type'],
});

const API = {
  login: ({ username, password }: User) =>
    fetch(authApiUrl('login'), {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ username, password }),
    }),
  register: ({ username, password }: User) =>
    fetch(authApiUrl('register'), {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ username, password }),
    }),
  getAllNotes: (authToken: string) =>
    fetch(noteApiUrl(), {
      method: 'GET',
      headers: authHeaders(authToken),
    }),
  createNewNote(authToken: string, text: string) {
    return fetch(noteApiUrl(), {
      method: 'POST',
      headers: postHeaders(authToken),
      body: JSON.stringify({ text }),
    });
  },
  updateNote: ({ authToken, note }: { authToken: string; note: Note }) =>
    fetch(noteApiUrl(note._id), {
      method: 'PATCH',
      headers: postHeaders(authToken),
      body: JSON.stringify({ text: note.text }),
    }),
  deleteNote: (authToken: string, _id: string) =>
    fetch(noteApiUrl(_id), {
      method: 'DELETE',
      headers: authHeaders(authToken),
    }),
};

export default API;
