//alterar
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategorias, getEstados, updateSupplier } from '../../services/supplierService';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { jwtDecode } from 'jwt-decode';
import { FormContainer, FormTitle, Input, SubmitButton, StyledSelect, Label, InputField, StyledForm, StyledOption } from '../Style/FormStyle/formStyle';
import { ModalContainer, ModalContent, CloseButton } from '../Style/ModalStyle/modalStyle';

function EditarFornecedor() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fornecedorID, fornecedorNome, estadoID, fornecedorTelefone, fornecedorEmail, idCategoria } = location.state || {};
    const [nome, setNome] = useState(fornecedorNome || '');
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(estadoID || '');
    const [telefone, setTelefone] = useState(fornecedorTelefone || '');
    const [email, setEmail] = useState(fornecedorEmail || '');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(idCategoria || '');
    const token = localStorage.getItem('token');
    const [modalMessage, setModalMessage] = useState(''); // Estado para mensagem do modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle do modal
    const [modalStyle, setModalStyle] = useState({});

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id
    }

    useSessionTimeout();

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const estado = await getEstados();
                setEstados(estado);
            } catch (error) {
                console.error('Erro ao buscar estados:', error);
            }
        };

        fetchEstados();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await updateSupplier(fornecedorID, nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado);

            if (data.sucess) {
                setModalMessage('Fornecedor atualizado com sucesso!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setIsModalOpen(true);
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o fornecedor');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (modalStyle.backgroundColor === '#83e509') {
            navigate('/fornecedores');
        }
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Editar Fornecedor</FormTitle>
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

                    <Label>Estado</Label>
                    <StyledSelect
                        name="estado"
                        value={estadoSelecionado}
                        onChange={(e) => setEstadoSelecionado(e.target.value)}
                    >
                        <StyledOption value="">Selecione o Estado</StyledOption>
                        {estados.map((estado) => (
                            <StyledOption key={estado.estadoID} value={estado.estadoID}>
                                {estado.estadoNome}
                            </StyledOption>
                        ))}
                    </StyledSelect>

                    <InputField>
                        <Input
                            type="text"
                            name="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                        <Label htmlFor='telefone'>Telefone</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label htmlFor='email'>E-mail</Label>
                    </InputField>

                    <Label>Categoria</Label>
                    <StyledSelect
                        name="categoria"
                        value={categoriaSelecionada}
                        onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    >
                        <StyledOption value="">Selecione uma categoria</StyledOption>
                        {categorias.map((categoria) => (
                            <StyledOption key={categoria.idCategoria} value={categoria.idCategoria}>
                                {categoria.nomeCategoria}
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

export default EditarFornecedor;