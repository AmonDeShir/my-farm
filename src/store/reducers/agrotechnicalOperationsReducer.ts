import { AgrotechnicalOperationAction } from "../actions/agrotechnicalOperationsActions"

export type AgrotechnicalOperation = {
  id: number,
  date: string,
  crop?: number,
  field?: number,
  activity: string,
  workingAreaInHectare: number,
  description: string,
}

export type AgrotechnicalOperationState = {
  lastId: number;
  operations: AgrotechnicalOperation[];
}

const initalState: AgrotechnicalOperationState = {
  lastId: 0,
  operations: []
}

export const agrotechnicalOperationReducer = (state: AgrotechnicalOperationState = initalState, action: AgrotechnicalOperationAction): AgrotechnicalOperationState => {
  switch (action.type) {
    case "SET_AGROTECHNICAL_OPERATIONS": {
      return action.payload.state;
    }

    case "CREATE_AGROTECHNICAL_OPERATION": {
      return {
        ...state,
        operations: [
          ...state.operations,
          {
            id: state.lastId,
            date: "",
            crop: undefined,
            field: undefined,
            activity: "",
            workingAreaInHectare: 0,
            description: ""
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "CREATE_AGROTECHNICAL_OPERATION_BY_CROPS": {
      return {
        ...state,
        operations: [
          ...state.operations,
          {
            id: state.lastId,
            date: "",
            crop: action.payload.crops,
            field: undefined,
            activity: "",
            workingAreaInHectare: 0,
            description: ""
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "CREATE_AGROTECHNICAL_OPERATION_BY_FIELDS": {
      return {
        ...state,
        operations: [
          ...state.operations,
          {
            id: state.lastId,
            date: "",
            crop: undefined,
            field: action.payload.field,
            activity: "",
            workingAreaInHectare: 0,
            description: ""
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "EDIT_AGROTECHNICAL_OPERATION": {
      return {
        ...state,
        operations: state.operations.map((operation) => {
          if (operation.id == action.payload.id)
            return {
              ...operation,
              ...action.payload.data,
            }

          return operation;
        })
      }
    }

    case "REMOVE_AGROTECHNICAL_OPERATION": {
      return {
        ...state,
        operations: state.operations.filter(({ id }) => id !== action.payload.id)
      }
    }

    default: return state;
  }
}