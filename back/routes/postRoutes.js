import express from 'express';
import { createPost, getPosts, getPostById, createComment, getComments, getLatestComments, deleteContent, updateContent } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import sanitizeMiddleware from '../middlewares/sanitizeMiddleware.js';

const router = express.Router();

router.post('/newpost', authMiddleware, sanitizeMiddleware, createPost);

router.get('/getposts/:section/:top', getPosts );

router.get('/getpostbyid/:id', getPostById);

router.post('/newcomment', authMiddleware, sanitizeMiddleware, createComment);

router.get('/getcomments/:id', getComments);

router.get('/getlatestcomments', getLatestComments);

router.post('/deletecontent/:content/:id', authMiddleware, deleteContent);

router.post('/updatecontent', authMiddleware, sanitizeMiddleware, updateContent);

export default router;