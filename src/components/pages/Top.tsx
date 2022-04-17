import React from 'react';
import { Title } from '../Title';
import { Selector } from '../Selector';
import { Result } from '../Result';
import { DefaultLayout } from '../layout/DefaultLayout';
import { WeatherDataType } from '../../types';
import { selectAreaType } from '../../types';

type TopType = {
  weatherData: WeatherDataType;
  selectArea: selectAreaType;
  targetAreaCode: string;
  loading: boolean;
  setTargetAreaCode: React.Dispatch<React.SetStateAction<string>>;
};

export const Top: React.FC<TopType> = ({
  setTargetAreaCode,
  targetAreaCode,
  selectArea,
  weatherData,
  loading,
}) => {
  return (
    <DefaultLayout>
      <div className="container">
        <Title elementClassName={'top'}>エリア別の天気</Title>
        <Selector
          setTargetAreaCode={setTargetAreaCode}
          targetAreaCode={targetAreaCode}
          selectArea={selectArea}
        />
        {weatherData.reportDateTime == '' ? (
          <p>地域を選択してください</p>
        ) : (
          <Result weatherData={weatherData} loading={loading} />
        )}
      </div>
    </DefaultLayout>
  );
};
