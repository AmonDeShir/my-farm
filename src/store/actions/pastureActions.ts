import { Pasture, PasturesState } from "../reducers/pastureReducer";

type EditPasture = {
  type: "CREATE_PASTURE", payload: {}
};

type CreatePasture = {
  type: "EDIT_PASTURE", payload: {
    id: number,
    data: Partial<Pasture>
  }
};

type RemovePasture = {
  type: "REMOVE_PASTURE", payload: {
    id: number
  }
};

type SetPastures = {
  type: "SET_PASTURES", payload: {
    state: PasturesState
  }
};

export type PastureAction = EditPasture
  | CreatePasture
  | RemovePasture
  | SetPastures;


export const createPasture = (): PastureAction => ({
  type: "CREATE_PASTURE",
  payload: {}
});

export const editPasture = (id: number, data: Partial<Pasture>): PastureAction => ({
  type: "EDIT_PASTURE",
  payload: {
    id: id,
    data: data
  }
});

export const removePasture = (id: number): PastureAction => ({
  type: "REMOVE_PASTURE",
  payload: {
    id: id,
  }
});

export const setPastures = (state: PasturesState):PastureAction => ({
  type: "SET_PASTURES",
  payload: {
    state: state
  }
});
