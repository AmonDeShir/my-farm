import styled from '@emotion/styled'
import React from 'react'
import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";

type Props = {
  largeFont?:boolean,
  margin?:boolean,
  small?:boolean
}

type LabelProps = ThemeProps & Props;

const Label = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: ${(props:Props) => props.small ? "182px" : "280px"};
  height: 40px;
  margin: 0px;
  padding: 0px; 
  
  font-size: ${(props: LabelProps) => props.largeFont ?  props.theme.font.extra_large : props.theme.font.medium};
`;

const PanelLabel: React.FC<Props> = ({ children, largeFont, margin, small}) => {
  return (
    <Panel width={small ? "182px" : "280px"} height="40px" marginLeft={margin ? true : false}>
      <Label small={small} largeFont={largeFont}>{children}</Label>
    </Panel>
  )
}

export default PanelLabel
