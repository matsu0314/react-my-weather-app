import React, { FC, createContext, useState } from 'react';

type AreaContextType = {
  targetAreaCode: string;
  setTargetAreaCode: React.Dispatch<React.SetStateAction<string>>;
};

export const AreaContext = createContext<AreaContextType>(
  {} as AreaContextType
);

export const AreaProvider = (props) => {
  console.log('providerがレンダリングされました');

  const { children } = props;
  // 地域を保存（初期値東京：130000）
  const [targetAreaCode, setTargetAreaCode] = useState('130000');

  const value: AreaContextType = {
    targetAreaCode,
    setTargetAreaCode,
  };

  return <AreaContext.Provider value={value}>{children}</AreaContext.Provider>;
};
