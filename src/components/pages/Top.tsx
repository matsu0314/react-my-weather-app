import React, { useRef, useEffect, useContext } from 'react';
import { Title } from '../Title';
import { Selector } from '../Selector';
import { Result } from '../Result';
import { DefaultLayout } from '../layout/DefaultLayout';
import { AreaContext } from '../../providers/AreaProvider';
import { useGetWeatherData } from '../../hooks/useGetWeatherData';
import { useGetApiData } from '../../hooks/useGetApiData';

// import { WeatherDataType } from '../../types';
// import { selectAreaType } from '../../types';

type TopType = {
  // weatherData: WeatherDataType;
  // selectArea: selectAreaType;
  // targetAreaCode: string;
  // loading: boolean;
  // setTargetAreaCode: React.Dispatch<React.SetStateAction<string>>;
};

// ローカルストレージの値を取得
const localArea = JSON.parse(localStorage.getItem('area-data'));

export const Top: React.FC<TopType> = () => {
  console.log('Topをレンダリングします');
  const areaCheck = useRef(null);
  const { weatherData, loading } = useGetWeatherData();
  const context = useContext<any>(AreaContext);
  const { targetAreaCode, setTargetAreaCode } = context;
  const { selectArea } = useGetApiData();

  // ローカルストレージに値があればチェックボックスをオン&エリアコードを更新
  useEffect(() => {
    if (localArea === null) return;
    const areaCheckElm = areaCheck.current;
    areaCheckElm.checked = true;

    setTargetAreaCode(localArea.areaCode);
    console.log('LocalAreaをセット：' + localArea.areaCode);
  }, []);

  // チェックボックスをクリックしたら、エリアコードをローカルストレージに保存する
  const onClickSaveArea = (e: any) => {
    const target = e.target;
    if (target.checked) {
      const areaLocal = {
        areaCode: targetAreaCode,
      };
      //オブジェクトをJSON文字列に変換
      const json = JSON.stringify(areaLocal);
      //データ保存
      localStorage.setItem('area-data', json);
    } else {
      //データ削除
      localStorage.removeItem('area-data');
    }
  };
  return (
    <DefaultLayout>
      <div className="container">
        <Title elementClassName={'top'}>エリア別の天気</Title>
        <Selector
          // setTargetAreaCode={setTargetAreaCode}
          // targetAreaCode={targetAreaCode}
          selectArea={selectArea}
        />
        エリアを保存する
        <input type="checkbox" onClick={onClickSaveArea} ref={areaCheck} />
        {weatherData.reportDateTime == '' ? (
          <p>地域を選択してください</p>
        ) : (
          <Result weatherData={weatherData} loading={loading} />
        )}
      </div>
    </DefaultLayout>
  );
};
