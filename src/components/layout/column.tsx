import styled from '@emotion/styled'

type Props = {
  width: string;
}

const Column = styled.div`
  width: ${(props: Props) => props.width};
  
  display: flex;
  flex-direction: column;
`;

export default Column;