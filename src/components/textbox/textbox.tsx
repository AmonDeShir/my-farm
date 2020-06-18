import styled from "styled-components";
import React from "react";
import { ThemeProps } from "../../layout/theme";

type Props = {
  description: string;
  onEdit: (text: string) => void;
  defaultValue: string;
};

const Container = styled.div`
  width: 265px;
  height: 35px;
  display: flex;

  justify-content: space-around;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width:92px;
  height: 100%;
`;

const Description = styled.p`
  font-size: ${(props: ThemeProps) => props.theme.font.normal};
  text-align: center;
  margin: 0px;
`;

const StyledInput = styled.input`
  width: 158px;
  height: 100%;

  border-width: 0 0 1px 0;
  border-color: ${(props: ThemeProps) => props.theme.colors.font};
  background-color: ${(props: ThemeProps) => props.theme.colors.second_background};

  color: ${(props: ThemeProps) => props.theme.colors.font};
  text-align: center;

  &:focus {
    color: ${(props: ThemeProps) => props.theme.colors.selection_color};
    border-color: ${(props: ThemeProps) => props.theme.colors.selection_color};
  }
`;

const Textbox: React.FC<Props> = ({ description, onEdit, defaultValue }) => (
  <Container>
    <DescriptionContainer>
      <Description>{description}</Description>
    </DescriptionContainer>
    <StyledInput
      onChange={(event) => onEdit(event.target.value)}
      defaultValue={defaultValue}
    />
  </Container>
);

export default Textbox;