import styled from "styled-components";

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
width: 100%;
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