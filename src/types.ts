import { areasObject } from './api/areasObject';

const selectArea = Object.entries(areasObject);
export type selectAreaType = typeof selectArea;

export type WeatherDataType = {
  reportDateTime: '';
  areaName: '';
  officeCode?: '';
  twoDayTimeDefines: string[];
  twoDayWeatherCodes: string[];
  twoDayWeekTempsMax: string[];
  weekTimeDefines: string[];
  weekWeatherCodes: string[];
  weekTempsMax: string[];
};
