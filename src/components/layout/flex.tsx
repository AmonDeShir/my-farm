import styled from '@emotion/styled'

type Props = {
  height?: string;
  width?: string;
}

const Flex = styled.div`
  width: ${(props:Props) => "calc("+ props.width ? props.width : "100vw" +") - 180px)"};
  height: ${(props:Props) => props.height ? props.height : "100%"};

  display: flex;
  flex-wrap: wrap; 
`;

export default Flex;