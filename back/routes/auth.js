const express = require('express');
const { registerUser, loginUser, passwordChange } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changepassword', authMiddleware, passwordChange);

module.exports = router;