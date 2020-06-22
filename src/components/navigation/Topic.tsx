import styled from '@emotion/styled'
import React from 'react'
import { ThemeProps } from "../../layout/theme";

const Title = styled.p`
  margin: 9px 0 0 9px;
  color: ${(props: ThemeProps) => props.theme.colors.selection_color};
  font-size: ${(props: ThemeProps) => props.theme.font.small};
`;

const LinkContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding-left: 45px;
`;

type Props = {
  title: string
}

const Topic: React.FC<Props> = ({ title, children }) => (
  <div>
    <Title>{title}</Title>
    <LinkContainer>
      {children}
    </LinkContainer>
  </div>
)


export default Topic;