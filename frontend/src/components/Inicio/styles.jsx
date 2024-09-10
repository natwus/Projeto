import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    display: flex;
    align-items: center; /* Alinha o conteúdo verticalmente no centro */
    justify-content: center; /* Alinha o conteúdo horizontalmente no centro */
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5; /* Altere conforme necessário */
  }

  #root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

// Estilos Header
export const HeaderContainer = styled.header`
  background-color: #363636;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  box-sizing: border-box; /* Inclui padding e borda na largura total */
`;

//Estilo titulo
export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
  margin: 0;
`;

//Estilo Botao menu (Sidebar)
export const MenuButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
`;

// Estilos Sidebar
export const SidebarContainer = styled.div`
   width: 250px;
  background-color: #363636;
  color: white;
  height: 100vh; /* Ajusta a altura para não sobrepor o header */
  position: fixed;
  align-items: center;
  top: 40px; /* Posição a partir da parte inferior do header */
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding-top: 20px; /* Espaço interno para os itens da sidebar */
`;

//Estilos Botoes dentro da sidebar
export const SidebarButton = styled.button`
 background-color: #ff0000;
  color: white;
  border: none; /* Remove a borda */
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  text-align: center; /* Centraliza o texto */
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #ff6347;
  }
`;

//Estilos Botoes Dropdown
export const DropdownButton = styled.button`
 background-color: #000;
  color: white;
  border: none; /* Remove a borda */
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  text-align: center; /* Centraliza o texto */
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #1c1c1c;
  }
`;

// Estilos Overlay (Diminuir a visibilidade do conteúdo enquanto a sidebar está aberto)
export const Overlay = styled.div`
   position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1;
`;

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
`;


//Estilos Labels
export const Label = styled.label`
  position: absolute;
  color: #8d8d8d;
  pointer-events: none;
  background-color: transparent;
  top: 0px;
  left: 20px;
  transform: translateY(0.9rem);
  transition: all 0.3s ease;
`;

//Estilo Inputs
export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
  margin-left: 10px;

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
  width: 93%;
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
  width: calc(100% - 20px); /* Ajusta a largura do select */
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  appearance: none; /* Remove a aparência padrão do select */
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

//Estilos Consulta Usuario
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  color: #363636;
  text-align: center;
`;

//Estilos Table
export const Table = styled.table`
width: 500px;
border-collapse: collapse;
background-color: #fff;
border: 1px solid #ddd;
border-radius: 10px;
`;

//Estilos Th (table head)
export const Th = styled.th`
background-color: #FF6347;
color: #fff;
padding: 9px;
border: 1px solid #ddd;
`;

//Estilos Td (table linha)
export const Td = styled.td`
text-align: center;
border: 1px solid #ddd;
color: #363636;
padding: 10px;
`;

//Estilos Botoes Acao
export const AcaoButton = styled.button`
background-color: #FF0000;
color: #fff;
border: none;
padding: 5px 8px;
cursor: pointer;
transition: background-color 0.3s ease;
border-radius: 4px;
margin-top: 14px;
margin-bottom: 10px;
margin:5px;

&:hover {
    background-color: #FF6347;
}
`;