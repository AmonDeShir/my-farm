import { PastureAction } from "../actions/pastureActions"

export type Pasture = {
  name: string;
  alphabeticalId: string,
  recordNumber: string,
  areaInHectares: number,
  realizedPackageOrVariant: string,
  id: number,
  typeOfUse:string
}

export type PasturesState = {
  lastId: number;
  pastures: Pasture[];
}

const initalState: PasturesState = {
  lastId: 0,
  pastures: []
}

export const pasturesReducer = (state: PasturesState = initalState, action: PastureAction): PasturesState => {
  switch (action.type) {
    case "SET_PASTURES": {
      return action.payload.state;
    }

    case "CREATE_PASTURE": {
      return {
        ...state,
        pastures: [
          ...state.pastures,
          {
            id: state.lastId,
            alphabeticalId: "A",
            recordNumber: "",
            areaInHectares: 0,
            realizedPackageOrVariant: "",
            name: "",
            typeOfUse: ""
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "EDIT_PASTURE": {
      return {
        ...state,
        pastures: state.pastures.map((pasture) => {
          if (pasture.id == action.payload.id)
            return {
              ...pasture,
              ...action.payload.data,
            }

          return pasture;
        })
      }
    }

    case "REMOVE_PASTURE": {
      return {
        ...state,
        pastures: state.pastures.filter(({ id }) => id !== action.payload.id)
      }
    }

    default: return state;
  }
}