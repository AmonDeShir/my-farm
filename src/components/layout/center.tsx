import styled from '@emotion/styled'

type Props = {
  width: string;
  height: string;
}

const Center = styled.div`
  width: ${(props:Props) => props.width};
  height: ${(props:Props) => props.height};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Center;