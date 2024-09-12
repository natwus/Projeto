import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enviarEmail } from "./enviarEmail";
import { fetchUserName, loginUser } from "../../services/userService";
import { FormContainer, StyledForm, FormTitle, InputField, Input, Label, SubmitButton, SenhaButton } from "../Style/FormStyle/formStyle"
import { ModalContainer, ModalContent, CloseButton } from "../Style/ModalStyle/modalStyle";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(''); // Estado para mensagem do modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle do modal
    const [modalStyle, setModalStyle] = useState({});

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCodigo(generatedCode);
    }, []);

    useEffect(() => {
        if (email) {
            const fetchNomeUsuario = async () => {
                try {
                    const data = await fetchUserName(email);

                    if (data.nome) {
                        setNome(data.nome);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o nome do usuário:', error);
                }
            };

            fetchNomeUsuario();
        }
    }, [email]);

    useEffect(() => {
        if (loginSuccess) {
            navigate('/mfa', { state: { codigo, email } });
        }
    }, [loginSuccess, navigate, codigo, email]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await loginUser(email, senha);

            if (data.usuario) {
                setModalMessage('Login bem-sucedido!');
                setModalStyle({ backgroundColor: '#B0BEC5', color: 'white' });
                setIsModalOpen(true);

                setTimeout(() => {
                    setIsModalOpen(false);

                    if (email === 'adm@sacolao.com') {
                        navigate('/inicio');
                    } else {
                        enviarEmail(nome, codigo, email);
                        setLoginSuccess(true);
                        navigate('/mfa', { state: { codigo, email } });
                    }
                }, 2000);
            } else {
                setModalMessage('Email ou senha incorretos!');
                setModalStyle({ backgroundColor: '#B0BEC5', color: 'white' });
                setIsModalOpen(true);  // Mostrar o modal de erro
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setModalMessage('Erro ao fazer login!');
            setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
            setIsModalOpen(true);  // Mostrar o modal de erro
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (loginSuccess) {
            if (email === 'adm@adm.com') {
                navigate('/inicio');
            } else {
                navigate('/mfa', { state: { codigo, email } });
            }
        }
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Login</FormTitle>
                <StyledForm onSubmit={handleLogin}>
                    <InputField>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label>Email</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <Label>Senha</Label>
                        <SenhaButton
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </SenhaButton>
                    </InputField>
                    <SubmitButton type="submit">Entrar</SubmitButton>
                </StyledForm>
            </FormContainer>

            {isModalOpen && (
                <ModalContainer>
                    <ModalContent style={modalStyle}>
                        <p>{modalMessage}</p>
                        {loginSuccess ? (
                            <CloseButton onClick={closeModal}>Continuar</CloseButton>
                        ) : (
                            <CloseButton onClick={() => setIsModalOpen(false)}>Fechar</CloseButton>
                        )}
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
}

export default Login;
