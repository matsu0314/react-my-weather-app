import React, { useRef, useEffect, useContext, memo } from 'react';
import { selectAreaType } from '../types';
import { AreaContext } from '../providers/AreaProvider';

import styled from 'styled-components';

type SelectorType = {
  selectArea: selectAreaType;
  // targetAreaCode: string;
  // setTargetAreaCode: React.Dispatch<React.SetStateAction<string>>;
};

export const Selector: React.FC<SelectorType> = memo(
  ({
    selectArea,
    // targetAreaCode,
    // setTargetAreaCode,
  }) => {
    console.log('Selectorがレンダリングされました');

    const context = useContext<any>(AreaContext);
    const { targetAreaCode, setTargetAreaCode } = context;

    console.log('targetAreaCode：' + targetAreaCode);

    return (
      <SelectStyle>
        <select
          onChange={(e) => setTargetAreaCode(e.target.value)}
          defaultValue={targetAreaCode}
        >
          {selectArea.map((area, index) => {
            return (
              <option key={index} value={area[0]}>
                {area[1].name}
              </option>
            );
          })}
        </select>
      </SelectStyle>
    );
  }
);

const SelectStyle = styled.div`
  position: relative;
  margin-top: 30px;
  select {
    appearance: none;
    background-color: transparent;
    width: 100%;
    padding: 10px 10px 10px 0;
    font-size: 1.6rem;
    color: #000000;
    text-align: center;
    text-align: -webkit-center;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0);
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 18px;
    right: 10px;
    width: 0;
    height: 0;
    padding: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`;
