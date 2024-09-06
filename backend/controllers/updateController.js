const { connectToDatabase } = require('../config/db');

async function updateUser(req, res) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const connection = await connectToDatabase();

    try {
        const query = 'UPDATE usuario SET usuarioNome = ?, usuarioUsuario = ?, usuarioSenha = ? WHERE usuarioID = ?';
        const [result] = await connection.execute(query, [nome, email, senha, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado!' });
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar usuário!' });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { updateUser }