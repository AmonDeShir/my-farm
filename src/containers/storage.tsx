import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Flex from "../components/layout/flex";
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';
import PanelLabel from '../components/label/panelLabel';
import { CropState, Crop } from '../store/reducers/cropReducer';
import { removeStorageRecord, createStorageRecord, editStorageRecord } from '../store/actions/storageActions';
import Column from '../components/layout/column';
import StorageTypeViewer from "../components/viewer/StorageTypeViewer"
import { StorageState, StorageRecord } from '../store/reducers/storageReducer';
import StorageRecordViewer from '../components/viewer/StorageRecordViewer';

const Storage = () => {
  const dispatch = useDispatch();
  const crops = useSelector<RootState, CropState["crops"]>((state) => state.crops.crops);
  const records = useSelector<RootState, StorageState["records"]>((state) => state.storage.records);

  const sortByDate = (records: { date: string }[]) => {
    const sorted = records.filter(() => true).sort((recordA, recordB) => {
      const dateA = dateToYear(recordA.date);
      const dateB = dateToYear(recordB.date);

      return dateA - dateB;
    })

    return sorted;
  }

  const dateToYear = (date: string) => {
    const [days, months, years] = date.split("/");
    const dayToYear = 1 / 360;
    const monthToYear = 1 / 12;

    return Number(years) + Number(months) * monthToYear + Number(days) * dayToYear;
  }

  const onRemoveClick = (id: number) => {
    dispatch(removeStorageRecord(id));
  }

  const onCreate = (cropId: string) => {
    dispatch(createStorageRecord(cropId));
  }

  const onDateChanged = (id: number, value: string) => {
    dispatch(editStorageRecord(id, { date: value }));
  }

  const onTypeChanged = (id: number, value: string) => {
    dispatch(editStorageRecord(id, { type: value }));
  }

  const onAmountChanged = (id: number, value: number) => {
    dispatch(editStorageRecord(id, { amount: value }));
  }

  const onDescriptionChanged = (id: number, value: string) => {
    dispatch(editStorageRecord(id, { description: value }));
  }

  const calcProductAmount = (product: string) => {
    let sorted = records.filter(record => record.product === product);
    sorted = sortByDate(sorted) as StorageRecord[];
    let result = 0;

    for (const { amount, type } of sorted) {
      if (type === "Przychud")
        result += amount;
      else
        result -= amount;
    }

    return result;
  }

  const calcProductAmountForRecord = (product: string, record: StorageRecord) => {
    let result = 0;
    let sorted = records.filter(record => record.product === product);

    sorted = sortByDate(sorted) as StorageRecord[];
    console.log(sorted);

    const lastId = sorted.indexOf(record);
    console.log(lastId);

    const finalRecords = sorted.splice(0, lastId + 1);
    console.log(finalRecords);

    for (const { amount, type } of finalRecords) {
      if (type === "Przychud")
        result += amount;
      else
        result -= amount;
    }

    return result
  }

  const products = (crops: Crop[]) => {
    const products = crops.map(crop => crop.plant + " " + crop.plantVariant);
    const uniqueProducts = Array.from(new Set(products));

    return uniqueProducts;
  }


  return (
    <>
      <Flex>
        <PanelLabel largeFont>Magazyn</PanelLabel>
      </Flex>

      <Flex width="100%">
        {products(crops).map(product =>
          <React.Fragment key={product}>
            <Column width="297px">
              <StorageTypeViewer amount={calcProductAmount(product)}>
                {product}
              </StorageTypeViewer>

              {records.filter(record => record.product === product).map(record =>
                <StorageRecordViewer
                  data={record}
                  id={record.id}
                  key={record.id}
                  valueAfterAction={calcProductAmountForRecord(product, record)}
                  onAmountChanged={onAmountChanged}
                  onDateChanged={onDateChanged}
                  onDescriptionChanged={onDescriptionChanged}
                  onTypeChanged={onTypeChanged}
                  onDeleteBtnClick={onRemoveClick}
                />
              )}

              <Center width="287px" height="194px">
                <AddBtn small onClick={() => onCreate(product)} />
              </Center>
            </Column>
          </React.Fragment>
        )}
      </Flex>
    </>
  )
}

export default Storage
