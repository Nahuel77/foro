import mongoose from 'mongoose';

const SeccionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    seccion: { type: String, required: true },
    description: { type: String, required: true}
});

export default mongoose.model('Seccion', SeccionSchema);