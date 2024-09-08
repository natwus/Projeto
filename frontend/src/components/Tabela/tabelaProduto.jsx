import { useEffect, useState } from "react";
import { getProducts, delProduct } from "../../services/productService";
import { Link, useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";

function TabelaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

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

    const deletarProduto = async (produtoID) => {
        try {
            await delProduct(produtoID);
            alert('Produto excluído com sucesso!');
            setProdutos(produtos.filter(produto => produto.produtoID !== produtoID));
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto');
        }
    };

    const editarProduto = (produtoID, produtoNome, produtoQuantidade, produtoPreco, fornecedorNome, fornecedorID) => {
        navigate('/alterarProduto', { state: { produtoID, produtoNome, produtoQuantidade, produtoPreco, fornecedorNome, fornecedorID } });
    }

    return (
        <div>
            <h1>Produtos Cadastrados</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Imagem</th>
                        <th>Fornecedor</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, index) => (
                        <tr key={index}>
                            <td>{produto.produtoID}</td>
                            <td>{produto.produtoNome}</td>
                            <td>{produto.produtoQuantidade}</td>
                            <td>{produto.produtoPreco}</td>
                            <td>
                                <img
                                    src={`http://localhost:3001/uploads/${produto.produtoImagem}`}
                                    alt={produto.produtoNome}
                                    width="100"
                                />
                            </td>
                            <td>{produto.fornecedorNome}</td>
                            <td>
                                <button onClick={() => deletarProduto(produto.produtoID)}>
                                    Excluir
                                </button>
                                <button onClick={() => editarProduto(produto.produtoID, produto.produtoNome, produto.produtoQuantidade, produto.produtoPreco, produto.produtoImagem, produto.fornecedorNome, produto.fornecedorID,)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/inicio">Início</Link>
        </div>
    );
}

export default TabelaProdutos;
