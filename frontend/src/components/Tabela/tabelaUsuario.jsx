import { useState, useEffect } from 'react';
import { getUsers, delUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { jwtDecode } from 'jwt-decode';
import { AcaoButton, Container, Table, Th, Td } from "../Style/TableStyle/tableStyle";
import { Title } from "../Style/HeaderStyle/headerStyle";
import { ModalContainer, ModalContent } from '../Style/ModalStyle/modalStyle';

function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [usuarioIDParaExcluir, setUsuarioIDParaExcluir] = useState(null);
    const [usuarioNomeParaExcluir, setUsuarioNomeParaExcluir] = useState('');
    const [usuarioUsuarioParaExcluir, setUsuarioUsuarioParaExcluir] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalStyle, setModalStyle] = useState({});

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id;
    }

    useSessionTimeout();

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const data = await getUsers();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error);
            }
        }

        fetchUsuarios();
    }, []);

    const confirmarExclusao = (usuario) => {
        setUsuarioIDParaExcluir(usuario.usuarioID);
        setUsuarioNomeParaExcluir(usuario.usuarioNome);
        setUsuarioUsuarioParaExcluir(usuario.usuarioUsuario);
        setModalMessage('Você tem certeza que deseja excluir este usuário?');
        setModalStyle({ backgroundColor: '#ffc107', color: 'black' });
        setIsModalOpen(true);
    };

    const deletarUsuario = async () => {
        if (!usuarioIDParaExcluir) return;

        try {
            const data = await delUser(usuarioIDParaExcluir, emailLogado, usuarioNomeParaExcluir, usuarioUsuarioParaExcluir);

            if (data.sucess) {
                setModalMessage('Usuário excluído com sucesso!');
                setModalStyle({ backgroundColor: '#83e509', color: 'white' });
                setUsuarios(usuarios.filter(usuario => usuario.usuarioID !== usuarioIDParaExcluir));
            } else {
                setModalMessage('Erro: ' + data.message);
                setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir usuário');
        } finally {
            setIsModalOpen(false);
            setUsuarioIDParaExcluir(null);
            setUsuarioNomeParaExcluir('');
            setUsuarioUsuarioParaExcluir('');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const editarUsuario = (usuarioID, usuarioNome, usuarioUsuario, permissaoID) => {
        navigate('/alterarUsuario', { state: { usuarioID, usuarioNome, usuarioUsuario, permissaoID } });
    };

    return (
        <>
            <Container>
                <Title>Usuários Cadastrados</Title>
                <Table border={1}>
                    <thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>Permissão</Th>
                            <Th>Ação</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.usuarioID}>
                                <Td>{usuario.usuarioID}</Td>
                                <Td>{usuario.usuarioNome}</Td>
                                <Td>{usuario.usuarioUsuario}</Td>
                                <Td>{usuario.permissaoNome}</Td>
                                <Td>
                                    <AcaoButton onClick={() => confirmarExclusao(usuario)}>
                                        Excluir
                                    </AcaoButton>
                                    <AcaoButton onClick={() => editarUsuario(usuario.usuarioID, usuario.usuarioNome, usuario.usuarioUsuario, usuario.permissaoID)}>
                                        Editar
                                    </AcaoButton>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {isModalOpen && (
                <ModalContainer>
                    <ModalContent style={modalStyle}>
                        <p>{modalMessage}</p>
                        <div>
                            <AcaoButton onClick={deletarUsuario}>Confirmar</AcaoButton>
                            <AcaoButton onClick={handleCloseModal}>Cancelar</AcaoButton>
                        </div>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
}

export default TabelaUsuario;
