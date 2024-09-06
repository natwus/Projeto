const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Nenhum token fornecido!' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Falha na autenticação do token!' });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = { verifyToken };
