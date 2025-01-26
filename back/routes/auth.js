import express from 'express';
import { registerUser, loginUser, passwordChange, picUpload } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createPath, CloudUpload } from '../middlewares/picUploadMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/changepassword', authMiddleware, passwordChange);
router.put('/uploadpic', authMiddleware, createPath, CloudUpload, picUpload);

export default router;