import { Link } from "react-router-dom";
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { getLogs } from "../../services/productService";
import { useEffect, useState } from "react";

function Inicio() {
    const [logs, setLogs] = useState([]);
    
    useSessionTimeout();

    useEffect(() => {
        async function fetchLogs() {
            try {
                const data = await getLogs();
                setLogs(data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error);
            }
        };

        fetchLogs();
    }, []);

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
            <table border={1}>
                <thead>
                    <tr>
                        <th>Histórico</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.historicoID}>
                            <td>{log.historicoDescricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Inicio;
