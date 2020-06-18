import React from "react";
import styled from "styled-components";

import Panel from "../panel/panel";
import { ThemeProps } from "../../layout/theme";
import RemoveBtn from "../buttons/removeBtn";

type Props = {
  id: number;
  defaultValue: string;
  onEdit: (id: number, value: string) => void;
  onDeleteBtnClicked: (id: number) => void;
}

const StyledPanel = styled(Panel)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 25px;
  margin: 0px;
  padding: 0px;
  
  font-size: ${(props: ThemeProps) => props.theme.font.normal};
  color: ${(props: ThemeProps) => props.theme.colors.font};

  border-width: 0 0 1px 0;
  border-color: ${(props: ThemeProps) => props.theme.colors.font};
  background-color: ${(props: ThemeProps) => props.theme.colors.second_background};

  &:focus {
    color: ${(props: ThemeProps) => props.theme.colors.selection_color};
    border-color: ${(props: ThemeProps) => props.theme.colors.selection_color};
  }

  text-align: center;
`;


const DeletableStringViewer: React.FC<Props> = ({ defaultValue, id, onEdit, onDeleteBtnClicked }) => (
  <StyledPanel width="280px" height="40px">
    <Input
      defaultValue={defaultValue}
      onChange={(event) => onEdit(id, event.target.value)}
    />
    <RemoveBtn onClick={() => onDeleteBtnClicked(id)}/>
  </StyledPanel>
)

export default DeletableStringViewer
