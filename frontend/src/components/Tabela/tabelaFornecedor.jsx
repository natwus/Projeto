//tabela
import { useEffect, useState } from "react";
import { getAllSuppliers, delSupplier } from "../../services/supplierService";
import { useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { jwtDecode } from "jwt-decode";
import { AcaoButton, Container, Table, Th, Td } from "../Style/TableStyle/tableStyle";
import { Title } from "../Style/HeaderStyle/headerStyle";
import { ModalContainer, ModalContent } from '../Style/ModalStyle/modalStyle';

function TabelaFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [fornecedorIDParaExcluir, setFornecedorIDParaExcluir] = useState(null);
    const [fornecedorNomeParaExcluir, setFornecedorNomeParaExcluir] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalStyle, setModalStyle] = useState({});

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

    const confirmarExclusao = (fornecedor) => {
        setFornecedorIDParaExcluir(fornecedor.fornecedorID);
        setFornecedorNomeParaExcluir(fornecedor.fornecedorNome);
        setModalMessage('Você tem certeza que deseja excluir este fornecedor?');
        setModalStyle({ backgroundColor: '#ffc107', color: 'black' });
        setIsModalOpen(true);
    };

    const deletarFornecedor = async () => {
        if (!fornecedorIDParaExcluir) return;

        try {
            const data = await delSupplier(fornecedorIDParaExcluir, emailLogado, fornecedorNomeParaExcluir);

            if (data.sucess) {
                setModalMessage('Fornecedor excluído com sucesso!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setFornecedores(fornecedores.filter(fornecedor => fornecedor.fornecedorID !== fornecedorIDParaExcluir));
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
            }
        } catch (error) {
            const errorMessage = error.message;

            if (errorMessage.includes('foreign key')) {
                setModalMessage('Erro ao excluir: Este fornecedor está vinculado a outros registros');
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
            } else {
                alert('Erro ao excluir fornecedor');
            }
        } finally {
            setIsModalOpen(false);
            setFornecedorIDParaExcluir(null);
            setFornecedorNomeParaExcluir(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const editarFornecedor = (fornecedorID, fornecedorNome, estadoID, fornecedorTelefone, fornecedorEmail, idCategoria) => {
        navigate('/alterarFornecedor', { state: { fornecedorID, fornecedorNome, estadoID, fornecedorTelefone, fornecedorEmail, idCategoria } });
    }

    return (
        <>
            <Container>
                <Title>Fornecedores Cadastrados</Title>
                <Table border={1}>
                    <thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Nome</Th>
                            <Th>Estado</Th>
                            <Th>Telefone</Th>
                            <Th>Email</Th>
                            <Th>Categoria</Th>
                            <Th>Ação</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedores.map((fornecedor, index) => (
                            <tr key={index}>
                                <Td>{fornecedor.fornecedorID}</Td>
                                <Td>{fornecedor.fornecedorNome}</Td>
                                <Td>{fornecedor.estadoNome}</Td>
                                <Td>{fornecedor.fornecedorTelefone}</Td>
                                <Td>{fornecedor.fornecedorEmail}</Td>
                                <Td>{fornecedor.nomeCategoria}</Td>
                                <Td>
                                    <AcaoButton onClick={() => confirmarExclusao(fornecedor)}>
                                        Excluir
                                    </AcaoButton>
                                    <AcaoButton onClick={() => editarFornecedor(fornecedor.fornecedorID, fornecedor.fornecedorNome, fornecedor.estadoID, fornecedor.fornecedorTelefone, fornecedor.fornecedorEmail, fornecedor.idCategoria)}>
                                        Editar
                                    </AcaoButton>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {isModalOpen && (
                <ModalContainer>
                    <ModalContent style={modalStyle}>
                        <p>{modalMessage}</p>
                        <div>
                            <AcaoButton onClick={deletarFornecedor}>Confirmar</AcaoButton>
                            <AcaoButton onClick={handleCloseModal}>Cancelar</AcaoButton>
                        </div>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
}

export default TabelaFornecedor;
