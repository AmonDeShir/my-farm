import styled from '@emotion/styled'
import React from 'react'
import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";
import BlueLabel from '../label/blueLabel';

const StyledPanel = styled(Panel)`
  position: relative;
`;

const Label = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 280px;
  height: 40px;
  margin: 0px;
  padding: 0px; 
  
  font-size: ${(props: ThemeProps) => props.theme.font.medium};
`;

const ClickableBlueLabel = styled(BlueLabel)`
  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scaleY(0.96);
    transform: scaleX(0.97);
  }
`;

type Props = {
  onClick: () => void;
}

const ExcelViewer: React.FC<Props> = ({ children, onClick }) => {
  return (
    <StyledPanel width="280px" height="40px" onClick={onClick}>
      <ClickableBlueLabel absoluteToLeft>Generuj</ClickableBlueLabel>
      <Label>{children}</Label>
    </StyledPanel>
  )
}

export default ExcelViewer
