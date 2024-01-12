import { Router } from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/conn.mjs';
import checkAuth from '../middleware/check-auth.mjs';

const notesCollection = 'notes';
const router = Router();

// authentication middleware
router.use(checkAuth);

// get all notes
router.get('/', async (req, res) => {
  const collection = db.collection(notesCollection);
  const results = await collection
    .find({ userId: req.userData.userId })
    .toArray();
  res.status(200).send(results);
});

// create note
router.post('/', async (req, res) => {
  const newNote = {
    userId: req.userData.userId,
    text: req.body.text,
  };
  const collection = db.collection(notesCollection);
  const result = await collection.insertOne(newNote);
  res.status(200).send(result);
});

// update note
router.patch('/:id', async (req, res) => {
  const query = {
    userId: req.userData.userId,
    _id: new ObjectId(req.params.id),
  };
  const updates = {
    $set: {
      text: req.body.text,
    },
  };

  const collection = db.collection(notesCollection);
  const result = await collection.updateOne(query, updates);
  res.status(200).send(result);
});

// delete note
router.delete('/:id', async (req, res) => {
  const query = {
    userId: req.userData.userId,
    _id: new ObjectId(req.params.id),
  };
  const collection = db.collection(notesCollection);
  const result = await collection.deleteOne(query);
  res.status(200).send(result);
});

export default router;
