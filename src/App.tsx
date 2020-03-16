import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/app/Loading";
import Layout from "./components/layouts/v1/Layout";

const Home = lazy(() => import("./components/app/Home"));
const Stats = lazy(() => import("./components/app/Stats"));
const News = lazy(() => import("./components/app/News"));
const About = lazy(() => import("./components/app/About"));

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </Route>
          <Route exact path="/stats">
            <Suspense fallback={<Loading />}>
              <Stats />
            </Suspense>
          </Route>
          <Route exact path="/news">
            <Suspense fallback={<Loading />}>
              <News />
            </Suspense>
          </Route>
          <Route exact path="/about">
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
