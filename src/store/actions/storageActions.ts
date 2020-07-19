import { AgrotechnicalOperation, AgrotechnicalOperationState } from "../reducers/agrotechnicalOperationsReducer";
import { StorageState, StorageRecord } from "../reducers/storageReducer";

type CreateStorageRecord = {
  type: "CREATE_STORAGE_RECORD", payload: {
    product: string
  }
};

type EditStorageRecord = {
  type: "EDIT_STORAGE_RECORD", payload: {
    id: number,
    data: Partial<AgrotechnicalOperation>
  }
};

type RemoveStorageRecord = {
  type: "REMOVE_STORAGE_RECORD", payload: {
    id: number
  }
};

type RemoveStorageRecordsByProduct = {
  type: "REMOVE_STORAGE_RECORDS_BY_PRODUCT", payload: {
    product: string;
  }
};


type SetStorageRecords = {
  type: "SET_STORAGE_RECORDS", payload: {
    state: StorageState
  }
};


export type StorageAction = CreateStorageRecord
  | EditStorageRecord
  | RemoveStorageRecord
  | RemoveStorageRecordsByProduct
  | SetStorageRecords


export const createStorageRecord = (product: string): StorageAction => ({
  type: "CREATE_STORAGE_RECORD",
  payload: {
    product: product
  }
});

export const editStorageRecord = (id: number, data: Partial<StorageRecord>): StorageAction => ({
  type: "EDIT_STORAGE_RECORD",
  payload: {
    id: id,
    data: data
  }
});

export const removeStorageRecordsByProduct = (product: string): StorageAction => ({
  type: "REMOVE_STORAGE_RECORDS_BY_PRODUCT",
  payload: {
    product: product,
  }
});

export const removeStorageRecord = (id: number): StorageAction => ({
  type: "REMOVE_STORAGE_RECORD",
  payload: {
    id: id,
  }
});

export const setStorageRecords = (state: StorageState): StorageAction => ({
  type: "SET_STORAGE_RECORDS",
  payload: {
    state: state
  }
});
