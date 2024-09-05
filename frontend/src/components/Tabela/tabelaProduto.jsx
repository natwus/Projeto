import { useEffect, useState } from "react";
import { getProducts } from "../../services/authService";
import { Link } from "react-router-dom";

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
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Início</Link>
        </div>
    );
}

export default TabelaProdutos;
