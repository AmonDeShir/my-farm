import styled from '@emotion/styled'
import React, { useState, useEffect } from "react";
import { ThemeProps } from "../../layout/theme";

type Props = {
  description: string;
  onEdit: (text: string) => void;
  defaultValue: string;
  onlyNumbers?: boolean;
};

type StyledInputProps = ThemeProps & {
  error?: boolean;
}

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
  border-color: ${(props: StyledInputProps) => props.error ? props.theme.colors.error : props.theme.colors.font};
  background-color: ${(props: StyledInputProps) => props.theme.colors.second_background};

  color: ${(props: StyledInputProps) => props.theme.colors.font};
  text-align: center;

  &:focus {
    color: ${(props: StyledInputProps) => props.theme.colors.selection_color};
    border-color: ${(props: StyledInputProps) => props.error ? props.theme.colors.error : props.theme.colors.selection_color};
  }
`;

const Textbox: React.FC<Props> = ({ onlyNumbers, description, onEdit, defaultValue }) => {
  const [value, setValue] = useState(() => (defaultValue ? defaultValue : ""));
  const [hasError, setHasError] = useState(() => false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (onlyNumbers) {
      newValue = removeAllNoNumericValues(newValue)

      setHasError(isNaN(Number(newValue)));

      if(newValue.length === 0)
        setHasError(true);

      setValue(newValue)
    }

    if (onEdit)
      onEdit(newValue);
  };

  const removeAllNoNumericValues = (newValue: string) => {
    let fixedValue = newValue.replace(/[^0-9.-]/g, '');  
    const lastChar = fixedValue[newValue.length - 1];

    if (lastChar === "-" && newValue.length > 1)
      fixedValue = fixedValue.slice(0, -1);

    if (lastChar === "." && newValue.split(".").length > 2)
      fixedValue = fixedValue.slice(0, -1);

    if (fixedValue === "-.") {
      fixedValue = "-0.";
    }

    if (fixedValue === "-0" && value !== "-0.") {
      fixedValue = "-0.";
    }

    if (fixedValue === ".") {
      fixedValue = "0.";
    }
    
    return fixedValue;
  }

  useEffect(() => {
    if (value === defaultValue)
      return;

    if (onlyNumbers && isNaN(Number(defaultValue)))
      return;

    if (onlyNumbers && value[value.length-1] === "." && defaultValue === value.slice(0, -1))
      return;

    if (onlyNumbers && defaultValue === "0" && value === "-0.")
      return;

    if (onlyNumbers && hasError && defaultValue === "0")
      return;

    setValue(defaultValue);
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
        error={hasError}
      />
    </Container>
  )
};

export default Textbox;