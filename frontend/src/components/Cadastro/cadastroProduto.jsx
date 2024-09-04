import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFornecedores, registerSupplier } from '../../services/authService';

function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState('');
    const [fornecedor, setFornecedor] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const fornecedor = await getFornecedores();
                setFornecedor(fornecedor);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        };

        fetchFornecedores();
    }, []);

    // const enviarDados = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const data = await registerSupplier(nome, estado, telefone, email, categoriaSelecionada);

    //         if (data.sucess) {
    //             alert('Cadastro realizado!');
    //         } else {
    //             alert('Erro: ' + data.message);
    //         }
    //     } catch (error) {
    //         console.error('Erro ao enviar os dados:', error);
    //     }
    // };

    return (
        <div>
            <h1>Cadastro Produto</h1>
            {/* onSubmit={enviarDados} */}
            <form >
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>Quantidade</label>
                <input
                    type="text"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />
                <label>Preço</label>
                <input
                    type="text"
                    name="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <label>Imagem</label>
                <input
                    type="file"
                    name="imagem"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                />
                <label>Fornecedor</label>
                <select
                    name="fornecedor"
                    value={fornecedorSelecionado}
                    onChange={(e) => setFornecedorSelecionado(e.target.value)}
                >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedor.map((fornecedor) => (
                        <option key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                            {fornecedor.fornecedorNome}
                        </option>
                    ))}
                </select>
                <button type="submit">Cadastrar</button>
            </form>
            <Link to={"/"}>Início</Link>
        </div>
    );
}

export default CadastroProduto;
