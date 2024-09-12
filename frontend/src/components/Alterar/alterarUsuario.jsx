import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPermissoes, updateUser } from '../../services/userService';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { jwtDecode } from 'jwt-decode';

function EditarUsuario() {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuarioID, usuarioNome, usuarioUsuario, permissaoID } = location.state || {};
    const [nome, setNome] = useState(usuarioNome || '');
    const [email, setEmail] = useState(usuarioUsuario || '');
    const [senha, setSenha] = useState('');
    const [permissoes, setPermissoes] = useState([]);
    const [permissaoSelecionada, setPermissaoSelecionada] = useState(permissaoID || '')
    const token = localStorage.getItem('token');

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id
    }

    useSessionTimeout();

    useEffect(() => {
        const fetchPermissoes = async () => {
            try {
                const permissao = await getPermissoes();
                setPermissoes(permissao);
            } catch (error){
                console.error('Erro ao buscar permissoes:', error);
            }
        };

        fetchPermissoes();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await updateUser(usuarioID, nome, email, senha || undefined, permissaoSelecionada, emailLogado);

            if (data.success) {
                alert('Usuário atualizado com sucesso!');
                navigate('/usuarios');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o usuário');
        }
    };

    return (
        <div>
            <h1>Editar Usuário</h1>
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                    type="text"
                    name="usuarioNome"
                    defaultValue={usuarioNome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="usuarioUsuario"
                    defaultValue={usuarioUsuario}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha:</label>
                <input
                    type="password"
                    name="usuarioSenha"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <label>Permissão:</label>
                <select
                    name="permissao"
                    value={permissaoSelecionada}
                    onChange={(e) => setPermissaoSelecionada(e.target.value)}
                >
                    <option value="">Selecione a permissão</option>
                    {permissoes.map((permissao) => (
                        <option key={permissao.permissaoID} value={permissao.permissaoID}>
                            {permissao.permissaoNome}
                        </option>
                    ))}
                </select>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default EditarUsuario;