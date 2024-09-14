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
  
  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

// Estilo do Título
export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// Estilo do Botão de Menu
export const MenuButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(9deg)' : '')};

  &:focus {
    outline: none;
  }

  /* Linhas do menu */
  span {
    display: block;
    width: 30px;
    height: 3px;
    background: #fff;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Aplica a transformação quando o estado isOpen é true */
  span:nth-child(1) {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(35deg) translateY(18px)' : '')};
  }
  span:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
  }
  span:nth-child(3) {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-55deg) translateY(-12px)' : '')};
  }

  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    width: 25px;
    height: 20px;

    span {
      width: 25px;
      height: 2.5px;
    }
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 18px;

    span {
      width: 20px;
      height: 2px;
    }
  }
`;
