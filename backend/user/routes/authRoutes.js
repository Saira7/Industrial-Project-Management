const express = require('express');
const { check } = require('express-validator');
const authController = require('../controller/authController');
const router = express.Router();

// Validation checks
const validateRegister = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Please include a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').notEmpty().withMessage('Role is required')
];

const validateLogin = [
  check('email').isEmail().withMessage('Please include a valid email'),
  check('password').exists().withMessage('Password is required')
];

// Register Route
router.post('/register', validateRegister, authController.register);

// Login Route
router.post('/login', validateLogin, authController.login);


//Google Auth
router.post('/google',authController.google);

module.exports = router;
