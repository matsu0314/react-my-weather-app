import React, { useState, useRef, useEffect, useContext } from 'react';
import { Title } from '../Title';
import { Selector } from '../Selector';
import { Result } from '../Result';
import { DefaultLayout } from '../layout/DefaultLayout';
import { AreaContext } from '../../providers/AreaProvider';
import { useGetWeatherData } from '../../hooks/useGetWeatherData';
import { useGetApiData } from '../../hooks/useGetApiData';

import styled from 'styled-components';

type AreaContextType = {
  targetAreaCode: string;
  setTargetAreaCode: React.Dispatch<React.SetStateAction<string>>;
};

export const Top = () => {
  console.log('Topをレンダリングします');
  const areaCheck = useRef(null);
  const { selectArea } = useGetApiData();
  const { weatherData, loading } = useGetWeatherData();
  const context = useContext<AreaContextType>(AreaContext);
  const { targetAreaCode, setTargetAreaCode } = context;
  const [checkFlag, setCheckFlag] = useState(false);
  const [localDisplayArea, setLocalDisplayArea] = useState(targetAreaCode);

  // コードからエリアネームを返す
  const myAreaSet = (areaCode): string => {
    return selectArea.filter((weathreCode) => weathreCode[0] === areaCode)[0][1]
      .name;
  };

  // ローカルストレージの値を取得
  const localArea = JSON.parse(localStorage.getItem('area-data'));

  // 読み込みどき、ローカルストレージの値をチェック
  useEffect(() => {
    console.log('useEffect');
    if (localArea === null) return;
    // チェックボックスをオン
    const areaCheckElm = areaCheck.current;
    areaCheckElm.checked = true;

    // エリアコードをローカルストレージの値でセット
    setTargetAreaCode(localArea.areaCode);
    // チェックボックスのflag更新
    setCheckFlag(true);
    // 保存したエリア名（表示用）セット
    setLocalDisplayArea(myAreaSet(localArea.areaCode));
  }, []);

  // チェックボックスをオンにしたら、エリアコードをローカルストレージに保存する
  const onClickSaveArea = (e) => {
    const target = e.target;
    if (target.checked) {
      const areaLocal = {
        areaCode: targetAreaCode,
      };
      //オブジェクトをJSON文字列に変換
      const json = JSON.stringify(areaLocal);
      //データ保存
      localStorage.setItem('area-data', json);
      // チェックボックスのflag更新
      setCheckFlag(true);
      setTargetAreaCode(targetAreaCode);

      // 保存したエリア名（表示用）
      setLocalDisplayArea(myAreaSet(targetAreaCode));
      alert(
        `マイエリア「${myAreaSet(
          targetAreaCode
        )}」をブラウザに保存します。\n次回アクセスした時、このエリアが表示されます。`
      );
    } else {
      //データ削除
      localStorage.removeItem('area-data');
      // チェックボックスのflag更新
      setCheckFlag(false);
      alert(`マイエリア「${localDisplayArea}」をブラウザから削除しました。`);
    }
  };

  return (
    <DefaultLayout>
      <div className="container">
        <Title elementClassName={'top'}>エリア別の天気</Title>
        <Selector selectArea={selectArea} />
        <CheckAreaStyle>
          <CheckBoxStyle
            type="checkbox"
            id="ChSwitch"
            onClick={onClickSaveArea}
            ref={areaCheck}
          />
          <LabelStyle htmlFor="ChSwitch"></LabelStyle>
          {checkFlag ? (
            <CheckTextStyle>my area:{localDisplayArea}</CheckTextStyle>
          ) : (
            <CheckTextStyle>マイエリアを保存</CheckTextStyle>
          )}
        </CheckAreaStyle>

        {weatherData.reportDateTime == '' ? (
          <p>地域を選択してください</p>
        ) : (
          <Result weatherData={weatherData} loading={loading} />
        )}
      </div>
    </DefaultLayout>
  );
};

const CheckAreaStyle = styled.div`
  margin-top: 20px;
  float: left;
  position: relative;
`;
const CheckBoxStyle = styled.input`
  opacity: 0;
  position: absolute;
  &:focus + label,
  &:focus + label:before {
    box-shadow: 0 0 4px #34abff;
  }
  &:checked + label {
    background: #57b5c1;
  }
  &:checked + label:before {
    left: 44px;
  }
`;
const CheckTextStyle = styled.p`
  font-size: 13px;
  color: #999;
`;
const LabelStyle = styled.label`
  width: 80px;
  height: 40px;
  box-sizing: border-box;
  display: block;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  &:before {
    content: '';
    width: 30px;
    height: 30px;
    position: absolute;
    background: white;
    left: 5px;
    top: 5px;
    box-sizing: border-box;
    color: black;
    border-radius: 100px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }
`;
