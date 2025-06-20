/* eslint-disable no-console */
/* eslint-disable max-len */
// app.js
const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
// create app
const app = express();

app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});

var db;

async function initDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            multipleStatements: true
        });

        console.log('Connected to database');

        // Run schema setup
        const schemaSQL = await fs.readFile('./dogwalks.sql', 'utf8');
        await connection.query(schemaSQL);
        console.log('Database schema script executed successfully.');

        // Run insertions
        const insertSQL = await fs.readFile('./insertion.sql', 'utf8');
        await connection.query(insertSQL);
        console.log('Insertion script executed successfully.');

        await connection.end();

        db = await mysql.createConnection({
            host: 'localhost',
            database: 'DogWalkService'
        });
    } catch (err) {
        console.error('Error during DB initialization:', err);
    }
}

initDatabase();

app.get('/', (req, res) => {
    res.send('Home page...');
});

app.get("/api/dogs", async (req, res) => {
    // Return a list of all dogs with their size and owner's username.
    /* [
            {
                "dog_name": "Max",
                "size": "medium",
                "owner_username": "alice123"
            },
            {
                "dog_name": "Bella",
                "size": "small",
                "owner_username": "carol123"
            }
        ]
    */
    const [rows] = await db.query('SELECT d.name, d.size, u.username FROM Dogs as d LEFT JOIN Users as u ON d.owner_id = u.user_id;');

    const result = rows.map((row) => ({
        dog_name: row.name,
        size: row.size,
        owner_username: row.username
    }));

    res.json(result);
});

app.get("/api/walkrequests/open", async (req, res) => {
    // Return all open walk requests, including the dog name, requested time, location, and owner's username
    /* [
            {
                "request_id": 1,
                "dog_name": "Max",
                "requested_time": "2025-06-10T08:00:00.000Z",
                "duration_minutes": 30,
                "location": "Parklands",
                "owner_username": "alice123"
            }
        ]
    */
});

app.get("/api/walkers/summary", async (req, res) => {
    // Return a summary of each walker with their average rating and number of completed walks.
    /* [
            {
                "walker_username": "bobwalker",
                "total_ratings": 2,
                "average_rating": 4.5,
                "completed_walks": 2
            },
            {
                "walker_username": "newwalker",
                "total_ratings": 0,
                "average_rating": null,
                "completed_walks": 0
            }
        ]
    */
});
module.exports = app;
