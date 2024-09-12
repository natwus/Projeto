const { connectToDatabase } = require('../config/db');

async function registerSupplier(req, res) {
    const { nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado } = req.body;
    const connection = await connectToDatabase();

    try {
        const [permissoes] = await connection.execute('SELECT permissaoID FROM usuario WHERE usuarioUsuario = ?', [emailLogado]);
        const permissao = permissoes[0].permissaoID;

        if(permissao !== 3){
            return res.status(403).json({ message: 'Usuário sem permissão'});
        }

        const [rows] = await connection.execute('SELECT fornecedorNome FROM fornecedor WHERE fornecedorNome = ?', [nome]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Erro: Fornecedor já cadastrado!' });
        }

        await connection.execute('INSERT INTO fornecedor (fornecedorNome, fornecedorEstado, fornecedorTelefone, fornecedorEmail, idCategoria) VALUES (?, ?, ?, ?, ?)', [nome, estadoSelecionado, telefone, email, categoriaSelecionada]);

        const dataHoraCadastro = new Date().toLocaleString();
        const historico = `Usuário '${emailLogado}' cadastrou um novo fornecedor (${nome}) às ${dataHoraCadastro}`

        await connection.execute('INSERT INTO historico (historicoDescricao) VALUES (?)', [historico]);

        res.status(200).json({ sucess: true, message: 'Cadastro realizado com sucesso!' });
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
            `SELECT fornecedor.*, 
                    categoria.idCategoria, 
                    categoria.nomeCategoria, 
                    estado.estadoNome
             FROM fornecedor
             JOIN categoria ON fornecedor.idCategoria = categoria.idCategoria
             JOIN estado ON fornecedor.fornecedorEstado = estado.estadoID;`
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar fornecedores." });
    } finally {
        if (connection) connection.release();
    }
};

async function getEstados(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute(
            `SELECT estadoID, estadoNome FROM estado`
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar fornecedores." });
    } finally {
        if (connection) connection.release();
    }
};

async function updateSuppliers(req, res) {
    const { fornecedorID, nome, estado, telefone, email, categoriaSelecionada, emailLogado } = req.body;
    const connection = await connectToDatabase();

    try {
        const [permissoes] = await connection.execute('SELECT permissaoID FROM usuario WHERE usuarioUsuario = ?', [emailLogado]);
        const permissao = permissoes[0].permissaoID;

        if(permissao !== 3){
            return res.status(403).json({ message: 'Usuário sem permissão'});
        }

        let query, params;

        query = 'UPDATE fornecedor SET fornecedorNome = ?, fornecedorEstado = ?, fornecedorTelefone = ?, fornecedorEmail = ?, idCategoria = ? WHERE fornecedorID = ?';
        params = [nome, estado, telefone, email, categoriaSelecionada, fornecedorID];

        const [result] = await connection.execute(query, params);

        const dataHoraCadastro = new Date().toLocaleString();
        const historico = `Usuário '${emailLogado}' alterou o fornecedor (${nome}) às ${dataHoraCadastro}`

        await connection.execute('INSERT INTO historico (historicoDescricao) VALUES (?)', [historico]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Fornecedor atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o fornecedor:', error);
        res.status(500).json({ message: 'Erro no servidor ao atualizar o fornecedor' });
    } finally {
        if (connection) connection.release();
    }
};

async function deleteSupplier(req, res) {
    const { id } = req.params;
    const { emailLogado, fornecedorNome } = req.body;
    const connection = await connectToDatabase();

    try {
        const [permissoes] = await connection.execute('SELECT permissaoID FROM usuario WHERE usuarioUsuario = ?', [emailLogado]);
        const permissao = permissoes[0].permissaoID;

        if(permissao !== 3){
            return res.status(403).json({ message: 'Usuário sem permissão'});
        }

        const [result] = await connection.execute('DELETE FROM fornecedor WHERE fornecedorID = ?', [id]);

        const dataHoraCadastro = new Date().toLocaleString();
        const historico = `Usuário '${emailLogado}' excluiu o fornecedor (${fornecedorNome}) às ${dataHoraCadastro}`

        await connection.execute('INSERT INTO historico (historicoDescricao) VALUES (?)', [historico]);

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
        const [rows] = await connection.execute('SELECT fornecedor.fornecedorID, fornecedor.fornecedorNome, fornecedor.idCategoria, categoria.idCategoria, categoria.nomeCategoria FROM fornecedor JOIN categoria ON fornecedor.idCategoria = categoria.idCategoria ');
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

module.exports = { registerSupplier, getSuppliers, deleteSupplier, updateSuppliers, getEstados, getFornecedores, getCategorias };