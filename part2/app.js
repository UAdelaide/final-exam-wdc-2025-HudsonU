const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const db = require('./models/db');

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
    const [rows] = await db.query('SELECT dog_id, name, size, owner_id FROM Dogs;');

    const result = rows.map((row) => ({
        dog_id: row.dog_id,
        dog_name: row.name,
        size: row.size,
        owner_id: row.owner_id
    }));

    res.json(result);
});

// Export the app instead of listening here
module.exports = app;