const serverURL = () => import.meta.env.VITE_SERVER_URL;
const apiURL = (path: string) => `${serverURL()}/${path}`;

const jsonHeaders = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

const authHeader = `${import.meta.env.VITE_TEST_USERNAME}:${
  import.meta.env.VITE_TEST_PASSWORD
}`;

const postHeaders = {
  Authorization: authHeader,
  Accept: jsonHeaders.Accept,
  'Content-type': jsonHeaders['Content-type'],
};

const API = {
  getAllNotes: () => fetch(apiURL('note')),
  saveNewNote: (text: string) =>
    fetch(apiURL('note'), {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify({ text }),
    }),
};

export default API;
