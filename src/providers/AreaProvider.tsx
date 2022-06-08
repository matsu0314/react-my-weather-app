import React, { FC, createContext, useState } from 'react';

export const AreaContext = createContext({});

export const AreaProvider = (props) => {
  console.log('providerがレンダリングされました');

  const { children } = props;
  // 地域を保存
  const [targetAreaCode, setTargetAreaCode] = useState('130000');

  const value = {
    targetAreaCode,
    setTargetAreaCode,
  };

  return <AreaContext.Provider value={value}>{children}</AreaContext.Provider>;
};
