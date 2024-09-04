import { Link } from "react-router-dom";

function Inicio() {
    return (
        <>
            <h1>Início</h1>
            <Link to={"/cadastroUsuario"}>Cadastro / </Link>
            <Link to={"/login"}>Login / </Link>
            <Link to={"/cadastroFornecedor"}>Cadastro de Fornecedor / </Link>
            <Link to={"/cadastroProduto"}>Cadastro de Produto / </Link>
        </>
    )
}

export default Inicio;