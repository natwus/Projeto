import { useEffect, useState } from "react";
import { getProducts } from "../../services/authService";
import { Link } from "react-router-dom";
import { delProd } from "../../services/delService";

function TabelaProdutos() {
    const [produtos, setProdutos] = useState([]);

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
            await delProd(produtoID);
            alert('Produto excluído com sucesso!');
            setProdutos(produtos.filter(produto => produto.produtoID !== produtoID));
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto');
        }
    };

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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Início</Link>
        </div>
    );
}

export default TabelaProdutos;
