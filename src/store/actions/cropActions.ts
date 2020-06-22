import { Crop, CropState } from "../reducers/cropReducer";

type EditCrop = {
  type: "CREATE_CROP", payload: {}
};

type CreateCrop = {
  type: "EDIT_CROP", payload: {
    id: number,
    data: Partial<Crop>
  }
};

type RemoveCrop = {
  type: "REMOVE_CROP", payload: {
    id: number
  }
};

type SetCrops = {
  type: "SET_CROPS", payload: {
    state: CropState
  }
};

export type CropAction = EditCrop
  | CreateCrop
  | RemoveCrop
  | SetCrops;


export const createCrop = (): CropAction => ({
  type: "CREATE_CROP",
  payload: {}
});

export const editCrop = (id: number, data: Partial<Crop>): CropAction => ({
  type: "EDIT_CROP",
  payload: {
    id: id,
    data: data
  }
});

export const removeCrop = (id: number): CropAction => ({
  type: "REMOVE_CROP",
  payload: {
    id: id,
  }
});

export const setCrops = (state: CropState): CropAction => ({
  type: "SET_CROPS",
  payload: {
    state: state
  }
});
