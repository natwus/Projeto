import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategorias, updateSupplier } from '../../services/supplierService';
import useSessionTimeout from '../../hooks/useSessionTimeout';

function EditarFornecedor() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fornecedorID, fornecedorNome, fornecedorEstado, fornecedorTelefone, fornecedorEmail, idCategoria } = location.state || {};
    const [nome, setNome] = useState(fornecedorNome || '');
    const [estado, setEstado] = useState(fornecedorEstado || '');
    const [telefone, setTelefone] = useState(fornecedorTelefone || '');
    const [email, setEmail] = useState(fornecedorEmail || '');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(idCategoria || '');

    useSessionTimeout();

    useEffect(() => {
        setNome(fornecedorNome || '');
        setEstado(fornecedorEstado || '');
        setTelefone(fornecedorTelefone || '');
        setEmail(fornecedorEmail || '');
        setCategoriaSelecionada(idCategoria || '');
    }, [fornecedorNome, fornecedorEstado, fornecedorTelefone, fornecedorEmail, idCategoria]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categorias = await getCategorias();
                setCategorias(categorias);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleVoltar = () => {
        navigate(-1); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSupplier(fornecedorID, nome, estado, telefone, email, categoriaSelecionada);
            alert('Fornecedor atualizado com sucesso!');
            navigate('/fornecedores');
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o fornecedor');
        }
    };

    return (
        <div>
            <h1>Editar Fornecedor</h1>
            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>Estado</label>
                <input
                    type="text"
                    name="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
                <label>Telefone</label>
                <input
                    type="text"
                    name="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <label>E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Categoria</label>
                <select
                    name="categoria"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.nomeCategoria}
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