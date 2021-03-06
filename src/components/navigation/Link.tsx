import { Link as RouterLink } from "react-router-dom"
import styled from '@emotion/styled'
import { ThemeProps } from "../../layout/theme";

type Props = ThemeProps & {}

const Link = styled(RouterLink)<Props>`
  color: ${(props: Props) => props.theme.colors.font};
  font-size:  ${(props: Props) => props.theme.font.normal};
  text-decoration: none;
  margin-top: 7px;

  &:hover {
    cursor: pointer;
    color: ${(props: Props) => props.theme.colors.selection_color};
  }
`;

export default Link;