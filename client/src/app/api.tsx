const serverURL = import.meta.env.VITE_SERVER_URL;
const apiURL = (path: string) => `${serverURL}/${path}`;

const jsonHeaders = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

const API = {
  getAllNotes: () => fetch(apiURL('note'), { method: 'GET' }),
  saveNewNote: (text: string) =>
    fetch(apiURL('note'), {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ text }),
    }),
};

export default API;
