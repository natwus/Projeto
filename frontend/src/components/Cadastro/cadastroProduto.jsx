import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFornecedores } from '../../services/supplierService'
import { registerProduct } from '../../services/productService'
import useSessionTimeout from '../../hooks/useSessionTimeout'
import { jwtDecode } from "jwt-decode";
import { FormContainer, FormTitle, Input, SubmitButton, StyledSelect, Label, InputField, StyledForm, StyledOption } from '../Style/FormStyle/formStyle';
import { ModalContainer, ModalContent, CloseButton } from "../Style/ModalStyle/modalStyle";

function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [fornecedor, setFornecedor] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
    const navigate = useNavigate();
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
                setFornecedor(fornecedor);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        };

        fetchFornecedores();
    }, []);

    const enviarDados = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('quantidade', quantidade);
        formData.append('preco', preco);
        formData.append('imagem', imagem);
        formData.append('fornecedorSelecionado', fornecedorSelecionado);
        formData.append('emailLogado', emailLogado);

        try {
            const data = await registerProduct(formData);

            if (data.sucess) {
                setModalMessage('Cadastro realizado!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setIsModalOpen(true);
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (modalStyle.backgroundColor === '#83e509') {
            navigate('/produtos');
        }
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Cadastro Produto</FormTitle>
                <StyledForm onSubmit={enviarDados}>
                    <InputField>
                        <Input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder=""
                        />
                        <Label htmlFor="nome">Nome</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="text"
                            name="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder=""
                        />
                        <Label htmlFor="quantidade">Quantidade</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            placeholder=""
                        />
                        <Label htmlFor="preco">Preço</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="file"
                            name="imagem"
                            accept="image/*"
                            onChange={(e) => setImagem(e.target.files[0])}
                        />
                    </InputField>

                    <Label>Fornecedor</Label>
                    <StyledSelect
                        name="fornecedor"
                        value={fornecedorSelecionado}
                        onChange={(e) => setFornecedorSelecionado(e.target.value)}
                    >
                        <StyledOption value="">Selecione um fornecedor</StyledOption>
                        {fornecedor.map((fornecedor) => (
                            <StyledOption key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                                {fornecedor.fornecedorNome} - {fornecedor.nomeCategoria}
                            </StyledOption>
                        ))}
                    </StyledSelect>
                    <SubmitButton type="submit">Cadastrar</SubmitButton>
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

export default CadastroProduto;
