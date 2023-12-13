import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const clientURL = () => process.env.CLIENT_URL;
const notes_collection = "notes";
const router = express.Router();

// authentication middleware
router.use((req, res, next) => {
  if (req.headers.origin === clientURL()) next();
  else res.status(401).send("Unauthorized");
});

// get all notes
router.get("/", async (_req, res) => {
  let collection = db.collection(notes_collection);
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

// get note by id
router.get("/:id", async (req, res) => {
  let collection = db.collection(notes_collection);
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// create note
router.post("/", async (req, res) => {
  let newNote = {
    text: req.body.text,
  };
  let collection = db.collection(notes_collection);
  let result = await collection.insertOne(newNote);
  res.status(204).send(result);
});

/*
// update note
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };

  let collection = db.collection(notes_collection);
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// delete note
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection(notes_collection);
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});
*/

export default router;
