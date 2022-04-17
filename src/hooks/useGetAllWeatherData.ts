//　気象庁のAPIから全エリアのデータを取得
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherDataType } from '../types';

export const useGetAllWeatherData = () => {
  const [allWeatherData, setAllWeatherData] = useState<Array<WeatherDataType>>(
    []
  );

  useEffect(() => {
    console.log('全国のデータを取得します。');
    axios
      .get('https://www.jma.go.jp/bosai/forecast/data/forecast/010000.json')
      .then((weather) => {
        // 地域ごとのデータを格納
        const AllweatherDataArray = [];

        weather.data.map((WehatherArea) => {
          let weekTempsMax1: string[] = [];
          let weekWeatherCodes1: string[] = [];
          let weekTimeDefines1: string[] = [];

          // 今日と明日の天気
          const twoDay = WehatherArea.srf;
          // １週間の天気
          const week = WehatherArea.week;

          const reportDateTime = WehatherArea.reportDateTime;
          const areaName = WehatherArea.name;
          const officeCode = WehatherArea.officeCode;
          const twoDayTimeDefines = twoDay.timeSeries[1].timeDefines;
          const twoDayWeatherCodes = twoDay.timeSeries[0].areas.weatherCodes;
          const twoDayWeekTempsMax = twoDay.timeSeries[2].areas.temps;
          const weekTimeDefines = week.timeSeries[0].timeDefines;
          const weekWeatherCodes = week.timeSeries[0].areas.weatherCodes;
          const weekTempsMax = week.timeSeries[1].areas.tempsMax;

          // 取得できるデータによって今日か明日の天気を取得
          if (twoDayWeekTempsMax[3]) {
            weekTempsMax1 = [
              twoDayWeekTempsMax[0],
              // twoDayWeekTempsMax[3],
              ...weekTempsMax,
            ];
            weekWeatherCodes1 = weekWeatherCodes;
            weekTimeDefines1 = weekTimeDefines;
          } else {
            weekTempsMax1 = ['-', twoDayWeekTempsMax[1], ...weekTempsMax];
            weekWeatherCodes1 = [twoDayWeatherCodes[0], ...weekWeatherCodes];
            weekTimeDefines1 = [twoDayTimeDefines[0], ...weekTimeDefines];
          }
          //　不要な値を削除
          weekTempsMax1 = weekTempsMax1.filter(function (s) {
            return s !== '';
          });

          AllweatherDataArray.push({
            reportDateTime: reportDateTime,
            areaName: areaName,
            officeCode: officeCode,
            twoDayTimeDefines: twoDayTimeDefines,
            twoDayWeatherCodes: weekWeatherCodes1,
            twoDayWeekTempsMax: twoDayWeekTempsMax,
            weekTimeDefines: weekTimeDefines1,
            weekWeatherCodes: weekWeatherCodes1,
            weekTempsMax: weekTempsMax1,
          });
        });
        setAllWeatherData(AllweatherDataArray);
      })
      .catch((err) => alert('データがうまく取得できませんでした'));
  }, []);

  return { allWeatherData };
};
