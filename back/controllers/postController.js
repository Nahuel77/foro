const Post = require('../models/post');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    const { title, content, seccion, userName } = req.body;
    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: 'No se encontró el usuario asociado al token' });
    }

    try {
        const post = new Post({ title, content, seccion, userName, user });
        await post.save();

        res.status(201).json({ message: 'Post agregado existosamente', post });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el post: ', err });
    }
};

const getPosts = async (req, res) => {
    try {
        const { section, top } = req.params;
        const filter = {};
        if (section !== 'all') {
            filter.seccion = section;
        }
        const limit = parseInt(top);
        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit);
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error al obtener ultimos posts: ', err);
        res.status(500).json({ error: 'Error al obtener ultimos posts', details: err.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el post' });
    }
};

const createComment = async (req, res) => {
    const { content, userName, postId } = req.body;
    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: 'No se encontró el usuario asociado al token' });
    }

    try {
        const comment = new Comment({ content, userName, user, postId });
        await comment.save();

        res.status(201).json({ message: 'Post agregado existosamente', comment });
    } catch (err) {
        console.error('Error al intentar crear el comentario: ', err.message);
        res.status(500).json({ error: 'Error al intentar crear el comentario' });
    }
};

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const postId = new mongoose.Types.ObjectId(id);
        const comments = await Comment.find({ postId })
            .sort({ date: -1 })
            .exec();
        if (!comments) return res.status(404).json({ error: 'Comentario no encontrado' });
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error al obtener los comentarios: ', err);
        res.status(500).json({ error: 'Error al obtener el comentario', details: err.message });
    }
};

const getLatestComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .sort({ date: -1 })
            .limit(10)
            .populate({
                path: 'postId',
                select: 'title'
            })
            .exec();
        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: 'Comentarios no encontrados' });
        }
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error al obtener comentarios. ', err);
        res.status(500).json({ error: 'Error al obtener comentarios', details: err.message });
    }
};

const deleteContent = async (req, res) => {
    const {content, id} = req.params;
    console.log('post', content);
    if (content === 'Post') {
        try {
            const deletedPost = await Post.findByIdAndDelete(id);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }
            res.status(202).json({ message: 'Post eliminado con exito' });
        } catch (err) {
            console.error('Error al borrar contenido. ', err);
            res.status(500).json({ error: 'Error al borrar el post', details: err.message });
        }
    }
    if (content === 'Comment') {
        try {
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comentario no encontrado' });
            }
            res.status(202).json({ message: 'Comentario eliminado con exito' });
        } catch (err) {
            console.error('Error al borrar contenido. ', err);
            res.status(500).json({ error: 'Error al borrar el comentario', details: err.message });
        }
    }
}

module.exports = { createPost, getPosts, getPostById, createComment, getComments, getLatestComments, deleteContent };