import { useEffect, useState } from "react";
import { getAllSuppliers } from "../../services/authService";
import { Link } from "react-router-dom";

function TabelaFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const data = await getAllSuppliers();
                setFornecedores(data);
            } catch (error) {
                console.error("Erro ao buscar fornecedores:", error);
            }
        };

        fetchFornecedores();
    }, []);

    return (
        <div>
            <h1>Fornecedores Cadastrados</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Estado</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.map((fornecedor, index) => (
                        <tr key={index}>
                            <td>{fornecedor.fornecedorID}</td>
                            <td>{fornecedor.fornecedorNome}</td>
                            <td>{fornecedor.fornecedorEstado}</td>
                            <td>{fornecedor.fornecedorTelefone}</td>
                            <td>{fornecedor.fornecedorEmail}</td>
                            <td>{fornecedor.nomeCategoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Voltar ao Início</Link>
        </div>
    );
}

export default TabelaFornecedor;
