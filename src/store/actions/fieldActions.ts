import { Field } from "../reducers/FieldReducer";

type EditField = {
  type: "CREATE_FIELD", payload: {}
};

type CreateField = {
  type: "EDIT_FIELD", payload: {
    id: number,
    data: Partial<Field>
  }
};

type RemoveField = {
  type: "REMOVE_FIELD", payload: {
    id: number
  }
};


export type FieldAction = EditField
  | CreateField
  | RemoveField;


export const createField = (): FieldAction => ({
  type: "CREATE_FIELD",
  payload: {}
});

export const editField = (id: number, data: Partial<Field>): FieldAction => ({
  type: "EDIT_FIELD",
  payload: {
    id: id,
    data: data
  }
});

export const removeField = (id: number): FieldAction => ({
  type: "REMOVE_FIELD",
  payload: {
    id: id,
  }
});
