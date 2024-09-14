import styled from 'styled-components';

// Estilos da Sidebar
export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #363636;
  color: white;
  height: 100%;
  position: fixed;
  top: 40px; /* Ajustar conforme a altura do seu header */
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding-top: 20px;
  box-shadow: ${({ isOpen }) => (isOpen ? '2px 0 10px rgba(0, 0, 0, 0.2)' : 'none')};
  align-items: center;
`;

// Estilos dos Botões dentro da Sidebar
export const SidebarButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #ff6347;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Efeito de hover */
  }

  &:focus {
    outline: none;
  }
`;

// Estilos dos Botões Dropdown
export const DropdownButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #1c1c1c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Efeito de hover */
  }

  &:focus {
    outline: none;
  }
`;

// Estilos do Overlay
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

// Estilo para a seção do Footer (Sair/Documentação)
export const FooterSidebar = styled.div`
  position: fixed;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
