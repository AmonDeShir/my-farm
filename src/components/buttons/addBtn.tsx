import styled from '@emotion/styled'
import React from "react";
import plus from "../../assets/plus.svg";
import selectedPlus from "../../assets/plus-blue.svg";
import { ThemeProps } from '../../layout/theme';

type ChildrenProps = ThemeProps & {
  small?:boolean;
}

const Icon = styled.div`
  width: ${(props: ChildrenProps) => props.small ? "42px" : "100px"};
  height: ${(props: ChildrenProps) => props.small ? "42px" : "100px"};

  box-shadow: ${(props: ChildrenProps) => props.theme.shadow};

  background-size: ${(props: ChildrenProps) => props.small ? "30px" : "70px"};
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${plus});

  border-radius: 100px;

  &:hover {
    background-image: url(${selectedPlus});
    cursor: pointer;
  }
`;

const Circle = styled.div`
  width: ${(props: ChildrenProps) => props.small ? "42px" : "100px"};
  height: ${(props: ChildrenProps) => props.small ? "42px" : "100px"};

  border-radius: 100px;
  background-color: ${(props: ChildrenProps) => props.theme.colors.second_background};
`;

type Props = {
  onClick: () => void;
  small?: boolean
}

const AddBtn:React.FC<Props> = ({onClick, small}) => (
  <Circle onClick={onClick} small={small}>
    <Icon small={small}/>
  </Circle>
);

export default AddBtn
