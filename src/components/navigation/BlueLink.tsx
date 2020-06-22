import { Link as RouterLink } from "react-router-dom"
import styled from '@emotion/styled'
import { ThemeProps } from "../../layout/theme";

type Props = ThemeProps & {
  width?:string;
}

const BlueLink = styled(RouterLink)<Props>`
  color: ${(props: Props) => props.theme.colors.selection_color};
  font-size:  ${(props: Props) => props.theme.font.normal};
  text-decoration: none;
  text-align: center;
  margin-top: 7px;
  width: ${(props: Props) => props.width ? props.width : "initial"};

  &:hover {
    cursor: pointer;
    color: ${(props: Props) => props.theme.colors.selection_color};
  }
`;

export default BlueLink;