import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Layout from "../layout/layout";
import { Route } from "react-router-dom";
import { store } from "../store/store";
import Farm from "../containers/farm";
import Fields from "../containers/fields";
import Pasture from "../containers/pasture";
import Crop from "../containers/crop";
import AgrotechnicalOperations from "../containers/agrotechnicalOperations";
import { LoadReduxStore } from "../store/dataManager";
import Storage from "../containers/storage";
import Excel from "../containers/excel";

ReactDOM.render(
  <Layout>
    <Provider store={store}>
      <LoadReduxStore/>
      <Route path="/" exact  render={() => <Farm/>}/>
      <Route path="/fields"  render={() => <Fields/>} />
      <Route path="/pastures" render={() => <Pasture/>} />
      <Route path="/crops" render={() => <Crop/>} />
      <Route path="/agrotechnicalOperations" render={() => <AgrotechnicalOperations/>} />
      <Route path="/storage" render={() => <Storage/>} />
      <Route path="/excel" render={() => <Excel/>} />
    </Provider>
  </Layout>,
  document.getElementById("app")
);
