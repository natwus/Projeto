import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContainer, FormTitle, Input, SubmitButton, InputField, StyledForm } from '../Style/FormStyle/formStyle';
import { ShieldIcon } from "../Style/IconStyle/iconStyle";
import { FaShieldAlt } from 'react-icons/fa';
import { ModalContainer, ModalContent, CloseButton } from "../Style/ModalStyle/modalStyle";


function MFA() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const codigo = location.state?.codigo || '';
    // Estados separados para cada input
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    // Estado e funções do modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalStyle, setModalStyle] = useState({});

    const VerificarCodigo = (e) => {
        e.preventDefault();
        const verifica = input1 + input2 + input3 + input4 + input5 + input6;

        if (codigo === verifica) {
            setModalMessage('Código verificado com sucesso!');
            setModalStyle({ backgroundColor: '#83e509', color: 'white' });
            setIsModalOpen(true);
        } else {
            setModalMessage('O código não confere!');
            setModalStyle({ backgroundColor: '#ff0000', color: 'white' });
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (modalStyle.backgroundColor === '#83e509') {
            navigate('/inicio', { state: { email } });
        }
    };

    // Função handleChange atualizada
    const handleChange = (e, currentInput, previousInput, nextInput, setInput) => {
        const value = e.target.value;

        // Impede mais de 1 caractere
        if (value.length > 1) return;

        setInput(value);

        // Foca no próximo input se um valor for inserido
        if (value !== '' && nextInput) {
            nextInput.focus();
        }
        
        // Foca no input anterior ao deletar (se valor for vazio e tiver input anterior)
        if (value === '' && previousInput) {
            previousInput.focus();
        }
    };

    return (
        <>
            <FormContainer>
                <FormTitle>Verifique que é você</FormTitle>
                <StyledForm onSubmit={VerificarCodigo}>
                    <ShieldIcon>
                        <FaShieldAlt size={50} color="#ff0000" />
                    </ShieldIcon>
                    <p style={{textAlign: 'center', paddingBottom: '10px'}}>Foi enviado para o email {email} um código de verificação</p>
                    <InputField>
                        <Input
                            type="text"
                            maxLength="1"
                            value={input1}
                            onChange={(e) => handleChange(e, document.getElementById("input1"), null, document.getElementById("input2"), setInput1)}
                            id="input1"
                            style={{ width: '40px', textAlign: 'center' }}
                            placeholder=""
                        />
                        <Input
                            type="text"
                            maxLength="1"
                            value={input2}
                            onChange={(e) => handleChange(e, document.getElementById("input2"), document.getElementById("input1"), document.getElementById("input3"), setInput2)}
                            id="input2"
                            style={{ width: '40px', textAlign: 'center' }}
                            placeholder=""
                        />
                        <Input
                            type="text"
                            maxLength="1"
                            value={input3}
                            onChange={(e) => handleChange(e, document.getElementById("input3"), document.getElementById("input2"), document.getElementById("input4"), setInput3)}
                            id="input3"
                            style={{ width: '40px', textAlign: 'center' }}
                            placeholder=""
                        />
                        <Input
                            type="text"
                            maxLength="1"
                            value={input4}
                            onChange={(e) => handleChange(e, document.getElementById("input4"), document.getElementById("input3"), document.getElementById("input5"), setInput4)}
                            id="input4"
                            style={{ width: '40px', textAlign: 'center' }}
                            placeholder=""
                        />
                        <Input
                            type="text"
                            maxLength="1"
                            value={input5}
                            onChange={(e) => handleChange(e, document.getElementById("input5"), document.getElementById("input4"), document.getElementById("input6"), setInput5)}
                            id="input5"
                            style={{ width: '40px', textAlign: 'center' }}
                            placeholder=""
                        />
                        <Input
                            type="text"
                            maxLength="1"
                            value={input6}
                            onChange={(e) => handleChange(e, document.getElementById("input6"), document.getElementById("input5"), null, setInput6)} // Último input sem próximo campo
                            id="input6"
                            style={{ width: '40px', textAlign: 'center' }}
                            placeholder=""
                        />
                    </InputField>
                    <SubmitButton type="submit">Verificar Código</SubmitButton>
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

export default MFA;
