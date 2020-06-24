import styled from '@emotion/styled'
import React from 'react'
import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";
import BlueLabel from '../label/blueLabel';

type Props = {
  onClick: () => void;
}



const BlueBtn: React.FC<Props> = ({children, onClick}) => {
  return (
    <Panel clickable  width="280px" height="40px" onClick={onClick}>
      <BlueLabel>{children}</BlueLabel>
    </Panel>
  )
}

export default BlueBtn
