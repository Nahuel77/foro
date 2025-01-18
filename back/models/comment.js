const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);