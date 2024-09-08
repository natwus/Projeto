import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFornecedores, updateSupplier } from '../../services/supplierService';
import useSessionTimeout from '../../hooks/useSessionTimeout';

function EditarFornecedor() {
    const navigate = useNavigate();
    const location = useLocation();
    const { produtoID, produtoNome, produtoQuantidade, produtoPreco, fornecedorID } = location.state || {};
    const [nome, setNome] = useState(produtoNome || '');
    const [quantidade, setQuantidade] = useState(produtoQuantidade || '');
    const [preco, setPreco] = useState(produtoPreco || '');
    const [imagem, setImagem] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(fornecedorID || '');

    useSessionTimeout();

    useEffect(() => {
        setNome(produtoNome || '');
        setQuantidade(produtoQuantidade || '');
        setPreco(produtoPreco || '');
        setImagem('');
        setFornecedorSelecionado(fornecedorID || '');
        console.log(produtoID, produtoNome, produtoQuantidade, produtoPreco, fornecedorID);
    }, [produtoNome, produtoQuantidade, produtoPreco, fornecedorID]);

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const fornecedor = await getFornecedores();
                setFornecedores(fornecedor);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        };

        fetchFornecedores();
    }, []);

    const handleVoltar = () => {
        navigate(-1); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSupplier(produtoID, nome, quantidade, preco, imagem, fornecedorSelecionado);
            alert('Produto atualizado com sucesso!');
            navigate('/produtos');
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o produto');
        }
    };

    return (
        <div>
            <h1>Editar Produto</h1>
            <form onSubmit={handleSubmit}>
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
                    name="categoria"
                    value={fornecedorSelecionado}
                    onChange={(e) => setFornecedorSelecionado(e.target.value)}
                >
                    <option value="">Selecione uma fornecedor</option>
                    {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                            {fornecedor.fornecedorNome}- {fornecedor.nomeCategoria}
                        </option>
                    ))}
                </select>
                <button type="submit">Salvar</button>
            </form>
            <button onClick={handleVoltar}>Voltar</button>
        </div>
    );
}

export default EditarFornecedor;