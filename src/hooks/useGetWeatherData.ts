//　気象庁のAPIから地域別のデータを取得
import React, { useState, useEffect, useContext } from 'react';
import { AreaContext } from '../providers/AreaProvider';
import axios from 'axios';
import { WeatherDataType } from '../types';

export const useGetWeatherData = () => {
  const [loading, setLoading] = useState(false);
  // const [targetAreaCode, setTargetAreaCode] = useState('130000');
  const [weatherData, setWeatherData] = useState<WeatherDataType>({
    reportDateTime: '',
    areaName: '',
    twoDayTimeDefines: [],
    twoDayWeatherCodes: [],
    twoDayWeekTempsMax: [],
    weekTimeDefines: [],
    weekWeatherCodes: [],
    weekTempsMax: [],
  });

  const context = useContext<any>(AreaContext);
  const { targetAreaCode, setTargetAreaCode } = context;

  useEffect(() => {
    // targetAreaCodeの値が無ければデータ取得しない
    if (targetAreaCode === undefined) return;

    console.log('地域別のデータを取得します');
    setLoading(true);
    axios
      .get(
        `https://www.jma.go.jp/bosai/forecast/data/forecast/${targetAreaCode}.json`
      )
      .then((weather) => {
        // 取得できるデータによって今日か明日の天気を取得
        let weekTempsMax1: string[] = [];
        let weekWeatherCodes1: string[] = [];
        let weekTimeDefines1: string[] = [];

        // 今日と明日の天気
        const twoDay = weather.data[0];
        // １週間の天気
        const week = weather.data[1];

        const reportDateTime = twoDay.reportDatetime;
        const areaName = twoDay.timeSeries[2].areas[0].area.name;
        const officeCode = twoDay.timeSeries[2].areas[0].area.code;
        const twoDayTimeDefines = twoDay.timeSeries[2].timeDefines;
        const twoDayWeatherCodes = twoDay.timeSeries[0].areas[0].weatherCodes;
        const twoDayWeekTempsMax = twoDay.timeSeries[2].areas[0].temps;
        const weekTimeDefines = week.timeSeries[1].timeDefines;
        const weekWeatherCodes = week.timeSeries[0].areas[0].weatherCodes;
        const weekTempsMax = week.timeSeries[1].areas[0].tempsMax;

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
          weekWeatherCodes1 = [
            twoDay.timeSeries[0].areas[0].weatherCodes[0],
            ...weekWeatherCodes,
          ];
          weekTimeDefines1 = [
            twoDay.timeSeries[0].timeDefines[0],
            ...weekTimeDefines,
          ];
        }
        //　不要な値を削除
        weekTempsMax1 = weekTempsMax1.filter(function (s) {
          return s !== '';
        });
        weekWeatherCodes1 = weekWeatherCodes1.filter(function (s) {
          return s !== '';
        });

        setWeatherData({
          reportDateTime: reportDateTime,
          areaName: areaName,
          officeCode: officeCode,
          twoDayTimeDefines: twoDayTimeDefines,
          twoDayWeatherCodes: twoDayWeatherCodes,
          twoDayWeekTempsMax: twoDayWeekTempsMax,
          weekTimeDefines: weekTimeDefines1,
          weekWeatherCodes: weekWeatherCodes1,
          weekTempsMax: weekTempsMax1,
        });
        setLoading(false);
      })
      .catch((err) => alert('データがうまく取得できませんでした'));
  }, [targetAreaCode]);

  // return { weatherData, targetAreaCode, setTargetAreaCode, loading };
  return { weatherData, loading };
};
