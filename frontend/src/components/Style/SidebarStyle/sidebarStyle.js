import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? '87%' : '100%')};
  width: 250px;
  height: 100vh;
  background-color: #363636;
  box-shadow: -3px 0px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  transition: right 0.3s ease-in-out;
  z-index: 2;
  margin-top: 45px;
  text-align: left;

  h3 {
    color: #fff;
  }
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  color: #fff;
  font-size: 16px;
  border-bottom: 1px solid #444;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 9px;

  &:hover {
    background-color: #FF6347;
  }
`;

export const DropdownButton = styled(SidebarButton)`
  padding-left: 30px;
  border-bottom: none;
  text-decoration: none;

  &:hover {
    background-color: #FF6347;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
`;
