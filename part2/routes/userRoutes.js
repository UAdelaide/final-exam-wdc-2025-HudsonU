const express = require('express');
const router = express.Router();
const db = require('../models/db');
const session = require('express-session');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.UserID) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.UserID);
});

router.get('/mydogs', async (req, res) => {
  if (!req.session || !req.session.UserID) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const userId = req.session.UserID;

  const [rows] = await db.query(
    'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
    [userId]
  );

  res.json(rows);
});


// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.UserID = rows[0].user_id;
    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', async (req, res) => {
  if (!req.session.UserID) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
