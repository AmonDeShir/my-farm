import { createStore } from "redux";
import { farmReducer } from "./reducers/farmReducer";

export const store = createStore(farmReducer);
