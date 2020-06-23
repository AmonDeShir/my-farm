import styled from "@emotion/styled";
import { ThemeProps } from "../../layout/theme";
import React from 'react'
import LabelTextbox from "../textbox/labelTextbox";
import { css } from "@emotion/core";

type LabelProps = ThemeProps & {
  absoluteToLeft?: boolean;
  width?:string;
  height?:string;
  marginLeft?:string;
};

const AmountLabel = styled.div`
  text-align: left;

  ${(props:LabelProps) => props.width ? `width: ${props.width};` : ""}
  height: ${(props:LabelProps) => props.height ? props.height : "20px"};

  display: flex;
  align-items: center;

  font-size: ${(props: LabelProps) => props.theme.font.normal};
  
  ${(props: LabelProps) => props.absoluteToLeft ? css`
    position: absolute;
    left: 10px;
    top: calc(50% - 10px);
  `:""};

  margin-left: ${(props:LabelProps) => props.marginLeft ? props.marginLeft : "0"};
`;

const AmountLabelValue = styled.div`
  font-size: ${(props: ThemeProps) => props.theme.font.normal};
  color: ${(props: ThemeProps) => props.theme.colors.selection_color};
  width: 80px;
  margin-left: 5px;
`;


type Props = {
  description: string;
  value: string;

  absoluteToLeft?: boolean;
  height?: string;
  width?: string;
  marginLeft?:string;
}

const ValueLabel: React.FC<Props> = ({marginLeft, width, height, description, value, absoluteToLeft }) => (
  <AmountLabel marginLeft={marginLeft} width={width} height={height} absoluteToLeft={absoluteToLeft}>
    {description}<AmountLabelValue>{value}</AmountLabelValue>
  </AmountLabel>
);

export default ValueLabel;