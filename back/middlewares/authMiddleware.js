const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log("Authorization Header recibido:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: 'Token inválido o ausente' });

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.id;
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;