import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPermissoes, registerUser } from '../../services/userService';
import { jwtDecode } from "jwt-decode";
import zxcvbn from 'zxcvbn';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormContainer, FormTitle, Input, SubmitButton, StyledOption, StyledSelect, Label, InputField, StyledForm, SenhaButton } from '../Style/FormStyle/formStyle';
import { ModalContainer, ModalContent, CloseButton } from "../Style/ModalStyle/modalStyle";

function Cadastro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaForte, setSenhaForte] = useState(false);
    const [senhaFeedback, setSenhaFeedback] = useState('');
    const [permissoes, setPermissoes] = useState([]);
    const [permissaoSelecionada, setPermissaoSelecionada] = useState('')
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalStyle, setModalStyle] = useState({});

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        const fetchPermissoes = async () => {
            try {
                const permissao = await getPermissoes();
                setPermissoes(permissao);
            } catch (error) {
                console.error('Erro ao buscar permissoes:', error);
            }
        };

        fetchPermissoes();
    }, [])

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id
    }

    const possuiLetraMaiuscula = (senha) => {
        const regexMaiuscula = /[A-Z]/;
        return regexMaiuscula.test(senha);
    };

    const possuiCaractereEspecial = (senha) => {
        const regexEspecial = /[^a-zA-Z0-9]/;
        return regexEspecial.test(senha);
    };

    const validarSenha = (senha) => {
        const result = zxcvbn(senha);
        let feedback = '';

        if (senha.length < 8) {
            feedback = 'A senha deve ter pelo menos 8 caracteres.';
        } else if (!possuiLetraMaiuscula(senha)) {
            feedback = 'A senha deve conter pelo menos uma letra maiúscula.';
        } else if (!possuiCaractereEspecial(senha)) {
            feedback = 'A senha deve conter pelo menos um caractere especial.';
        } else if (result.score >= 3) {
            feedback = 'Senha forte!';
        }

        setSenhaForte(result.score >= 3 && possuiLetraMaiuscula(senha) && possuiCaractereEspecial(senha));
        setSenhaFeedback(feedback);
    };

    const enviarDados = async (event) => {
        event.preventDefault();

        if (senhaForte) {
            try {
                const data = await registerUser(nome, email, senha, permissaoSelecionada, emailLogado);

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
        } else {
            setModalMessage('A senha deve ser forte!');
            setModalStyle({ backgroundColor: '#ffc107', color: 'white' });
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (modalStyle.backgroundColor === '#83e509') {
            navigate('/usuarios');
        }
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Cadastro Usuário</FormTitle>
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
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                        />
                        <Label htmlFor="email">Email</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            name="senha"
                            value={senha}
                            onChange={(e) => {
                                setSenha(e.target.value);
                                validarSenha(e.target.value);
                            }}
                            placeholder=""
                        />
                        <Label htmlFor="senha">Senha</Label>
                        <SenhaButton
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </SenhaButton>
                    </InputField>
                    {senha && (
                        <div style={{ display: 'flex', textAlign: 'center', marginBottom: '20px'}}>
                            <p style={{ color: senhaForte ? 'green' : 'red' }}>
                                {senhaFeedback}
                            </p>
                        </div>
                    )}

                    <Label>Permissão</Label>
                    <StyledSelect
                        name="permissao"
                        value={permissaoSelecionada}
                        onChange={(e) => setPermissaoSelecionada(e.target.value)}
                    >
                        <StyledOption value="">Selecione a permissão</StyledOption>
                        {permissoes.map((permissao) => (
                            <StyledOption key={permissao.permissaoID} value={permissao.permissaoID}>
                                {permissao.permissaoNome}
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

export default Cadastro;
