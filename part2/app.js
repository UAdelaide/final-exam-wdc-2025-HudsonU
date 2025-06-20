const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const db = require('../models/db');

const app = express();

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

app.get("/api/dogs", async (req, res) => {
    // Return a list of all dogs with their size and owner's username.
    const [rows] = await db.query('SELECT d.dog_id, d.name, d.size FROM Dogs as d LEFT JOIN Users as u ON d.owner_id = u.user_id;');

    const result = rows.map((row) => ({
        dog_name: row.name,
        size: row.size,
        owner_username: row.username
    }));

    res.json(result);
});

// Export the app instead of listening here
module.exports = app;