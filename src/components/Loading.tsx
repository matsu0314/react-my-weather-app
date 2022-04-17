import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import '../assets/css/fonts/secularOne.css';

export const Loading = () => {
  const loadingDOM = useRef(null);

  useEffect(() => {
    // 文字に<span>を追加
    const createAnimation = () => {
      const getLoadingDOM = loadingDOM.current;
      const strAry = getLoadingDOM.innerText.split('');

      getLoadingDOM.innerHTML = strAry.reduce((prev, current) => {
        current = current.replace(/\s+/, '&nbsp;');
        return `${prev}<span class="letter">${current}</span>`;
      }, '');
    };

    createAnimation();
  }, []); // 第二引数に空配列を渡す！

  return (
    <LoadingStyle>
      <AnimationStyle className="start" ref={loadingDOM}>
        Loading...
      </AnimationStyle>
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  }
`;
const AnimationStyle = styled.p`
font-family: 'Secular One', sans-serif;
  font-size: 2em;
  text-align: center;
  .letter {
    display: inline-block;

      animation-name: kf-animation;
      animation-duration: 0.8s;
      animation-iteration-count: infinite;
      animation-fill-mode: both;

      &:nth-child(2) {
        animation-delay: 0.1s;
      }
      &:nth-child(3) {
        animation-delay: 0.15s;
      }
      &:nth-child(4) {
        animation-delay: 0.2s;
      }

      &:nth-child(5) {
        animation-delay: 0.25s;
      }
      &:nth-child(6) {
        animation-delay: 0.3s;
      }
      &:nth-child(7) {
        animation-delay: 0.35s;
      }
      &:nth-child(8) {
        animation-delay: 0.4s;
      }
      &:nth-child(9) {
        animation-delay: 0.45s;
      }
      &:nth-child(10) {
        animation-delay: 0.5s;
      }
    @media (max-width: 640px) {
      font-size: 1em;
    }
    @keyframes kf-animation {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20%);
      }
      100% {
        transform: translateY(0);
      }
    }
`;
