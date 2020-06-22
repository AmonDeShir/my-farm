import React from 'react'
import styled from '@emotion/styled'
import { ThemeProps } from '../../layout/theme';
import Logo from "./Logo";
import Topic from "./Topic";
import Link from './Link';

const Background = styled.div` 
  width: 180px;
  height: 100vh;
  position: fixed;

  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.9);
  background-color: ${(props: ThemeProps) => props.theme.colors.second_background};
`;


const Navigation = () => (
  <Background>
    <Logo />
    <Topic title="DANE">
      <Link to="/">Gospodarstwo</Link>
      <Link to="/fields">Pola</Link>
      <Link to="/pastures">Pastwiska</Link>
      <Link to="/crops">Uprawy</Link>
      <Link to="/">Zwierzęta</Link>
      <Link to="/">Auto Uzupełnianie</Link>
    </Topic>

    <Topic title="OPERACJE AGROTECHNICZNE">
      <Link to="/">Pola</Link>
      <Link to="/">Uprawy</Link>
      <Link to="/agrotechnicalOperations">Wszystkie</Link>
    </Topic>

    <Topic title="SKRÓTY">
      <Link to="/">Sadzenie</Link>
      <Link to="/">Zbiory</Link>
      <Link to="/">Koszenie</Link>
      <Link to="/">Oprysk</Link>
      <Link to="/">Naworzenie</Link>
    </Topic>

    <Topic title="WYPAS ZWIERZĄT">
      <Link to="/">Cykliczne</Link>
      <Link to="/">Niecykliczne</Link>
      <Link to="/">Zwierzęta</Link>
      <Link to="/">Pastwiska</Link>
      <Link to="/">Wszystkie</Link>
    </Topic>


    <Topic title="MAGAZYN">
      <Link to="/">Stan</Link>
    </Topic>

    <Topic title="EXCEL">
      <Link to="/">Kartoteki <br/> magazynowe</Link>
      <Link to="/">Rejestr <br/> działalności <br/> rolniczej</Link>
      <Link to="/">Generuj <br/> wszystko</Link>

    </Topic>


  </Background>
);

export default Navigation;