import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadPicture = (req, res, next) => {
    upload.single("pic")(req, res, (err) => {
        if (err) {
            console.error("Error en Multer:", err);
            return res.status(500).json({ error: "Error al procesar el archivo" });
        }
        next();
    });
};

export default uploadPicture;