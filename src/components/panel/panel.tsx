import { ThemeProps } from "../../layout/theme"
import styled from "@emotion/styled";
import { css } from "@emotion/core";

type Props = ThemeProps & {
  width: string;
  height: string;
  marginLeft?: boolean;
  clickable?: boolean;
}


const Panel = styled.div`
  width: ${(props: Props) => props.width};
  height: ${(props: Props) => props.height};
  background-color: ${(props: Props) => props.theme.colors.second_background};
  box-shadow: ${(props: Props) => props.theme.shadow};

  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: ${(props: Props) => props.marginLeft ? "10px" : "0"};

  ${(props: Props) => props.clickable ? css`
    &:hover{
      cursor:pointer;
    }

    &:active {
      transform: scaleY(0.99);
      transform: scaleX(0.98);
    }
  `:""}
`;

export default Panel;