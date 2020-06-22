import { ThemeProps } from "../../layout/theme"
import styled from "@emotion/styled";

type Props = ThemeProps & {
  width: string;
  height: string;
  marginLeft?:boolean;
}


const Panel = styled.div`
  width: ${(props: Props) => props.width};
  height: ${(props: Props) => props.height};
  background-color: ${(props: Props) => props.theme.colors.second_background};
  box-shadow: ${(props: Props) => props.theme.shadow};

  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: ${(props: Props) => props.marginLeft ? "10px" : "0"};

`;

export default Panel;