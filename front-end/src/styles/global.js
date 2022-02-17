import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100vh;
  }

  * {
    background-color: ${({ theme }) => theme.background};
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
  }
`;

export default GlobalStyle;
