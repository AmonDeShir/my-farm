import { AgrotechnicalOperation, AgrotechnicalOperationState } from "../reducers/agrotechnicalOperationsReducer";

type CreateAgrotechnicalOperation = {
  type: "CREATE_AGROTECHNICAL_OPERATION", payload: {}
};

type CreateAgrotechnicalOperationByFields = {
  type: "CREATE_AGROTECHNICAL_OPERATION_BY_FIELDS", payload: {
    field: number
  }
};

type CreateAgrotechnicalOperationByCrops = {
  type: "CREATE_AGROTECHNICAL_OPERATION_BY_CROPS", payload: {
    crops: number
  }
};

type EditAgrotechnicalOperation = {
  type: "EDIT_AGROTECHNICAL_OPERATION", payload: {
    id: number,
    data: Partial<AgrotechnicalOperation>
  }
};

type RemoveAgrotechnicalOperation = {
  type: "REMOVE_AGROTECHNICAL_OPERATION", payload: {
    id: number
  }
};

type SetAgrotechnicalOperation = {
  type: "SET_AGROTECHNICAL_OPERATIONS", payload: {
    state: AgrotechnicalOperationState
  }
};


export type AgrotechnicalOperationAction = EditAgrotechnicalOperation
  | CreateAgrotechnicalOperation
  | RemoveAgrotechnicalOperation
  | CreateAgrotechnicalOperationByFields
  | CreateAgrotechnicalOperationByCrops
  | SetAgrotechnicalOperation


export const createAgrotechnicalOperation = (): AgrotechnicalOperationAction => ({
  type: "CREATE_AGROTECHNICAL_OPERATION",
  payload: {}
});

export const createAgrotechnicalOperationByFields = (field: number): AgrotechnicalOperationAction => ({
  type: "CREATE_AGROTECHNICAL_OPERATION_BY_FIELDS",
  payload: {
    field: field
  }
});


export const createAgrotechnicalOperationByCrops = (crops: number): AgrotechnicalOperationAction => ({
  type: "CREATE_AGROTECHNICAL_OPERATION_BY_CROPS",
  payload: {
    crops: crops
  }
});


export const editAgrotechnicalOperation = (id: number, data: Partial<AgrotechnicalOperation>): AgrotechnicalOperationAction => ({
  type: "EDIT_AGROTECHNICAL_OPERATION",
  payload: {
    id: id,
    data: data
  }
});

export const removeAgrotechnicalOperation = (id: number): AgrotechnicalOperationAction => ({
  type: "REMOVE_AGROTECHNICAL_OPERATION",
  payload: {
    id: id,
  }
});

export const setAgrotechnicalOperation = (state: AgrotechnicalOperationState):AgrotechnicalOperationAction => ({
  type: "SET_AGROTECHNICAL_OPERATIONS",
  payload: {
    state: state
  }
});
