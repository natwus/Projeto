function errorMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor.' });
}

module.exports = errorMiddleware;
