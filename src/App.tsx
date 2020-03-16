import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/app/Loading";
import Layout from "./components/layouts/v1/Layout";

const Home = lazy(() => import("./components/app/Home"));

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
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
