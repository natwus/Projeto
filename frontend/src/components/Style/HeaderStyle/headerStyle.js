import styled from 'styled-components';

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

export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
  margin: 0;
`;

export const MenuButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
`;