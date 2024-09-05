const { connectToDatabase } = require('../config/db');
const fs = require('fs');
const path = require('path');

async function deleteUser(req, res) {
    const { id } = req.params;
    const connection = await connectToDatabase();

    try {
        const [result] = await connection.execute('DELETE FROM usuario WHERE usuarioID = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Usuário excluído com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado!' });
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir usuário!' });
    } finally {
        if (connection) connection.release();
    }
};

async function deleteSupplier(req, res) {
    const { id } = req.params;
    let connection;

    try {
        connection = await connectToDatabase();
        const [result] = await connection.execute('DELETE FROM fornecedor WHERE fornecedorID = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Fornecedor excluído com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Fornecedor não encontrado!' });
        }
    } catch (error) {
        console.error('Erro ao excluir fornecedor:', error);

        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(409).json({ success: false, message: 'foreign key' });
        } else {
            res.status(500).json({ success: false, message: 'Erro ao excluir fornecedor!' });
        }
    } finally {
        if (connection) connection.release();
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT produtoImagem FROM produto WHERE produtoID = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado!' });
        }

        const imageName = rows[0].produtoImagem;
        const imagePath = path.join(__dirname, '../uploads/', imageName);

        const [result] = await connection.execute('DELETE FROM produto WHERE produtoID = ?', [id]);

        if (result.affectedRows > 0) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Erro ao excluir a imagem:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao excluir a imagem!' });
                }

                res.status(200).json({ success: true, message: 'Produto e imagem excluídos com sucesso!' });
            });
        } else {
            res.status(404).json({ success: false, message: 'Produto não encontrado!' });
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir produto!' });
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { deleteUser, deleteSupplier, deleteProduct };
