const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

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

app.post('/api/bookings', (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded) {
            const { booking_date, other_details } = req.body;
            // You can add booking logic here
            res.json({ message: 'Booking created successfully' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});