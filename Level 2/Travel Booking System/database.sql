-- Create the 'users' table to store user information
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the 'bookings' table to store booking information
CREATE TABLE bookings (
    id INT PRIMARY KEY,
    user_id INT,
    booking_date DATE,
    other_details TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);