const { connectToDatabase } = require('../config/db');

async function getCategorias(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT idCategoria, nomeCategoria FROM categoria');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar categorias.' });
    } finally {
        if (connection) connection.release();
    }
}

async function getFornecedores(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT fornecedorID, fornecedorNome FROM fornecedor');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar categorias.' });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { getCategorias, getFornecedores };
