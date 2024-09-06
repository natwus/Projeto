import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/getService';
import { updateUser } from '../../services/updateService'

function AlterarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            alert('Você precisa estar logado para acessar esta página.');
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const data = await getUserById(id);
                setUsuario({
                    nome: data.usuarioNome,
                    email: data.usuarioUsuario,
                    senha: ''
                });
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
            }
        }

        fetchUsuario();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, usuario);
            alert('Usuário atualizado com sucesso!');
            navigate('/usuarios'); 
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={usuario.nome} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={usuario.email} onChange={handleChange} />
            </label>
            <label>
                Senha:
                <input type="password" name="senha" value={usuario.senha} onChange={handleChange} />
            </label>
            <button type="submit">Atualizar</button>
        </form>
    );
}

export default AlterarUsuario;
