import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const notes_collection = "notes";
const router = express.Router();

const testUsername = process.env.TEST_USERNAME;
const testPassword = process.env.TEST_PASSWORD;

const isAuthenticated = (auth) => {
  if (!auth) return false;
  const authParts = auth.split(":");
  if (authParts.length !== 2) return false;
  const username = authParts[0];
  const password = authParts[1];
  return (username === testUsername && password === testPassword);
}

// authentication middleware
router.use((req, res, next) => {
  if (isAuthenticated(req.headers.authorization)) {
    next();
  } else res.status(401).send("ERROR 401: UNAUTHORIZED");
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
