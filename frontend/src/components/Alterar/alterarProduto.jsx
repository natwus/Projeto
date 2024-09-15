import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFornecedores } from '../../services/supplierService';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { updateProduct } from '../../services/productService';
import { jwtDecode } from 'jwt-decode';
import { FormContainer, FormTitle, Input, SubmitButton, StyledSelect, Label, InputField, StyledForm, StyledOption } from '../Style/FormStyle/formStyle';
import { ModalContainer, ModalContent, CloseButton } from '../Style/ModalStyle/modalStyle';

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
                const fornecedor = await getFornecedores();
                setFornecedores(fornecedor);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        };

        fetchFornecedores();
    }, []);

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
                setModalMessage('Produto atualizado com sucesso!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setIsModalOpen(true);
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o produto');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (modalStyle.backgroundColor === '#83e509') {
            navigate('/produtos');
        }
    };

    const handleImageChange = (e) => {
        setImagem(e.target.files[0] || null);
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Editar Produto</FormTitle>
                <StyledForm onSubmit={handleSubmit}>
                    <InputField>
                        <Input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <Label htmlFor='nome'>Nome</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="number"
                            name="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                        <Label htmlFor='quantidade'>Quantidade</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />
                        <Label htmlFor='preco'>Preço</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="file"
                            name="imagem"
                            onChange={handleImageChange}
                        />
                        <Label htmlFor='imagem'>Imagem</Label>
                    </InputField>

                    <Label>Fornecedor</Label>
                    <StyledSelect
                        name="fornecedor"
                        value={fornecedorSelecionado}
                        onChange={(e) => setFornecedorSelecionado(e.target.value)}
                    >
                        <StyledOption value="">Selecione um fornecedor</StyledOption>
                        {fornecedores.map((fornecedor) => (
                            <StyledOption key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                                {fornecedor.fornecedorNome} - {fornecedor.nomeCategoria}
                            </StyledOption>
                        ))}
                    </StyledSelect>
                    <SubmitButton type="submit">Salvar</SubmitButton>
                </StyledForm>
            </FormContainer>

            {isModalOpen && (
                <ModalContainer>
                    <ModalContent style={modalStyle}>
                        <p>{modalMessage}</p>
                        <CloseButton onClick={handleCloseModal}>Fechar</CloseButton>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
}

export default EditarProduto;