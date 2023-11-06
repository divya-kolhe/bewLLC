const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/user.auth');
const validate = require('../validator/user.validator');

router.post('/api/signUp', validate.createAccountSchema, authController.signUp);

router.post('/api/login', validate.loginSchema, authController.login);

router.get('/api/:userId', validate.validateUserId, checkAuth.auth, authController.getProfile);

module.exports = router;