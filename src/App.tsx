import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StatsContext, { StatsContextType } from "./context/statsContext";
import { getTotalGlobalStats, getStatsByCountry } from "./utils/dataFetchers";
import Loading from "./components/app/Loading";
import Layout from "./components/layouts/v1/Layout";
import ms from "ms";

const Home = lazy(() => import("./components/app/Home"));

const App = () => {
  // StatsContext state.
  const [statsState, setStatsState] = useState<StatsContextType>({});

  useEffect(() => {
    (async () => {
      let refreshData = false;
      try {
        if (statsState.totalStats) {
          // TODO: Check if the data cache stored in state has expired.
        } else {
          refreshData = true;
        }

        if (refreshData) {
          const statsData = await Promise.all([
            getTotalGlobalStats(),
            getStatsByCountry()
          ]);

          const summaryCaribbeanStats = statsData[1].statsByCountry.reduce(
            (accumulator, currentValue) => {
              accumulator.cases += currentValue.cases;
              accumulator.deaths += currentValue.deaths;
              accumulator.recovered += currentValue.recovered;

              if (statsData[0].lastUpdated < currentValue.lastUpdated) {
                accumulator.lastUpdated = currentValue.lastUpdated;
              }
              return accumulator;
            },
            {
              cases: 0,
              deaths: 0,
              recovered: 0,
              lastUpdated: statsData[0].lastUpdated
            }
          );

          setStatsState({
            totalStats: statsData[0],
            totalCaribbeanStats: summaryCaribbeanStats,
            statsByCountry: statsData[1].statsByCountry,
            countriesWithNoConfirmedCases:
              statsData[1].countriesWithNoConfirmedCases,
            lastUpdated: summaryCaribbeanStats.lastUpdated,
            cacheExpiresOn: Date.now() + parseInt(ms("15m").toString())
          });
        }
      } catch (error) {}
    })();
  }, [statsState]);

  return (
    <StatsContext.Provider value={statsState}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/">
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </StatsContext.Provider>
  );
};

export default App;
