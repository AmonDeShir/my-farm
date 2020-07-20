import styled, { CreateStyled } from '@emotion/styled'

export const theme =
{  
  colors:{
    font: "white",
    main_background: "#0C111F",
    second_background: "#111A2E",
    selection_color: "#4D8AF0",
    error: "#FF0000"
  },

  font:{
    extra_large: "24px",
    large: "20px",
    medium: "16px",
    normal: "12px",
    small: "10px"
  },
  
  shadow: "3px 3px 4px rgba(0, 0, 0, 0.9), -1px -1px 4px rgba(0, 0, 0, 0.4)"
}

type Theme = typeof theme;

export type ThemeProps = {"theme": Theme}
export default styled as CreateStyled<Theme>
