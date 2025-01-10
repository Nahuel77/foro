const Post = require('../models/post');

const createPost = async (req, res)=>{
    const { title, content, seccion, userName } = req.body;
    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: 'No se encontró el usuario asociado al token' });
    }

    try{
        const post = new Post({ title, content, seccion, userName, user });
        await post.save();

        res.status(201).json({ message: 'Post agregado existosamente', post});
    } catch(err){
        res.status(500).json({ error: 'Error al agregar el post: ', err});
    }
};

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error al cargar posts: ', err });
    }
}

module.exports = {createPost, getPosts };