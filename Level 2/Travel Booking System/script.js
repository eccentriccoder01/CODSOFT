document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const bookingForm = document.getElementById('bookingForm');

    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const bookBtn = document.getElementById('bookBtn');

    registerBtn.addEventListener('click', () => {
        const regUsername = document.getElementById('regUsername').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;

        const data = {
            username: regUsername,
            email: regEmail,
            password: regPassword
        };

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    loginBtn.addEventListener('click', () => {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const data = {
            username: loginUsername,
            password: loginPassword
        };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.token);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    bookBtn.addEventListener('click', () => {
        const bookingDate = document.getElementById('bookingDate').value;
        const bookingDetails = document.getElementById('bookingDetails').value;

        const data = {
            booking_date: bookingDate,
            other_details: bookingDetails
        };

        const token = 'your_jwt_token_here'; // Replace with the actual JWT token

        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});