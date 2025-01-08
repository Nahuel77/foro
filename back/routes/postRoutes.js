const express = require('express');
const { createPost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/newpost', authMiddleware, createPost);

module.exports = router;