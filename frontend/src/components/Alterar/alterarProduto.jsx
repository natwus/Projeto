import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFornecedores } from '../../services/supplierService';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { updateProduct } from '../../services/productService';
import { jwtDecode } from 'jwt-decode';

function EditarProduto() {
    const navigate = useNavigate();
    const location = useLocation();
    const { produto } = location.state || {};
    const [nome, setNome] = useState(produto?.produtoNome || '');
    const [quantidade, setQuantidade] = useState(produto?.produtoQuantidade || '');
    const [preco, setPreco] = useState(produto?.produtoPreco || '');
    const [imagem, setImagem] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(produto?.fornecedorID || '');
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
            const formData = new FormData();
            formData.append('id', produto.produtoID);
            formData.append('nome', nome);
            formData.append('quantidade', quantidade);
            formData.append('preco', preco);
            formData.append('emailLogado', emailLogado);
            if (imagem) formData.append('imagem', imagem);
            formData.append('fornecedorSelecionado', fornecedorSelecionado);

            const data = await updateProduct(formData);

            if (data.sucess) {
                alert('Produto atualizado com sucesso!');
                navigate('/produtos');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o produto');
        }
    };


    const handleImageChange = (e) => {
        setImagem(e.target.files[0] || null);
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
                    type="number"
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
                    onChange={handleImageChange}
                />
                <label>Fornecedor</label>
                <select
                    name="fornecedor"
                    value={fornecedorSelecionado}
                    onChange={(e) => setFornecedorSelecionado(e.target.value)}
                >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                            {fornecedor.fornecedorNome} - {fornecedor.nomeCategoria}
                        </option>
                    ))}
                </select>
                <button type="submit">Salvar</button>
            </form>
            <button onClick={handleVoltar}>Voltar</button>
        </div>
    );
}

export default EditarProduto;