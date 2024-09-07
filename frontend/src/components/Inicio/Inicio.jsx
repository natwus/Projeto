import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useSessionTimeout from '../../hooks/useSessionTimeout';

function Inicio() {
    const navigate = useNavigate();
    
    useSessionTimeout();

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
            <button onClick={handleLogoff}>LogOut</button>
        </>
    )
}

export default Inicio;