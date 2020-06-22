import styled from '@emotion/styled'
import LogoImage from "../../assets/logo.svg"

const Logo = styled.div`
  background-image: url(${LogoImage});
  background-size: cover;
  background-repeat: no-repeat;

  width: 156px;
  height: 62px;

  margin-top: 6px;
  margin-left: 12px;
`;

export default Logo;