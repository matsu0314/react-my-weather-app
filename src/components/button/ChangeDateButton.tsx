import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  elementClassName?: string;
  onClick?: (e) => void;
  value?: string;
};

export const ChangeDateButton: React.FC<Props> = memo((props) => {
  const { children, elementClassName, onClick, value } = props;
  return (
    <NormalButtonStyle
      className={elementClassName}
      onClick={onClick}
      value={value}
    >
      {children}
    </NormalButtonStyle>
  );
});

const NormalButtonStyle = styled.button`
  background-color: #cecece;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
  padding: 0.5em 1.2em;
  appearance: none;
  font-size: 1.2rem;
  color: #fff;
  @media (max-width: 640px) {
  font-size: 1rem;

  }
  &:nth-of-type(n + 2) {
    margin-left: 5px;
  }
  &.active {
    background-color: #df7d7d;
  }
`;
