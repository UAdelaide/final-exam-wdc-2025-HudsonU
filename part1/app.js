// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get("/api/dogs", (req, res) => {}
app.get("/api/walkrequests/open", (req, res) => {}
app.get("/api/walkers/summary", (req, res) => {}
module.exports = app;
