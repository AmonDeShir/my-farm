import styled from "styled-components"
import React from 'react'
import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";

const Label = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 280px;
  height: 40px;
  margin: 0px;
  padding: 0px;
  
  font-size: ${(props: ThemeProps) => props.theme.font.medium};
`;

const PanelLabel: React.FC<{}> = ({ children }) => {
  return (
    <Panel width="280px" height="40px">
      <Label>{children}</Label>
    </Panel>
  )
}

export default PanelLabel
