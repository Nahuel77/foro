import { v2 as cloud } from 'cloudinary';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

dotenv.config();

cloud.config({
    cloud_name: process.env.CLOUDINDARY_CLOUD_NAME,
    api_key: process.env.CLOUDINDARY_API_KEY,
    api_secret: process.env.CLOUDINDARY_API_SECRET,
    secure: true,
});

export const createPath = fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/'
})

export const CloudUpload = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No se subió ningún archivo' });
        }

        const uploadedFile = req.files.file;

        const result = await cloud.uploader.upload(uploadedFile.tempFilePath, {
            folder: 'foro',
        });

        req.cloudinaryUrl = result.secure_url;

        next();
    } catch (error) {
        console.error('Error al subir a Cloudinary:', error);
        res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
    }
};