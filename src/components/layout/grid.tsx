import styled from '@emotion/styled'

type Props = {
  "column-size": string;
  "row-size": string;
  "height"?: string;
  "width"?: string;
}

const Grid = styled.div`
  display: grid;
  width: ${(props: Props) => props.width ? props.width : "calc(100vw - 220px)"};
  height: ${(props: Props) => props.height ? props.height : "calc(100vh - 200px)"};
  
  grid-template-columns: ${(props: Props) => "repeat(auto-fill, " + props["column-size"] + ")"};
  grid-template-rows: ${(props: Props) => "repeat(auto-fill, " + props["row-size"] + ")"};
`;

export default Grid; 