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
        const { seccion } = req.query;
        const filter = {};
        if (seccion) {
            filter.seccion = seccion;
        }
        const posts = await Post.find(filter)
            .sort({createdAt: -1})
            .exec();
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error al intentar obtener el post: ', err);
        res.status(500).json({ error: 'Error al obtener los posts', details: err.message });
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

    if(!user){
        return res.status(400).json({ error: 'No se encontró el usuario asociado al token' });
    }

    try{
        const comment = new Comment({ content, userName, user, postId });
        await comment.save();

        res.status(201).json({ message: 'Post agregado existosamente', comment });
    }catch (err){
        console.error('Error al intentar crear el comentario: ', err.message);
        res.status(500).json({ error: 'Error al obtener el post' });
    }
};

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const postId = new mongoose.Types.ObjectId(id);
        const comments = await Comment.find({ postId })
            .sort({date: -1})
            .exec();
        if(!comments) return res.status(404).json({ error: 'Comentario no encontrado' });
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error al obtener los comentarios: ', err);
        res.status(500).json({ error: 'Error al obtener el comentario', details: err.message});
    }
};

const getLatestPost = async (req, res) => {
    try {
        const { section, top } = req.params;
        const filter = {};
        if (section !== 'all') {
            filter.seccion = section;
        }
        const limit = parseInt(top);
        const posts = await Post.find(filter)
            .sort({createdAt: -1})
            .limit(limit);
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error al obtener ultimos posts: ', err);
        res.status(500).json({error: 'Error al obtener ultimos posts', details: err.message});
    }
}

module.exports = { createPost, getPosts, getPostById, createComment, getComments, getLatestPost };