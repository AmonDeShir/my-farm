import React from "react";
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme, ThemeProps } from './theme';
import Background from "../components/background/Background";
import Navigation from "../components/navigation/Navigation";
import { Global, css, InterpolationWithTheme } from "@emotion/core";

const GlobalStyle = {
  "body": {
    "padding": 0,
    "margin": 0,
    "fontFamily": `"Roboto", serif`,
    "color": `white`,
    "width": "100%",
    "height": "100%",
    "minHeight": "100vh"
  },

  "*, *::before, *::after": {
    "boxSizing": " border-box"
  },

  "input:focus, textarea:focus, select:focus": {
    "outline": "none"
  }
};

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
        <Global styles={GlobalStyle as InterpolationWithTheme<any>}/>
        <Navigation />
        <Container>
          {children}
        </Container>
      </Router>
    </Background>
  </ThemeProvider>
);

export default Layout;