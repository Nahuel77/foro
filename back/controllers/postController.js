const Post = require('../models/post');

const createPost = async (req, res)=>{
    const { title, content } = req.body;
    const user = req.userId;

    try{
        const post = new Post({ title, content, user});
        await post.save();

        res.status(201).json({ message: 'Post agregado existosamente', post});
    } catch(err){
        res.status(500).json({ error: 'Error al agregar el post: ', err});
    }
};

module.exports = {createPost};