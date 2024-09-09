import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import {jwtDecode} from "jwt-decode"; // Remover "jwtDecode" entre {} pois não é exportação nomeada

function Inicio() {
    const navigate = useNavigate();
    
    useSessionTimeout();

    // Pegando o token diretamente do localStorage
    const token = localStorage.getItem('token');

    let emailUsuario = '';
    if (token) {
        // Decodificando o token para obter o email ou nome do usuário
        const decoded = jwtDecode(token);
        emailUsuario = decoded.nome || 'Usuário'; // Usando "nome" ou uma string padrão se "nome" não existir
    }

    const handleLogoff = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <h1>Cadastro</h1>
            <Link to={"/cadastroUsuario"}>Cadastro de Usuario / </Link>
            <Link to={"/cadastroFornecedor"}>Cadastro de Fornecedor / </Link>
            <Link to={"/cadastroProduto"}>Cadastro de Produto / </Link>
            <br />
            <h1>Consulta</h1>
            <Link to={"/usuarios"}>Usuarios / </Link>
            <Link to={"/fornecedores"}>Fornecedores / </Link>
            <Link to={"/produtos"}>Produtos / </Link>
            <br />
            <br />
            <h3>Usuario Logado: {emailUsuario}</h3>
            <button onClick={handleLogoff}>LogOut</button>
        </>
    )
}

export default Inicio;
