import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Top } from './components/pages/Top';
import { AllArea } from './components/pages/AllArea';
import { Page404 } from './components/pages/Page404';
import { AreaProvider } from './providers/AreaProvider';
import { useGetApiData } from './hooks/useGetApiData';
// import { useGetWeatherData } from './hooks/useGetWeatherData';
import { useGetAllWeatherData } from './hooks/useGetAllWeatherData';
import './assets/css/fonts/general.css';
import './App.css';

const App: React.FC = () => {
  console.log('APPをレンダリングします');
  // 全国の外部データ取得
  const { selectArea } = useGetApiData();
  const { allWeatherData } = useGetAllWeatherData();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <AreaProvider>
              <Top
              // weatherData={weatherData}
              // setTargetAreaCode={setTargetAreaCode}
              // targetAreaCode={targetAreaCode}
              // selectArea={selectArea}
              // loading={loading}
              />
            </AreaProvider>
          </Route>
          <Route path="/all-area">
            <AllArea allWeatherData={allWeatherData} selectArea={selectArea} />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
