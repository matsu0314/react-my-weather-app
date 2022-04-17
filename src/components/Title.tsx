import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  elementClassName?: string;
};

export const Title: React.FC<Props> = memo((props) => {
  const { children, elementClassName } = props;
  return <H1Style className={elementClassName}>{children}</H1Style>;
});

const H1Style = styled.h1`
  position: relative;
  background: #568187;
  margin: 0 -500%;
  padding: 10px 500px;
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
  &.top {

  }
  &.all-area {
    background: #8c897e;
  }
  .
`;
