import styled from '@emotion/styled'
import React from 'react'
import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";
import ValueLabel from '../label/valueLabel';

type Props = {
  amount: number
}

type LabelProps = ThemeProps;

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
  
  font-size: ${(props: LabelProps) => props.theme.font.medium};
`;

const StorageTypeViewer: React.FC<Props> = ({ children, amount }) => {
  return (
    <StyledPanel width="287px" height="40px">
      <Label>{children}</Label>
      <ValueLabel 
        description="Stan:"
        value={`${amount} ton`}
        absoluteToLeft
      />
    </StyledPanel>
  )
}

export default StorageTypeViewer
