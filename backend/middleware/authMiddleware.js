const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Obtém o token do cabeçalho Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Separa o "Bearer" do token

    console.log('Token recebido:', token); // Log do token recebido

    if (token == null) {
        console.log('Nenhum token fornecido.');
        return res.sendStatus(401); // Sem token, retorna "Unauthorized"
    }

    // Verifica o token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Erro ao verificar o token:', err);
            return res.sendStatus(403); // Token inválido, retorna "Forbidden"
        }

        req.user = user; // Adiciona o usuário à requisição
        next(); // Continua para o próximo middleware ou rota
    });
}

module.exports = authenticateToken;
