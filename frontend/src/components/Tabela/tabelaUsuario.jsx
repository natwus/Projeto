import { useState, useEffect } from 'react';
import { getUsers } from '../../services/authService';
import { Link } from 'react-router-dom';

function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([]);

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

    return (
        <div>
            <h1>Usuários Cadastrados</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.usuarioID}</td>
                            <td>{usuario.usuarioNome}</td>
                            <td>{usuario.usuarioUsuario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/"}>Início</Link>
        </div>
    );
}

export default TabelaUsuario;
