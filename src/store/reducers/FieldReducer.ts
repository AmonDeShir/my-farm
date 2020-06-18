import { FieldAction } from "../actions/fieldActions"

export type Field = {
  alphabeticalId: string,
  recordNumber: string,
  areaInHectares: number,
  realizedPackageOrVariant: string,
  id: number
}

export type FieldsState = {
  lastId: number;
  fields: Field[];
}

const initalState: FieldsState = {
  lastId: 0,
  fields: []
}

export const FieldsReducer = (state: FieldsState = initalState, action: FieldAction): FieldsState => {
  switch (action.type) {
    case "CREATE_FIELD": {
      return {
        ...state,
        fields: [
          ...state.fields,
          {
            id: state.lastId,
            alphabeticalId: "A",
            recordNumber: "",
            areaInHectares: 0,
            realizedPackageOrVariant: "",
          }
        ],
        lastId: state.lastId + 1
      }
    }

    case "EDIT_FIELD": {
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id == action.payload.id)
            return {
              ...field,
              ...action.payload.data,
            }

          return field;
        })
      }
    }

    case "REMOVE_FIELD": {
      return {
        ...state,
        fields: state.fields.filter(({ id }) => id !== action.payload.id)
      }
    }

    default: return state;
  }
}