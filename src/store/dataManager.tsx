import Store from "electron-store";
import React from "react";
import { useDispatch } from "react-redux";
import { setAgrotechnicalOperation } from "./actions/agrotechnicalOperationsActions";
import { setCrops } from "./actions/cropActions";
import { setFarm } from "./actions/farmActions";
import { setFields } from "./actions/fieldActions";
import { setPastures } from "./actions/pastureActions";
import { store } from "./store";
import { setStorageRecords } from "./actions/storageActions";

export const electronStore = new Store();

export const SaveReduxStore = () => {
  electronStore.set("agrotechnicalOperation_json", JSON.stringify(store.getState().agrotechnicalOperation));
  electronStore.set("crops_json", JSON.stringify(store.getState().crops));
  electronStore.set("farm_json", JSON.stringify(store.getState().farm));
  electronStore.set("fields_json", JSON.stringify(store.getState().fields));
  electronStore.set("pastures_json", JSON.stringify(store.getState().pastures));
  electronStore.set("storage_json", JSON.stringify(store.getState().storage));
}

export const LoadReduxStore = () => {
  const dispatch = useDispatch();

  const loadData = () => {
    load("agrotechnicalOperation_json",setAgrotechnicalOperation);
    load("crops_json",setCrops);
    load("farm_json",setFarm);
    load("fields_json",setFields);
    load("pastures_json",setPastures);
    load("storage_json",setStorageRecords);


    window.onbeforeunload = () => SaveReduxStore();
  };

  const load = (name: string, action: any) => {
    console.log("loading", name);
    const data = getFile(name);
    loadToStore(action, data);
  }

  const getFile = (name: string) => {
    const file = electronStore.get(name, undefined);

    console.log("loading", name, "result:", file);


    if (file !== undefined)
      return JSON.parse(file);

    return undefined;
  }

  const loadToStore = (action: any, data: any) => {
    console.log("json", "result:", data);


    if (data === undefined)
      return;
    else
      dispatch(action(data));
  }

  return (
    <>
      {loadData()}
    </>
  )
}