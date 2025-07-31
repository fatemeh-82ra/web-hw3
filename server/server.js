// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory database
let users = {
    'user1': { password: 'password1', drawing: null },
    'user2': { password: 'password2', drawing: null }
};

let drawings = {};

// Endpoint to get a drawing by userId
app.get('/drawings/:userId', (req, res) => {
    const { userId } = req.params;
    if (users[userId] && users[userId].drawing) {
        res.json(users[userId].drawing);
    } else {
        res.status(404).json({ message: 'Drawing not found' });
    }
});

// Endpoint to save a drawing for a userId
app.post('/drawings/:userId', (req, res) => {
    const { userId } = req.params;
    if (users[userId]) {
        users[userId].drawing = req.body;
        res.status(200).json({ message: 'Drawing saved successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});