import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { ThemeProps } from "../../layout/theme";

type Props = ThemeProps & {}

const Link = styled(RouterLink)`
  color: ${(props: Props) => props.theme.colors.font};
  font-size:  ${(props: Props) => props.theme.font.normal};
  text-decoration: none;
  margin-top: 7px;

  &:hover {
    color: ${(props: Props) => props.theme.colors.selection_color};
  }
`;

export default Link;