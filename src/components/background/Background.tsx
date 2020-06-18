import styled from "styled-components";

import dots from "../../assets/dots.svg";
import { ThemeProps } from "../../layout/theme";

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-image: url(${dots});
  background-color: ${(props: ThemeProps) => props.theme.colors.main_background};
`;

export default Background;