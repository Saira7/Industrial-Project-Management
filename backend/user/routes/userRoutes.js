const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const UserController = require('../controller/userController');

router.get('/me', authenticate, UserController.getMe);

module.exports = router;
