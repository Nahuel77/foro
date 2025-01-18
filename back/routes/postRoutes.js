const express = require('express');
const { createPost, getPosts, getPostById, createComment, getComments, getLatestComments, deleteContent } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware');

const router = express.Router();

router.post('/newpost', authMiddleware, sanitizeMiddleware, createPost);

router.get('/getposts/:section/:top', getPosts );

router.get('/getpostbyid/:id', getPostById);

router.post('/newcomment', authMiddleware, sanitizeMiddleware, createComment);

router.get('/getcomments/:id', getComments);

router.get('/getlatestcomments', getLatestComments);

router.post('/deletecontent/:content/:id', authMiddleware, deleteContent);

module.exports = router;