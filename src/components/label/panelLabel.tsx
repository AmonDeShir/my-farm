import styled from "styled-components"
import React from 'react'
import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";

type Props = {
  largeFont?:boolean
}

type LabelProps = ThemeProps & Props;

const Label = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 280px;
  height: 40px;
  margin: 0px;
  padding: 0px; 
  
  font-size: ${(props: LabelProps) => props.largeFont ?  props.theme.font.extra_large : props.theme.font.medium};
`;

const PanelLabel: React.FC<Props> = ({ children, largeFont}) => {
  return (
    <Panel width="280px" height="40px">
      <Label largeFont={largeFont}>{children}</Label>
    </Panel>
  )
}

export default PanelLabel
