/* eslint-disable no-console */
/* eslint-disable max-len */
// app.js
const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
// create app
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    database: 'DogWalkService'
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        return;
    }
    console.log('Connected to database.');

    // Load and run the SQL init script
    var sql = fs.readFileSync('./dogwalks.sql', 'utf8');
    db.query(sql, (err1, result) => {
        if (err) {
            console.error('Error running init.sql:', err1);
        } else {
            console.log('database script executed successfully.');
        }
    });
    // load and run the table init script
    sql = fs.readFileSync('./insertion.sql', 'utf8');
    db.query(sql, (err2, result) => {
        if (err) {
            console.error('Error running init.sql:', err2);
        } else {
            console.log('table setup script executed successfully.');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Home page...');
});

app.get("/api/dogs", (req, res) => {
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

});

app.get("/api/walkrequests/open", (req, res) => {
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

app.get("/api/walkers/summary", (req, res) => {
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
