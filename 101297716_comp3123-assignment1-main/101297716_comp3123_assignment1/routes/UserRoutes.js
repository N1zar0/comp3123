const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.post('/signup', async (req, res) => {
  try {
    // Extract user information from the request
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'New employee created', user: newUser});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the user account', error: error.message });
  }
  
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Verify the password
  //  const passwordMatch = await bcrypt.compare(password, user.password);

    if (!password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // If the password is correct, create a JSON Web Token (JWT)
    const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
  }
});

module.exports = router;
