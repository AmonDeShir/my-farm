import { createStore, combineReducers } from "redux";
import { farmReducer } from "./reducers/farmReducer";
import { fieldsReducer } from "./reducers/fieldReducer";
import { pasturesReducer } from "./reducers/pastureReducer";
import { cropsReducer } from "./reducers/cropReducer";
import { agrotechnicalOperationReducer } from "./reducers/agrotechnicalOperationsReducer";

const rootReducer = combineReducers({
  farm: farmReducer,
  fields: fieldsReducer,
  pastures: pasturesReducer,
  crops: cropsReducer,
  agrotechnicalOperation: agrotechnicalOperationReducer
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);
