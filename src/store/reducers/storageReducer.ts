import { AgrotechnicalOperationAction } from "../actions/agrotechnicalOperationsActions"
import { StorageAction } from "../actions/storageActions"

export type StorageRecord = {
  id: number,
  date: string,
  type: string,
  amount: number,
  description: string,
  product: string
}

export type StorageState = {
  lastId: number;
  records: StorageRecord[];
}

const initalState: StorageState = {
  lastId: 0,
  records: []
}

export const storageReducer = (state: StorageState = initalState, action: StorageAction): StorageState => {
  switch (action.type) {
    case "SET_STORAGE_RECORDS": {
      return action.payload.state;
    }

    case "CREATE_STORAGE_RECORD": {
      return {
        ...state,
        records: [
          ...state.records,
          {
            id: state.lastId,
            date: "",
            type: "Przychud",
            amount: 0,
            description: "",
            product: action.payload.product
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "EDIT_STORAGE_RECORD": {
      return {
        ...state,
        records: state.records.map((record) => {
          if (record.id == action.payload.id)
            return {
              ...record,
              ...action.payload.data,
            }

          return record;
        })
      }
    }

    case "REMOVE_STORAGE_RECORD": {
      return {
        ...state,
        records: state.records.filter(({ id }) => id !== action.payload.id)
      }
    }

    default: return state;
  }
}