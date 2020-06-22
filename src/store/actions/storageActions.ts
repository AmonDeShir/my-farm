import { AgrotechnicalOperation, AgrotechnicalOperationState } from "../reducers/agrotechnicalOperationsReducer";
import { StorageState, StorageRecord } from "../reducers/storageReducer";

type CreateStorageRecord = {
  type: "CREATE_STORAGE_RECORD", payload: {}
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

type SetStorageRecords = {
  type: "SET_STORAGE_RECORDS", payload: {
    state: StorageState
  }
};


export type StorageAction = CreateStorageRecord
  | EditStorageRecord
  | RemoveStorageRecord
  | SetStorageRecords;


export const createStorageRecord = (): StorageAction => ({
  type: "CREATE_STORAGE_RECORD",
  payload: {}
});

export const editStorageRecord = (id: number, data: Partial<StorageRecord>): StorageAction => ({
  type: "EDIT_STORAGE_RECORD",
  payload: {
    id: id,
    data: data
  }
});

export const removeStorageRecord = (id: number): StorageAction => ({
  type: "REMOVE_STORAGE_RECORD",
  payload: {
    id: id,
  }
});

export const setStorageRecord = (state: StorageState): StorageAction => ({
  type: "SET_STORAGE_RECORDS",
  payload: {
    state: state
  }
});
