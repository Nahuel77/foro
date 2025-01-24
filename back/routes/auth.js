const express = require('express');
const { registerUser, loginUser, passwordChange, picUpload } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadPicture = require('../middlewares/picUploadMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changepassword', authMiddleware, passwordChange);
router.post('/uploadpic', authMiddleware, uploadPicture, picUpload);

module.exports = router;