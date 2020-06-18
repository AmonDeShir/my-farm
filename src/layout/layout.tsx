import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme, ThemeProps } from './theme';
import Background from "../components/background/Background";
import Navigation from "../components/navigation/Navigation";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: "Roboto", serif;
    
    color: ${(props: ThemeProps) => props.theme.colors.font};

    width: 100%;
    height: 100%;

    min-height: 100vh;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }
`;

const Container = styled.div`
  height: 100%;
  width: calc(100% - 180px - 15px);
  padding-left: calc(180px + 15px);
  padding-top: 15px;
`;

const Layout: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Background>
      <Router>
        <GlobalStyle />
        <Navigation />
        <Container>
          {children}
        </Container>
      </Router>
    </Background>
  </ThemeProvider>
);

export default Layout;