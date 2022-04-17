//　気象庁のAPIから地域別のデータを取得
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherDataType } from '../types';

export const useGetWeatherData = () => {
  const [loading, setLoading] = useState(false);
  const [targetAreaCode, setTargetAreaCode] = useState('130000');
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

  useEffect(() => {
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

        const reportDateTime = twoDay.reportDateTime;
        const areaName = twoDay.timeSeries[2].areas[0].area.name;
        const officeCode = twoDay.timeSeries[2].areas[0].area.code;
        const twoDayTimeDefines = twoDay.timeSeries[0].timeDefines;
        const twoDayWeatherCodes = twoDay.timeSeries[0].areas[0].weatherCodes;
        const twoDayWeekTempsMax = twoDay.timeSeries[2].areas[0].temps;
        const weekTimeDefines = week.timeSeries[0].timeDefines;
        const weekWeatherCodes = week.timeSeries[0].areas[0].weatherCodes;
        const weekTempsMax = week.timeSeries[1].areas[0].tempsMax;

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
      })
      .catch((err) => alert('データがうまく取得できませんでした'));
    setLoading(false);
  }, [targetAreaCode]);

  return { weatherData, targetAreaCode, setTargetAreaCode, loading };
};
