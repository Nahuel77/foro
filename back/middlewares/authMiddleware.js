const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'No autorizado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;