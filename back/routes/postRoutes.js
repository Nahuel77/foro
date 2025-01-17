const express = require('express');
const { createPost, getPosts, getPostById, createComment, getComments, getLatestPost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware');

const router = express.Router();

router.post('/newpost', authMiddleware, sanitizeMiddleware, createPost);

router.get('/getposts', getPosts );

router.get('/:id', getPostById);

router.post('/newcomment', authMiddleware, sanitizeMiddleware, createComment);

router.get('/getcomments/:id', getComments);

router.get('/getlatestposts/:section/:top', getLatestPost);

module.exports = router;