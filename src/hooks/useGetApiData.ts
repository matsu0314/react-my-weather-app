// 地域と天気コードを取得して配列に変換
import { areasObject } from '../api/areasObject';
import { weatherCodeObject } from '../api/weatherCode';

export const useGetApiData = () => {
  // areaデータを配列に変換
  const weatherCode = Object.entries(weatherCodeObject);

  const selectAreaObj = Object.entries(areasObject);
  // コード順にソート
  const selectArea = selectAreaObj.sort(function (a, b) {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });

  return { selectArea, weatherCode };
};
