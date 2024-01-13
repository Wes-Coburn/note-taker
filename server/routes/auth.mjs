/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/conn.mjs';
import User from '../models/user.mjs';

const secretKey = process.env.SECRET_KEY;
const usersCollection = 'users';
const router = Router();

// Registration endpoint
// eslint-disable-next-line consistent-return
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const usernamePattern = /.{5,10}$/;
    if (!usernamePattern.test(username)) {
      return res
        .status(500)
        .json({ error: 'Registration failed: invalid username' });
    }

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/;
    if (!passwordPattern.test(password)) {
      return res
        .status(500)
        .json({ error: 'Registration failed: invalid password' });
    }

    const collection = db.collection(usersCollection);
    const query = { username };
    const existingUser = await collection.findOne(query);
    if (existingUser) {
      return res
        .status(500)
        .json({ error: 'Registration failed: username already exists' });
    }
    // Hash the password before saving it
    const hashedPassword = await hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    const result = await collection.insertOne(user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const collection = db.collection(usersCollection);
    const query = { username };
    const user = await collection.findOne(query);

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Authentication failed: invalid username' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: 'Authentication failed: invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router;
