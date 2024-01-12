import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs';
import auth from './routes/auth.mjs';
import note from './routes/note.mjs';

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', auth);
app.use('/note', note);

// start the Express server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
