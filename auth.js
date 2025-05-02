const express = require('express');
const router = express.Router();
const authenticateUser = require('../Middleware/auth')
const {signup,
    login,
    logout ,getCurrentUser} = require('../Controllers/authControllers');

router.post('/signup', signup);
router.post('/login', login);   
router.post('/logout', logout);  
router.get('/current-user',authenticateUser, getCurrentUser);

module.exports = router;
