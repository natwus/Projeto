//tabela
import { useEffect, useState } from "react";
import { getAllSuppliers, delSupplier } from "../../services/supplierService";
import { Link, useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { jwtDecode } from "jwt-decode";

function TabelaFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id
    }

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

    const deletarFornecedor = async (fornecedorID, fornecedorNome) => {
        try {
            const data = await delSupplier(fornecedorID, emailLogado, fornecedorNome);

            if (data.success){
                alert('Fornecedor excluído com sucesso!');
            setFornecedores(fornecedores.filter(fornecedor => fornecedor.fornecedorID !== fornecedorID));
            } else {
                alert(data.message);
            }
        } catch (error) {
            const errorMessage = error.message;
    
            if (errorMessage.includes('foreign key')) {
                alert('Erro ao excluir: Este fornecedor está vinculado a outros registros');
            } else {
                alert('Erro ao excluir fornecedor');
            }
        }
    };

    const editarFornecedor = (fornecedorID, fornecedorNome, fornecedorEstado, fornecedorTelefone, fornecedorEmail, idCategoria, nomeCategoria) => {
        navigate('/alterarFornecedor', { state: { fornecedorID, fornecedorNome, fornecedorEstado, fornecedorTelefone, fornecedorEmail, idCategoria, nomeCategoria } });
    }

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
                            <td>{fornecedor.estadoNome}</td> 
                            <td>{fornecedor.fornecedorTelefone}</td>
                            <td>{fornecedor.fornecedorEmail}</td>
                            <td>{fornecedor.nomeCategoria}</td>
                            <td>
                                <button onClick={() => deletarFornecedor(fornecedor.fornecedorID, fornecedor.fornecedorNome)}>
                                    Excluir
                                </button>
                                <button onClick={() => editarFornecedor(fornecedor.fornecedorID, fornecedor.fornecedorNome,fornecedor.fornecedorEstado, fornecedor.fornecedorTelefone, fornecedor.fornecedorEmail, fornecedor.idCategoria, fornecedor.nomeCategoria)}>
                                    Editar
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
