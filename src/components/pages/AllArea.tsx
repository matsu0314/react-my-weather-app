import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Title } from '../Title';
import { useGetApiData } from '../../hooks/useGetApiData';
import { ChangeDateButton } from '../button/ChangeDateButton';
import { DefaultLayout } from '../layout/DefaultLayout';
import japanMap from '../../assets/images/japan-map.png';
import { WeatherDataType } from '../../types';
import { selectAreaType } from '../../types';

type DayType = 'today' | 'tommorow' | null;

type AllArea = {
  allWeatherData: Array<WeatherDataType>;
  selectArea: selectAreaType;
  dayType: DayType;
};

export const AllArea: React.FC<AllArea> = (props) => {
  const { allWeatherData, selectArea } = props;
  const [targetDate, setTargetDate] = useState<DayType>('today');

  const { weatherCode } = useGetApiData();

  const dayFormat = (time: string, num: number = 0) => {
    return dayjs(time).add(num, 'd').format('M月D日 ddd');
  };

  // 天気アイコンのコード取得
  const targetWeather = (code: number | string) =>
    weatherCode.filter((weathreCode) => weathreCode[0] === code);

  // 天気アイコンimg取得
  const createIcon = (code: number | string) => {
    const targetIcon = targetWeather(code)[0][1][0];
    return `https://www.jma.go.jp/bosai/forecast/img/${targetIcon}`;
  };

  // エリアごとのクラス名取得
  const createClassName = (weatherCode: string): string => {
    let areaClassName = '';
    selectArea.map((area) => {
      if (weatherCode == area[0]) {
        areaClassName = area[1].enName.split(' ')[0];
      }
      // 奄美:460040は日別のエリアコードがないため除外：
      if (weatherCode == '460040') {
        areaClassName = 'invisible-area';
      }
    });
    return areaClassName;
  };

  // 日付変更
  const onChangeDate = (e: { target: { value: SetStateAction<string> } }) => {
    if (allWeatherData[0] && e.target.value == 'today') {
      setTargetDate('today');
    } else if (allWeatherData[0] && e.target.value == 'tommorow') {
      setTargetDate('tommorow');
    } else {
      return null;
    }
  };

  return (
    <>
      {allWeatherData[0] ? (
        <DefaultLayout>
          <div className="container">
            <Title elementClassName={'all-area'}>全国の天気</Title>
            <ChangeDateButton
              onClick={onChangeDate}
              value={'today'}
              elementClassName={targetDate == 'today' && 'active'}
            >
              今日
            </ChangeDateButton>
            <ChangeDateButton
              onClick={onChangeDate}
              value={'tommorow'}
              elementClassName={targetDate == 'tommorow' && 'active'}
            >
              明日
            </ChangeDateButton>
            <WeatherDateStyle>
              {targetDate == 'today'
                ? dayFormat(allWeatherData[0].twoDayTimeDefines[0])
                : dayFormat(allWeatherData[0].twoDayTimeDefines.slice(-1)[0])}
            </WeatherDateStyle>
            <MapAreaStyle>
              <JapanMapStyle>
                <img src={japanMap} alt="日本地図" />
              </JapanMapStyle>

              <MapAreaItemWrapStyle>
                {allWeatherData.map((WehatherArea, index) => (
                  <MapAreaItemStyle
                    key={index}
                    className={createClassName(WehatherArea.officeCode)}
                  >
                    <p className="area_name">{WehatherArea.areaName}</p>
                    <p className="area_icon">
                      {targetDate == 'today' ? (
                        <img
                          src={createIcon(WehatherArea.weekWeatherCodes[0])}
                        />
                      ) : (
                        <img
                          src={createIcon(WehatherArea.weekWeatherCodes[1])}
                        />
                      )}
                    </p>
                    {targetDate == 'today' ? (
                      <p
                        className="weather_temp"
                        data-content={
                          WehatherArea.weekTempsMax[0] == '-' ? 'today' : 'week'
                        }
                      >
                        {WehatherArea.weekTempsMax[0]}
                      </p>
                    ) : (
                      <p
                        className="weather_temp"
                        data-content={
                          WehatherArea.weekTempsMax[1] == '-' ? 'today' : 'week'
                        }
                      >
                        {WehatherArea.weekTempsMax[1]}
                      </p>
                    )}
                  </MapAreaItemStyle>
                ))}
              </MapAreaItemWrapStyle>
            </MapAreaStyle>
            <PublicationStyle>
              {allWeatherData[0]
                ? dayjs(allWeatherData[0].reportDateTime).format('M月D日 H時')
                : null}
              気象庁発表
            </PublicationStyle>
          </div>
        </DefaultLayout>
      ) : null}
    </>
  );
};

const PublicationStyle = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: #999;
`;

const WeatherDateStyle = styled.p`
  display: block;
  max-width: 260px;
  margin: 30px auto 0;
  padding: 0.3em 1.5em;
  border-radius: 20px;
  background: #7dd4df;
  color: #fff;
  text-align: center;
  @media (max-width: 640px) {
    max-width: 130px;
    margin: 20px auto 0;
  }
`;

const JapanMapStyle = styled.div`
  margin-top: 60px;
  position: relative;
  img {
    width: 100%;
  }
  @media (max-width: 640px) {
    margin: 30px auto;
    max-width: 50%;
  }
`;
const MapAreaItemWrapStyle = styled.div`
  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    gap: 10px;
    width: 100%;
    & > div {
      width: auto;
    }
  }
`;
const MapAreaItemStyle = styled.div`
  width: max(60px, 8%);
  padding: 6px;
  border: 1px solid #7dd4df;
  border-radius: 8px;
  text-align: center;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  @media (max-width: 640px) {
    position: static;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .area_icon {
    margin-top: 5px;
    img {
      height: 44px;
      max-width: 100%;
    }
  }
  .area_name {
    background: #7dd4df;
    color: #e3fcff;
    font-size: 14px;
    margin: -6px -6px 0;
    border-radius: 8px 8px 0 0;
  }
  .weather_temp[data-content='week'] {
    font-size: 1em;
    color: #999;
    &:after {
      content: '℃';
      display: inline;
    }
  }
  &.invisible-area {
    display: none;
  }
`;
const MapAreaStyle = styled.div`
  position: relative;
  .Kushiro {
    // 釧路
    top: 0;
    left: 30%;
  }
  .Kamikawa {
    // 旭川
    top: 0;
    left: calc(max(60px, 8%) * 1.3 + 30%);
  }
  .Ishikari {
    // 札幌
    top: 0;
    left: calc(max(60px, 8%) * 2.6 + 30%);
  }
  .Aomori {
    // 青森
    top: 17%;
    left: 25%;
  }
  .Akita {
    // 秋田
    top: 17%;
    left: calc(max(60px, 8%) * 1.3 + 25%);
  }
  .Miyagi {
    // 仙台
    top: 17%;
    left: calc(max(60px, 8%) * 2.6 + 25%);
  }
  .Niigata {
    // 新潟
    top: 35%;
    left: 30%;
  }
  .Ishikawa {
    // 金沢
    top: 35%;
    left: calc(max(60px, 8%) * 1.3 + 30%);
  }
  .Nagano {
    // 長野
    top: 35%;
    left: calc(max(60px, 8%) * 2.6 + 30%);
  }
  .Tokyo {
    // 東京
    top: 50%;
    left: 80%;
  }
  .Tochigi {
    // 栃木
    top: 34%;
    left: 85%;
  }

  .Aichi {
    // 名古屋
    top: 70%;
    left: 77%;
  }
  .Osaka {
    // 大阪
    top: 70%;
    left: calc(max(60px, 8%) * 1.3 + 77%);
  }
  .Kagawa {
    // 高松
    top: 90%;
    left: 30%;
  }
  .Kagawa {
    // 高松
    top: 90%;
    left: 30%;
  }
  .Kochi {
    // 高知
    top: 90%;
    left: calc(max(60px, 8%) * 1.3 + 30%);
  }
  .Shimane {
    // 松江
    top: 52%;
    left: 25%;
  }
  .Hiroshima {
    // 広島
    top: 52%;
    left: calc(max(60px, 8%) * 1.3 + 25%);
  }
  .Fukuoka {
    // 福岡
    top: 60%;
    left: 0;
  }
  .Kagoshima {
    // 鹿児島
    top: 60%;
    left: calc(max(60px, 8%) * 1.3);
  }

  .Okinawa {
    // 沖縄
    top: 90%;
    left: 60%;
  }
  .Yaeyama {
    // 石垣
    top: 90%;
    left: calc(max(60px, 8%) * 1.3 + 60%);
  }
  .guGXxx {
    // 奄美
    top: 93%;
    left: 15%;
  }
`;
