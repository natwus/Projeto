import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategorias, getEstados, registerSupplier } from '../../services/supplierService';
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { jwtDecode } from "jwt-decode";
import { FormContainer, FormTitle, InputField, StyledForm, StyledOption, StyledSelect, SubmitButton, Input, Label } from "../Style/FormStyle/formStyle";
import { ModalContainer, ModalContent, CloseButton } from "../Style/ModalStyle/modalStyle";

function CadastroFornecedor() {
    const [nome, setNome] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
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

    const enviarDados = async (event) => {
        event.preventDefault();

        try {
            const data = await registerSupplier(nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado);

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
            navigate('/fornecedores');
        }
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Cadastro Fornecedor</FormTitle>
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
                            placeholder=""
                        />
                        <Label htmlFor="telefone">Telefone</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                        />
                        <Label htmlFor="email">E-mail</Label>
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

export default CadastroFornecedor;
