import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  elementClassName?: string;
};

export const HeaderButton: React.FC<Props> = memo((props) => {
  const { children, elementClassName } = props;
  return (
    <ArrowIconStyle className={elementClassName}>{children}</ArrowIconStyle>
  );
});

const ArrowIconStyle = styled.span`
  @media (max-width: 640px) {
    flex: 1 1 50%;
  }
  &.all-area a {
    background: #453f28;
  }
  &.all-area a.active {
    background: #8c897e;
  }
  a {
    display: inline-block;
    position: relative;
    background: #69969b;
    font-size: 20px;
    color: #dbd7c3;
    letter-spacing: 0.1em;
    text-decoration: none;
    padding: 10px 40px 10px 20px;
    @media (max-width: 640px) {
      display: block;
    }
    &:not(first-child) {
      margin-left: 10px;
      @media (max-width: 640px) {
        margin-left: 0;
      }
    }
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 20px;
      margin: auto;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 7px 0 7px 7px;
      border-color: transparent transparent transparent #dbd7c3;
      @media (max-width: 640px) {
        transform: rotate(90deg);
      }
    }
    &:before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.2);
      transform-origin: right top;
      transform: scale(0, 1);
      transition: transform 0.4s;
      z-index: 0;
      @media (max-width: 640px) {
        display: none;
      }
    }
    &:hover:before {
      transform: scale(1, 1);
      transform-origin: left top;
    }
    &.active {
      background: #568187;
      color: #fff;
      cursor: default;
      &:after {
        border-color: transparent transparent transparent #fff;
      }
      &:before {
        display: none;
      }
    }
  }
`;
