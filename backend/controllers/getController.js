const { connectToDatabase } = require('../config/db');

async function getUserName(req, res) {
    const { email } = req.query;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT usuarioNome FROM usuario WHERE usuarioUsuario = ?', [email]);

        if (rows.length > 0) {
            res.status(200).json({ nome: rows[0].usuarioNome });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao consultar os dados.' });
    } finally {
        if (connection) connection.release();
    }
}

async function getUsers(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT usuarioID, usuarioNome, usuarioUsuario FROM usuario');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar os dados.' });
    } finally {
        if (connection) connection.release();
    }
}

async function getSuppliers(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute(
            `SELECT fornecedor.*, categoria.nomeCategoria 
             FROM fornecedor 
             JOIN categoria ON fornecedor.idCategoria = categoria.idCategoria`
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar fornecedores." });
    } finally {
        if (connection) connection.release();
    }
}

async function getProducts(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute(
            `SELECT produto.produtoID, produto.produtoNome, produto.produtoQuantidade, 
                    produto.produtoPreco, produto.produtoImagem, fornecedor.fornecedorNome
             FROM produto
             JOIN fornecedor ON produto.fornecedorID = fornecedor.fornecedorID`
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produtos.' });
    } finally {
        if (connection) connection.release();
    }
}


module.exports = { getUserName, getUsers, getSuppliers, getProducts };
