import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Layout from "../layout/layout";
import { Route } from "react-router-dom";
import { store } from "../store/store";
import farm from "../containers/farm";
import Farm from "../containers/farm";

ReactDOM.render(
  <Layout>
    <Provider store={store}>
      <Route path="/">
        <Farm/>
      </Route>
    </Provider>
  </Layout>,
  document.getElementById("app")
);
