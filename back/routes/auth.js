import express from 'express';
import { registerUser, loginUser, passwordChange, picUpload } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadPicture from '../middlewares/picUploadMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changepassword', authMiddleware, passwordChange);
router.post('/uploadpic', authMiddleware, uploadPicture, picUpload);

export default router;