import styled from '@emotion/styled'
import React, { useState } from "react";
import { ThemeProps } from "../../layout/theme";

type Props = {
  description: string;
  onEdit: (text: number) => void;
  values: {key:number, value:string}[];
  defaultValue: number;
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

const StyledSelect = styled.select`
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

const Combobox: React.FC<Props> = ({defaultValue, description, values, onEdit }) => {
  const [value, setValue] = useState(() => (defaultValue));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(event.target.value);
    console.log("-1", newValue, event.target.value)


    setValue(newValue);

    if (onEdit)
      onEdit(newValue);
  };

  return (
    <Container>
      <DescriptionContainer>
        <Description>{description}</Description>
      </DescriptionContainer>
      <StyledSelect value={value} onChange={handleChange}>
        {values.map((data) =>
          <option key={data.key} value={data.key}>{data.value}</option>
        )}
      </StyledSelect>
    </Container>
  )
};

export default Combobox;