const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/newpost', authMiddleware, createPost);

router.get('/getposts', getPosts );

module.exports = router;