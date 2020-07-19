import styled from '@emotion/styled'
import React, { useState, useEffect } from "react";
import { ThemeProps } from "../../layout/theme";

type Props = {
  description: string;
  onEdit: (text: string) => void;
  defaultValue: string;
  onlyNumbers?: boolean;
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

const Textbox: React.FC<Props> = ({ onlyNumbers, description, onEdit, defaultValue }) => {
  const [value, setValue] = useState(() => (defaultValue ? defaultValue : ""));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (onlyNumbers)
      newValue = removeAllNoNumericValues(newValue)

    setValue(newValue)

    if (onEdit)
      onEdit(newValue);
  };


  const removeAllNoNumericValues = (newValue: string) => {
    let fixedValue = newValue.replace(/[,]/g, '.');

    if (fixedValue.length <= 2)
      fixedValue = fixedValue.replace(/[^\d.]/g, '');

    if (!isNaN(Number(fixedValue)))
      return fixedValue;
    else
      return newValue;
  }


  useEffect(() => {   
    if(value !== defaultValue){
      setValue(defaultValue);
    }
  });

  return (
    <Container>
      <DescriptionContainer>
        <Description>{description}</Description>
      </DescriptionContainer>
      <StyledInput
        type="text"
        placeholder="Brak"
        onChange={handleChange}
        value={value}
      />
    </Container>
  )
};

export default Textbox;