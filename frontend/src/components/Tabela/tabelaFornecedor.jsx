import { useEffect, useState } from "react";
import { getAllSuppliers, delSupplier } from "../../services/supplierService";
import { Link } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";

function TabelaFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);

    useSessionTimeout();

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

    const deletarFornecedor = async (fornecedorID) => {
        try {
            await delSupplier(fornecedorID);
            alert('Fornecedor excluído com sucesso!');
            setFornecedores(fornecedores.filter(fornecedor => fornecedor.fornecedorID !== fornecedorID));
        } catch (error) {
            const errorMessage = error.message;
    
            if (errorMessage.includes('foreign key')) {
                alert('Erro ao excluir: Este fornecedor está vinculado a outros registros');
            } else {
                alert('Erro ao excluir fornecedor');
            }
        }
    };

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
                        <th>Ação</th>
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
                            <td>
                                <button onClick={() => deletarFornecedor(fornecedor.fornecedorID)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/inicio">Voltar ao Início</Link>
        </div>
    );
}

export default TabelaFornecedor;
