import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    overflow-x: hidden; /* Previne o overflow horizontal em telas pequenas */
  }

  #root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px; /* Adiciona um espaçamento extra */
  }

  /* Responsividade para dispositivos móveis */
  @media (max-width: 768px) {
    body, html {
      justify-content: flex-start; /* Ajusta o alinhamento em telas menores */
    }

    #root {
      padding: 10px; /* Reduz o padding para telas menores */
    }
  }

  @media (max-width: 480px) {
    #root {
      padding: 5px; /* Ainda menor padding para telas muito pequenas */
    }
  }
`;
