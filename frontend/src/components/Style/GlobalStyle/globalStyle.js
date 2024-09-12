import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
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