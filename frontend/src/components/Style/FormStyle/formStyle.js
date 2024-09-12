import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Estilos fundo do Formulario
export const FormContainer = styled.div`
  border-radius: 12px;
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//Estilo Formulario
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 20px;
`;

//Estilo Titulo do Formulario
export const FormTitle = styled.h1`
  color: #363636;
  padding: 10px;
  margin: 0 0 20px 0;
  text-align: center;
  border-radius: 4px;
  width: 100%;
`;

//Estilo Fundo do Input
export const InputField = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;


//Estilos Labels
export const Label = styled.label`
  position: absolute;
  color: #8d8d8d;
  pointer-events: none;
  background-color: transparent;
  top: 0px;
  left: 15px;
  transform: translateY(0.9rem);
  transition: all 0.3s ease;
`;

//Estilo Inputs
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:hover {
    border-color: #ee4242;
  }

  &:focus,
  &:valid {
    outline: none;
    border: solid 1px #ee4242;
  }

  &:focus ~ ${Label},
  &:valid ~ ${Label} {
    transform: translateY(-51%) translateX(-10px) scale(0.8);
    background-color: #f5f5f5;
    padding: 0 5px;
    color: #ee4242;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;

//Estilos Botoes
export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 8px;

  &:hover {
    background-color: #ff6347;
  }
`;

//Estilos Link
export const StyledLink = styled(Link)`
  display: block;
  margin-top: 15px;
  color: #363636;
  text-decoration: none;
  text-align: center;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

//Estilo Select
export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: white;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="#cccccc" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>'); /* Adiciona uma seta personalizada */
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  transition: border-color 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #ee4242;
  }

  &:focus {
    outline: none;
    border: solid 1px #ee4242;
  }
`;

//Estilos Options
export const StyledOption = styled.option`
  font-size: 16px;
  color: #363636;
`;

// //Estilo Olho da Senha
export const SenhaButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-70%);
  border: none;
  background: none;
  cursor: pointer;
  color: #ff0000;
`;
