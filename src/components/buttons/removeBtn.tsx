import styled from "styled-components";
import remove from "../../assets/delete.svg";


const RemoveBtn = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;

  width: 27px;
  height: 27px;

  background-size: 25px 25px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${remove});

  &:hover {
    cursor: pointer;
    background-size: 27px 27px;
  }
`;

export default RemoveBtn;