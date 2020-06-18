import styled, { css } from "styled-components"
import { ThemeProps } from "../../layout/theme"

type Props = ThemeProps & {
  width: string;
  height: string;
}


const Panel = styled.div`
  width: ${(props: Props) => props.width};
  height: ${(props: Props) => props.height};
  background-color: ${(props: Props) => props.theme.colors.second_background};
  box-shadow: ${(props: Props) => props.theme.shadow};
  
  border-radius: 10px;
`;

export default Panel;