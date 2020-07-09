import { farmReducer } from "./reducers/farmReducer";
import { fieldsReducer } from "./reducers/fieldReducer";
import { pasturesReducer } from "./reducers/pastureReducer";
import { cropsReducer } from "./reducers/cropReducer";
import { agrotechnicalOperationReducer } from "./reducers/agrotechnicalOperationsReducer";
import { storageReducer } from "./reducers/storageReducer";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger'

const rootReducer = combineReducers({
  farm: farmReducer,
  fields: fieldsReducer,
  pastures: pasturesReducer,
  crops: cropsReducer,
  agrotechnicalOperation: agrotechnicalOperationReducer,
  storage: storageReducer
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(logger));
