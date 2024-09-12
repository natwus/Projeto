import { useEffect, useState } from "react";
import { getProducts, delProduct } from "../../services/productService";
import { Link, useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { jwtDecode } from "jwt-decode";

function TabelaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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

    const deletarProduto = async (produtoID, produtoNome) => {
        try {
            const data = await delProduct(produtoID, emailLogado, produtoNome);

            if (data.sucess) {
                alert('Produto excluído com sucesso!');
                setProdutos(produtos.filter(produto => produto.produtoID !== produtoID));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto');
        }
    };

    const editarProduto = (produto) => {
        navigate('/alterarProduto', { state: { produto } });
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
                    {produtos.map((produto) => (
                        <tr key={produto.produtoID}>
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
                                <button onClick={() => deletarProduto(produto.produtoID, produto.produtoNome)}>
                                    Excluir
                                </button>
                                <button onClick={() => editarProduto(produto)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaProdutos;