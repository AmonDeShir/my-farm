import styled from "@emotion/styled";
import { ThemeProps } from "../../layout/theme";
import { css } from "@emotion/core";

type LabelProps = ThemeProps & {
  absoluteToLeft?: boolean;
};

const BlueLabel = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 280px;
  height: 40px;
  margin: 0px;
  padding: 0px; 
  
  font-size: ${(props: LabelProps) => props.theme.font.normal};
  color: ${(props: LabelProps) => props.theme.colors.selection_color};

  ${(props: LabelProps) => props.absoluteToLeft ? css`
    position: absolute;
    left: 10px;
    width: 40px;
  `:""};
`;

export default BlueLabel;