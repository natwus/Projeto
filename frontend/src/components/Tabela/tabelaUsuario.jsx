import { useState, useEffect } from 'react';
import { getUsers, delUser } from '../../services/userService';
import { Link } from 'react-router-dom';
import useSessionTimeout from '../../hooks/useSessionTimeout';

function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([]);

    useSessionTimeout();

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const data = await getUsers();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error);
            }
        }

        fetchUsuarios();
    }, []);

    const deletarUsuario = async (usuarioID) => {
        try {
            await delUser(usuarioID);
            alert('Usuário excluído com sucesso!');
            setUsuarios(usuarios.filter(usuario => usuario.usuarioID !== usuarioID)); 
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário');
        }
    };

    return (
        <div>
            <h1>Usuários Cadastrados</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.usuarioID}</td>
                            <td>{usuario.usuarioNome}</td>
                            <td>{usuario.usuarioUsuario}</td>
                            <td>
                                <button onClick={() => deletarUsuario(usuario.usuarioID)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/inicio"}>Início</Link>
        </div>
    );
}

export default TabelaUsuario;
