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
  return username === testUsername && password === testPassword;
};

// authentication middleware
router.use((req, res, next) => {
  if (isAuthenticated(req.headers.authorization)) {
    next();
  } else res.status(401).send("ERROR 401: UNAUTHORIZED");
});

// get all notes
router.get("/", async (_req, res) => {
  const collection = db.collection(notes_collection);
  const results = await collection.find({}).toArray();
  res.status(200).send(results);
});

// get note by id
router.get("/:id", async (req, res) => {
  const collection = db.collection(notes_collection);
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) res.status(404).send("ERROR 404: NOT FOUND");
  else res.status(200).send(result);
});

// create note
router.post("/", async (req, res) => {
  const newNote = {
    text: req.body.text,
  };
  const collection = db.collection(notes_collection);
  const result = await collection.insertOne(newNote);
  res.status(200).send(result);
});

// update note
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      text: req.body.text,
    },
  };

  const collection = db.collection(notes_collection);
  const result = await collection.updateOne(query, updates);
  res.status(200).send(result);
});

// delete note
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection(notes_collection);
  const result = await collection.deleteOne(query);
  res.status(200).send(result);
});

export default router;
