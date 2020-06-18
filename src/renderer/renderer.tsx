import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Layout from "../layout/layout";
import { Route } from "react-router-dom";
import { store } from "../store/store";
import Farm from "../containers/farm";
import Fields from "../containers/fields";

ReactDOM.render(
  <Layout>
    <Provider store={store}>
      <Route path="/" exact component={Farm}/>
      <Route path="/fields" component={Fields} />
    </Provider>
  </Layout>,
  document.getElementById("app")
);
