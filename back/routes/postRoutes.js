const express = require('express');
const { createPost, getPosts, getPostById } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware');

const router = express.Router();

router.post('/newpost', authMiddleware, sanitizeMiddleware, createPost);

router.get('/getposts', getPosts );

router.get('/:id', getPostById);

router.post('/newcomment', authMiddleware, sanitizeMiddleware, createComment);

module.exports = router;