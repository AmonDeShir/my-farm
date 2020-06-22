import styled from '@emotion/styled'
import { ThemeProps } from "../../layout/theme";
import React, { useState } from 'react';

type Props = {
  "no-border"?: boolean;
  "large-font"?: boolean;
  "value"?:string;
  "onChange": (value:string) => void;
}

type StyledInputProps = ThemeProps & {
  "no-border"?: boolean;
  "large-font"?: boolean;
}

const StyledInput = styled.input<StyledInputProps>(props => ({
  "display": "flex",
  "justifyContent": "center",
  "alignItems": "center",

  "width": "200px",
  "height": "25px",
  "margin": "0px",
  "padding": "0px",
  
  "fontSize": `${props["large-font"] ? props.theme.font.large : props.theme.font.normal}`,
  "color": `${props.theme.colors.font}`,

  "borderWidth": `${props["no-border"] ? "0 0 0 0" : "0 0 1px 0"}`,
  "borderColor": `${props.theme.colors.font}`,
  "backgroundColor": `${props.theme.colors.second_background}`,

  "&:focus": {
    "color": `${props.theme.colors.selection_color}`,
    "borderColor": `${props.theme.colors.selection_color}`,
  },

  "textAlign": "center"
}));
 
const LabelTextbox:React.FC<Props> = (props) => {
  const [value, setValue] = useState(() => (props.value ? props.value : ""));
  
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    console.log("done -1")
    setValue(event.target.value);

    if(props.onChange){
      props.onChange(event.target.value);
    }
  };

  return (
    <StyledInput
      placeholder="Brak"
      value={value}
      onChange={handleChange}
      no-border={props["no-border"]}
      large-font={props["large-font"]}
    />
  );

}

export default LabelTextbox;