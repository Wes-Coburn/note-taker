const serverURL = () => import.meta.env.VITE_SERVER_URL;
const apiURL = (path: string) => `${serverURL()}/${path}`;
const noteApiUrl = (path?: string) =>
  `${apiURL('note')}${path ? `/${path}` : ''}`;

const jsonHeaders = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

const authHeader = {
  Authorization: `${import.meta.env.VITE_TEST_USERNAME}:${
    import.meta.env.VITE_TEST_PASSWORD
  }`,
};

const postHeaders = {
  Authorization: authHeader.Authorization,
  Accept: jsonHeaders.Accept,
  'Content-type': jsonHeaders['Content-type'],
};

const API = {
  getAllNotes: () =>
    fetch(noteApiUrl(), {
      method: 'GET',
      headers: authHeader,
    }),
  createNewNote: (text: string) =>
    fetch(noteApiUrl(), {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify({ text }),
    }),
  updateNote: (noteId: string, text: string) =>
    fetch(noteApiUrl(noteId), {
      method: 'PATCH',
      headers: postHeaders,
      body: JSON.stringify({ text }),
    }),
  deleteNote: (noteId: string) =>
    fetch(noteApiUrl(noteId), {
      method: 'DELETE',
      headers: authHeader,
    }),
};

export default API;
