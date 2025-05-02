// controllers/authControllers.js
const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Room = require('../Models/rooms');

const signup = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Already registered with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });
    
    await user.save();
    return res.status(201).json({ message: "Account created successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again' });
  }
};

const login = async (req, res) => {
  const { email, password  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,    // Make sure the cookie is not accessible from JavaScript
      secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS only in production
      sameSite: 'Strict', // Prevents the browser from sending the cookie with cross-site requests
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (1 day)
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error, please try again' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    
    return res.status(200).json({ message: 'Logout successful' });

  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Server error, please try again' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    return res.status(200).json({
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { signup, login, logout, getCurrentUser };
