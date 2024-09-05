import { Link } from "react-router-dom";

function Inicio() {
    return (
        <>
            <h1>Cadastro</h1>
            <Link to={"/cadastroUsuario"}>Cadastro / </Link>
            <Link to={"/login"}>Login / </Link>
            <Link to={"/cadastroFornecedor"}>Cadastro de Fornecedor / </Link>
            <Link to={"/cadastroProduto"}>Cadastro de Produto / </Link>
            <br/>
            <h1>Consulta</h1>
            <Link to={"/usuarios"}>Usuarios / </Link>
            <Link to={"/fornecedores"}>Fornecedores / </Link>
            <Link to={"/produtos"}>Produtos / </Link>
        </>
    )
}

export default Inicio;