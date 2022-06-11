import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Top } from './components/pages/Top';
import { AllArea } from './components/pages/AllArea';
import { Page404 } from './components/pages/Page404';
import { AreaProvider } from './providers/AreaProvider';
import { useGetApiData } from './hooks/useGetApiData';
import { useGetAllWeatherData } from './hooks/useGetAllWeatherData';
import './assets/css/fonts/general.css';
import './App.css';

const App: React.FC = () => {
  // 全国の外部データ取得
  const { selectArea } = useGetApiData();
  const { allWeatherData } = useGetAllWeatherData();

  return (
    <div className="App">
      <AreaProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Top />
            </Route>
            <Route path="/all-area">
              <AllArea
                allWeatherData={allWeatherData}
                selectArea={selectArea}
              />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </BrowserRouter>
      </AreaProvider>
    </div>
  );
};

export default App;
