import styled from "styled-components";

type Props = {
  "column-size": string;
  "row-size": string;
  "height"?: string;
  "width"?: string;
}

const Grid = styled.div`
  display: grid;
  width: ${(props: Props) => props.width ? props.width : "100%"};
  height: ${(props: Props) => props.height ? props.height : "100%"};
  
  justify-content: center;
  align-content: center;

  grid-template-columns: ${(props: Props) => "repeat(auto-fill, " + props["column-size"] + ")"};
  grid-template-rows: ${(props: Props) => "repeat(auto-fill, " + props["row-size"] + ")"};
`;

export default Grid; 