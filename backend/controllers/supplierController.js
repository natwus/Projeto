const { connectToDatabase } = require('../config/db');

async function registerSupplier(req, res) {
    const { nome, estado, telefone, email, categoriaSelecionada } = req.body;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT fornecedorNome FROM fornecedor WHERE fornecedorNome = ?', [nome]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Erro: Fornecedor já cadastrado!' });
        }

        await connection.execute('INSERT INTO fornecedor (fornecedorNome, fornecedorEstado, fornecedorTelefone, fornecedorEmail, idCategoria) VALUES (?, ?, ?, ?, ?)', [nome, estado, telefone, email, categoriaSelecionada]);

        res.status(200).json({ sucess:true, message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao salvar os dados.' });
    } finally {
        if (connection) connection.release();
    }
};

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
};

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
};

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
};

module.exports = { registerSupplier, getSuppliers, deleteSupplier, getFornecedores, getCategorias };