import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    seccion: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: Buffer },
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date, required: false},
});

export default mongoose.model('Post', PostSchema);