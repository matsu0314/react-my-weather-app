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

          const reportDateTime = twoDay.reportDatetime;
          const areaName = WehatherArea.name;
          const officeCode = WehatherArea.officeCode;
          const twoDayTimeDefines = twoDay.timeSeries[2].timeDefines;
          const twoDayWeatherCodes = twoDay.timeSeries[0].areas.weatherCodes;
          const twoDayWeekTempsMax = twoDay.timeSeries[2].areas.temps;
          const weekTimeDefines = week.timeSeries[0].timeDefines;
          const weekWeatherCodes = week.timeSeries[0].areas.weatherCodes;
          const weekTempsMax = week.timeSeries[1].areas.tempsMax;

          if (twoDayWeekTempsMax.length == 4) {
            // 今日と明日、１週間の天気の開始日が同じだったら
            //　5時発表
            if (
              twoDayTimeDefines[0].slice(0, 10) ===
              weekTimeDefines[0].slice(0, 10)
            ) {
              weekTempsMax1 = [
                twoDayWeekTempsMax[0],
                twoDayWeekTempsMax[3],
                ...weekTempsMax,
              ];
              delete weekTempsMax1[3];

              weekWeatherCodes1 = [
                twoDayWeatherCodes[0],
                twoDayWeatherCodes[1],
                ...weekWeatherCodes,
              ];
              delete weekWeatherCodes1[2];
              delete weekWeatherCodes1[3];

              weekTimeDefines1 = [...weekTimeDefines];
              //　11時発表
            } else {
              weekTempsMax1 = [
                twoDayWeekTempsMax[0],
                twoDayWeekTempsMax[3],
                ...weekTempsMax,
              ];

              weekWeatherCodes1 = [
                twoDayWeatherCodes[0],
                twoDayWeatherCodes[1],
                ...weekWeatherCodes,
              ];
              delete weekWeatherCodes1[2];
              weekTimeDefines1 = [twoDayTimeDefines[0], ...weekTimeDefines];
            }
            // 17時発表
          } else {
            weekTempsMax1 = ['-', twoDayWeekTempsMax[1], ...weekTempsMax];
            weekWeatherCodes1 = [twoDayWeatherCodes[0], ...weekWeatherCodes];
            weekTimeDefines1 = [twoDayTimeDefines[0], ...weekTimeDefines];
          }
          //　不要な値を削除
          weekTempsMax1 = weekTempsMax1.filter(function (s) {
            return s !== '';
          });
          weekWeatherCodes1 = weekWeatherCodes1.filter(function (s) {
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
