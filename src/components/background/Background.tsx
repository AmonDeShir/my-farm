import styled from "../../layout/theme";
import dots from "../../assets/dots.svg";

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-image: url(${dots});
  background-color: ${(props) => props.theme.colors.main_background};
`;

export default Background;