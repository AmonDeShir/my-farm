import { FarmAction } from "../actions/farmActions";

export type FarmState = {
  ownerData: {
    legalName: string;
    recordNumber: string;
  }
  
  farmName: string;
  districtNumber: string;
  plEkoNumber: string;

  ekoPackages: { id: number, value: string }[];
  agroEnvPackages: { id: number, value: string }[];

  lastAgroEnvPackagesId: number;
  lastEkoPackagesId: number;
}

const initalState: FarmState = {
  ownerData: {
    legalName: "",
    recordNumber: ""
  },

  farmName: "",
  districtNumber: "",
  plEkoNumber: "",
  ekoPackages: [],
  agroEnvPackages: [],
  lastAgroEnvPackagesId: 0,
  lastEkoPackagesId: 0
}

export const farmReducer = (state: FarmState = initalState, action: FarmAction): FarmState => {
  switch (action.type) {
    case "SET_FARM": {
      return action.payload.state;
    }

    case "EDIT_OWNER_DATA": {
      return {
        ...state,
        ownerData: { ...state.ownerData, ...action.payload }
      }
    }

    case "EDIT_FARM_NAME": {
      return {
        ...state,
        farmName: action.payload
      }
    }

    case "EDIT_DISTRICT_NUMBER": {
      return {
        ...state,
        districtNumber: action.payload
      }
    }

    case "EDIT_PL_EKO_NUMBER": {
      return {
        ...state,
        plEkoNumber: action.payload
      }
    }

    case "CREATE_EKO_PACKAGE": {
      return {
        ...state,
        ekoPackages: [
          ...state.ekoPackages,
          {
            id: state.lastEkoPackagesId,
            value: ""
          }
        ],
        lastEkoPackagesId: state.lastEkoPackagesId + 1
      }
    }

    case "EDIT_EKO_PACKAGE": {
      return {
        ...state,
        ekoPackages: state.ekoPackages.map((pack) => {
          if(pack.id == action.payload.id)
            return {
              id: pack.id,
              value: action.payload.data
            }

          return pack;
        })
      }
    }

    case "REMOVE_EKO_PACKAGE": {
      return {
        ...state, 
        ekoPackages: state.ekoPackages.filter(({id}) => id !== action.payload.id)
      }
    }

    case "CREATE_AGRO_ENV_PACKAGE": {
      return {
        ...state,
        agroEnvPackages: [
          ...state.agroEnvPackages,
          {
            id: state.lastAgroEnvPackagesId,
            value: ""
          }
        ],
        lastAgroEnvPackagesId: state.lastAgroEnvPackagesId + 1
      }
    }

    case "EDIT_AGRO_ENV_PACKAGE": {
      return {
        ...state,
        agroEnvPackages: state.agroEnvPackages.map((pack) => {
          if(pack.id == action.payload.id)
            return {
              id: pack.id,
              value: action.payload.data
            }

          return pack;
        })
      }
    }

    case "REMOVE_AGRO_ENV_PACKAGE": {
      return {
        ...state, 
        agroEnvPackages: state.agroEnvPackages.filter(({id}) => id !== action.payload.id)
      }
    }

    default: return state;
  }
}