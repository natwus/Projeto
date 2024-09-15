import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPermissoes, updateUser } from '../../services/userService';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { jwtDecode } from 'jwt-decode';
import { FormContainer, FormTitle, Input, SubmitButton, Label, InputField, StyledForm, StyledOption, StyledSelect } from '../Style/FormStyle/formStyle';
import { ModalContainer, ModalContent, CloseButton } from '../Style/ModalStyle/modalStyle';

function EditarUsuario() {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuarioID, usuarioNome, usuarioUsuario, permissaoID } = location.state || {};
    const [nome, setNome] = useState(usuarioNome || '');
    const [email, setEmail] = useState(usuarioUsuario || '');
    const [senha, setSenha] = useState('');
    const [permissoes, setPermissoes] = useState([]);
    const [permissaoSelecionada, setPermissaoSelecionada] = useState(permissaoID || '')
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
        const fetchPermissoes = async () => {
            try {
                const permissao = await getPermissoes();
                setPermissoes(permissao);
            } catch (error){
                console.error('Erro ao buscar permissoes:', error);
            }
        };

        fetchPermissoes();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await updateUser(usuarioID, nome, email, senha || undefined, permissaoSelecionada, emailLogado);

            if (data.sucess) {
                setModalMessage('Usuário atualizado com sucesso!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setIsModalOpen(true);
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o usuário');
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
                <FormTitle>Editar Usuário</FormTitle>
                <StyledForm onSubmit={handleSubmit}>
                    <InputField>
                        <Input
                            type="text"
                            name="usuarioNome"
                            defaultValue={usuarioNome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <Label htmlFor='nome'>Nome:</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="email"
                            name="usuarioUsuario"
                            defaultValue={usuarioUsuario}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label htmlFor='email'>Email:</Label>
                    </InputField>

                    <InputField>
                        <Input
                            type="password"
                            name="usuarioSenha"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <Label htmlFor='senha'>Senha:</Label>
                    </InputField>

                    <Label>Permissão:</Label>
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

export default EditarUsuario;