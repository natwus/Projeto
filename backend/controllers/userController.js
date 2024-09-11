const { connectToDatabase } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

async function registerUser(req, res) {
    const { nome, email, senha, permissaoSelecionada, emailLogado } = req.body;
    const connection = await connectToDatabase();

    try {
        const [permissoes] = await connection.execute('SELECT permissaoID FROM usuario WHERE usuarioUsuario = ?', [emailLogado]);
        const permissao = permissoes[0].permissaoID;

        if(permissao !== 3){
            return res.status(403).json({ message: 'Erro: usuário sem permissão'});
        }

        const [rows] = await connection.execute('SELECT usuarioUsuario FROM usuario WHERE usuarioUsuario = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Erro: Usuario já cadastrado!' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await connection.execute('INSERT INTO usuario (usuarioNome, usuarioUsuario, usuarioSenha, permissaoID) VALUES (?, ?, ?, ?)', [nome, email, hashedPassword, permissaoSelecionada,]);

        res.status(200).json({ sucess: true, message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao salvar os dados.' });
    } finally {
        if (connection) connection.release();
    }
};

async function loginUser(req, res) {
    const { email, senha } = req.body;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT usuarioNome, usuarioUsuario, usuarioSenha FROM usuario WHERE usuarioUsuario = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.usuarioSenha);

        if (senhaValida) {
            const token = jwt.sign(
                { id: usuario.usuarioUsuario, nome: usuario.usuarioNome },
                secretKey,
                { expiresIn: '12h' }
            );

            return res.status(200).json({
                message: 'Login bem-sucedido!',
                usuario: { nome: usuario.usuarioNome, email: usuario.usuarioUsuario },
                token
            });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor!' });
    } finally {
        if (connection) connection.release();
    }
};

async function getUsers(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute(`
            SELECT usuario.usuarioID, 
                    usuario.usuarioNome, 
                    usuario.usuarioUsuario, 
                    usuario.usuarioSenha,
                    permissao.permissaoNome
            FROM usuario
            JOIN permissao ON permissao.permissaoID = usuario.permissaoID;`);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar os dados.' });
    } finally {
        if (connection) connection.release();
    }
};

async function getPermitions(req, res) {
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT permissaoID, permissaoNome FROM permissao');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar os permissoes:', error);
        res.status(500).json({ message: 'Erro ao buscar os dados.' });
    } finally {
        if (connection) connection.release();
    }
};

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
};

async function updateUser(req, res) {
    const { usuarioID, nome, email, senha, emailLogado } = req.body;
    const connection = await connectToDatabase();

    try {
        const [permissoes] = await connection.execute('SELECT permissaoID FROM usuario WHERE usuarioUsuario = ?', [emailLogado]);
        const permissao = permissoes[0].permissaoID;

        if(permissao !== 3){
            return res.status(403).json({ message: 'Erro: usuário sem permissão'});
        }

        let query, params;

        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, 10);
            query = 'UPDATE usuario SET usuarioNome = ?, usuarioUsuario = ?, usuarioSenha = ? WHERE usuarioID = ?';
            params = [nome, email, hashedPassword, usuarioID];
        } else {
            query = 'UPDATE usuario SET usuarioNome = ?, usuarioUsuario = ? WHERE usuarioID = ?';
            params = [nome, email, usuarioID];
        }

        const [result] = await connection.execute(query, params);

        if (result.affectedRows > 0) {
            res.status(200).json({ sucess: true, message: 'Usuário atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        res.status(500).json({ message: 'Erro no servidor ao atualizar o usuário' });
    } finally {
        if (connection) connection.release();
    }
};

async function deleteUser(req, res) {
    const { id } = req.params;
    const { emailLogado } = req.body;
    const connection = await connectToDatabase();

    console.log(emailLogado);

    try {
        const [permissoes] = await connection.execute('SELECT permissaoID FROM usuario WHERE usuarioUsuario = ?', [emailLogado]);
        const permissao = permissoes[0].permissaoID;

        if(permissao !== 3){
            return res.status(403).json({ message: 'Erro: usuário sem permissão'});
        }

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

module.exports = { registerUser, loginUser, getUsers, getUserName, getPermitions, updateUser, deleteUser };