import { FieldAction } from "../actions/fieldActions"
import { CropAction } from "../actions/cropActions"

export type Crop = {
  name: string;
  plant: string,
  plantVariant: string,
  cropType: string,
  field?: number,
  areaInHectares: number,
  id: number
}

export type CropState = {
  lastId: number;
  crops: Crop[];
}

const initalState: CropState = {
  lastId: 0,
  crops: []
}

export const cropsReducer = (state: CropState = initalState, action: CropAction): CropState => {
  switch (action.type) {
    case "SET_CROPS": {
      return action.payload.state;
    }

    case "CREATE_CROP": {
      return {
        ...state,
        crops: [
          ...state.crops,
          {
            id: state.lastId,
            name: "",
            plant: "",
            plantVariant: "",
            cropType: "Plon Główn",
            field: undefined,
            areaInHectares: 0,
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "EDIT_CROP": {
      return {
        ...state,
        crops: state.crops.map((crop) => {
          if (crop.id == action.payload.id)
            return {
              ...crop,
              ...action.payload.data,
            }

          return crop;
        })
      }
    }

    case "REMOVE_CROP": {
      return {
        ...state,
        crops: state.crops.filter(({ id }) => id !== action.payload.id)
      }
    }

    default: return state;
  }
}