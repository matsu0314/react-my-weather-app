import styled from 'styled-components';
import dayjs from 'dayjs';
import { Loading } from './Loading';
import { useGetApiData } from '../hooks/useGetApiData';
import { WeatherDataType } from '../types';

const weekDate = ['日', '月', '火', '水', '木', '金', '土'];

type ResultsWeatherDataType = {
  weatherData: WeatherDataType;
  loading: boolean;
};

export const Result: React.FC<ResultsWeatherDataType> = ({
  weatherData,
  loading,
}) => {
  //　日付整形(1週間分)
  const dayFormatWeek = weatherData.weekTimeDefines.map((time) => {
    return dayjs(time).format('M月D日 ddd');
  });
  //　お天気コード取得
  const { weatherCode } = useGetApiData();
  const targetWeather = (code: number | string) =>
    weatherCode.filter((weathreCode) => weathreCode[0] === code);

  // 天気アイコン取得
  const createIcon = (code: number) => {
    const targetIcon = targetWeather(
      weatherData.weekWeatherCodes[code]
    )[0][1][0];
    return `https://www.jma.go.jp/bosai/forecast/img/${targetIcon}`;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PublicationStyle>
            {dayjs(weatherData.reportDateTime).format('M月D日 H時')} 気象庁発表
          </PublicationStyle>
          <FlexStyle>
            {weekDate.map((week, index) => (
              <WeatherStyle key={index}>
                <p className="weather_date">{dayFormatWeek[index]}</p>

                <div className="weater_icon">
                  <img src={createIcon(index)} />
                </div>
                <p className="weather_txt">
                  {targetWeather(weatherData.weekWeatherCodes[index])[0][1][3]}
                </p>
                <p
                  className="weather_temp"
                  data-content={
                    weatherData.weekTempsMax[index] == '-' ? 'today' : 'week'
                  }
                >
                  {weatherData.weekTempsMax[index]}
                </p>
              </WeatherStyle>
            ))}
          </FlexStyle>
        </>
      )}
    </>
  );
};

const FlexStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PublicationStyle = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: #999;
`;

const WeatherStyle = styled.div`
  text-align: center;
  box-sizing: border-box;
  .weather_txt {
    color: #4b8b93;
  }
  .weather_date {
    color: #7dd4df;
  }
  .weather_temp[data-content='week'] {
    font-size: 1.1em;
    &:after {
      content: '℃';
      display: inline;
    }
  }
  &:nth-of-type(1) {
    flex: 0 1 100%;
    margin-bottom: 30px;
    border-right: none !important;
    .weather_date {
      display: inline-block;
      padding: 0.3em 1.5em;
      border-radius: 20px;
      background: #7dd4df;
      color: #fff;
    }
    .weater_icon {
      max-width: 40%;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .weather_txt {
      margin-top: 0;
      font-size: 1.4rem;
      letter-spacing: 0.3em;
    }
    .weather_temp {
      font-size: 2.5rem;
      font-weight: bold;
    }
  }
  &:nth-of-type(n + 2) {
    flex: 0 1 33%;
    border-top: 1px solid #7dd4df;
    border-left: 1px solid #7dd4df;
    .weather_temp[data-content='week'] {
      font-size: 1.1em;
      &:after {
        content: '℃';
        display: inline;
      }
    }
  }
  &:nth-of-type(2) {
    position: relative;
  }
  &:nth-of-type(2):before {
    content: '明日以降の天気';
    display: block;
    position: absolute;
    top: -2em;
    margin-right: -100vw;
    font-size: 1.2rem;
    color: #797979;
    text-align: left;
    @media (max-width: 640px) {
      font-size: 0.9rem;
    }
  }
  &:nth-of-type(3n + 1) {
    border-right: 1px solid #7dd4df;
  }
  &:nth-of-type(n + 5) {
    border-bottom: 1px solid #7dd4df;
  }
`;
