import { useEffect, useState } from "react";
import { getProducts, delProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { jwtDecode } from "jwt-decode";
import { AcaoButton, Container, Table, Th, Td } from "../Style/TableStyle/tableStyle";
import { Title } from "../Style/HeaderStyle/headerStyle";
import { ModalContainer, ModalContent } from '../Style/ModalStyle/modalStyle';

function TabelaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [produtoIDParaExcluir, setProdutoIDParaExcluir] = useState(null);
    const [produtoNomeParaExcluir, setProdutoNomeParaExcluir] = useState(null);
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
        const fetchProdutos = async () => {
            try {
                const data = await getProducts();
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, []);

    const confirmarExclusao = (produto) => {
        setProdutoIDParaExcluir(produto.produtoID);
        setProdutoNomeParaExcluir(produto.produtoNome);
        setModalMessage('Você tem certeza que deseja excluir este produto?');
        setModalStyle({ backgroundColor: '#ffc107', color: 'black' });
        setIsModalOpen(true);
    };

    const deletarProduto = async (produtoID, produtoNome) => {
        if (!produtoIDParaExcluir) return;

        try {
            const data = await delProduct(produtoIDParaExcluir, emailLogado, produtoNomeParaExcluir);

            if (data.sucess) {
                setModalMessage('Produto excluído com sucesso!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setProdutos(produtos.filter(produto => produto.produtoID !== produtoIDParaExcluir));
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto');
        } finally {
            setIsModalOpen(false);
            setProdutoIDParaExcluir(null);
        }
    };

    const editarProduto = (produto) => {
        navigate('/alterarProduto', { state: { produto } });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Container>
                <Title>Produtos Cadastrados</Title>
                <Table border={1}>
                    <thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Nome</Th>
                            <Th>Quantidade</Th>
                            <Th>Preço</Th>
                            <Th>Imagem</Th>
                            <Th>Fornecedor</Th>
                            <Th>Ação</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.produtoID}>
                                <Td>{produto.produtoID}</Td>
                                <Td>{produto.produtoNome}</Td>
                                <Td>{produto.produtoQuantidade}</Td>
                                <Td>{produto.produtoPreco}</Td>
                                <Td>
                                    <img
                                        src={`http://localhost:3001/uploads/${produto.produtoImagem}`}
                                        alt={produto.produtoNome}
                                        width="100"
                                    />
                                </Td>
                                <Td>{produto.fornecedorNome}</Td>
                                <Td>
                                    <AcaoButton onClick={() => confirmarExclusao(produto)}>
                                        Excluir
                                    </AcaoButton>
                                    <AcaoButton onClick={() => editarProduto(produto)}>
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
                            <AcaoButton onClick={deletarProduto}>Confirmar</AcaoButton>
                            <AcaoButton onClick={handleCloseModal}>Cancelar</AcaoButton>
                        </div>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
}

export default TabelaProdutos;