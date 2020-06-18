import { FarmState } from "../reducers/farmReducer";

type EditOwnerDataAction = {
  type: "EDIT_OWNER_DATA", payload: Partial<FarmState["ownerData"]>
};

type EditFarmNameAction = {
  type: "EDIT_FARM_NAME", payload: string
};

type EditDistrictNumber = {
  type: "EDIT_DISTRICT_NUMBER", payload: string
};

type EditPlEkoNumber = {
  type: "EDIT_PL_EKO_NUMBER", payload: string
};

type CreateEkoPackage = {
  type: "CREATE_EKO_PACKAGE", payload: {}
};

type RemoveEkoPackage = {
  type: "REMOVE_EKO_PACKAGE", payload: {
    id: number
  }
};

type EditEkoPackage = {
  type: "EDIT_EKO_PACKAGE", payload: {
    id: number,
    data: string
  }
};

type CreateAgroEnvPackage = {
  type: "CREATE_AGRO_ENV_PACKAGE", payload: {}
};

type RemoveAgroEnvPackage = {
  type: "REMOVE_AGRO_ENV_PACKAGE", payload: {
    id: number
  }
};

type EditAgroEnvPackage = {
  type: "EDIT_AGRO_ENV_PACKAGE", payload: {
    id: number,
    data: string
  }
};


export type FarmAction = EditOwnerDataAction
  | EditFarmNameAction
  | EditDistrictNumber
  | EditPlEkoNumber
  | CreateEkoPackage
  | RemoveEkoPackage
  | EditEkoPackage
  | CreateAgroEnvPackage
  | RemoveAgroEnvPackage
  | EditAgroEnvPackage;

export const editOwnerData = (ownerData: Partial<FarmState["ownerData"]>): FarmAction => ({
  type: "EDIT_OWNER_DATA",
  payload: ownerData
});

export const editFarmNameAction = (name: string): FarmAction => ({
  type: "EDIT_FARM_NAME",
  payload: name
});

export const editDistrictNumber = (number: string): FarmAction => ({
  type: "EDIT_DISTRICT_NUMBER",
  payload: number
});

export const editPlEkoNumber = (number: string): FarmAction => ({
  type: "EDIT_PL_EKO_NUMBER",
  payload: number
});

export const createEkoPackage = (): FarmAction => ({
  type: "CREATE_EKO_PACKAGE",
  payload: {}
});

export const editEkoPackage = (id: number, pack: string): FarmAction => ({
  type: "EDIT_EKO_PACKAGE",
  payload: {
    id: id,
    data: pack
  }
});

export const removeEkoPackage = (id: number): FarmAction => ({
  type: "REMOVE_EKO_PACKAGE",
  payload: {
    id: id,
  }
});

export const createAgroEnvPackage = (): FarmAction => ({
  type: "CREATE_AGRO_ENV_PACKAGE",
  payload: {}
});

export const editAgroEnvPackage = (id: number, pack: string): FarmAction => ({
  type: "EDIT_AGRO_ENV_PACKAGE",
  payload: {
    id: id,
    data: pack
  }
});

export const removeAgroEnvPackage = (id: number): FarmAction => ({
  type: "REMOVE_AGRO_ENV_PACKAGE",
  payload: {
    id: id,
  }
});
