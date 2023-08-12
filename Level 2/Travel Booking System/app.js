const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key'; // Change this to a strong secret key

const users = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const id = users.length + 1;
    users.push({ id, username, email, password });
    res.json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/bookings', authenticateToken, (req, res) => {
    const { booking_date, other_details } = req.body;
    // Handle booking logic here
    res.json({ message: 'Booking created successfully' });
});

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});