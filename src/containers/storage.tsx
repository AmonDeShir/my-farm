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
import { sortByDate } from '../sort/sort';


const Storage = () => {
  const dispatch = useDispatch();
  const crops = useSelector<RootState, CropState["crops"]>((state) => state.crops.crops);
  const records = useSelector<RootState, StorageState["records"]>((state) => state.storage.records);
  let sortedRecords = sortByDate(records);

  useEffect(() => {
    sortedRecords = sortByDate(records);
  })

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
    let records = leaveOnlyRecordsBelongTo(product);

    return totalRecordsUp(records);
  }

  const leaveOnlyRecordsBelongTo = (product: string) => {
    return sortedRecords.filter(record => record.product === product);
  }

  const totalRecordsUp = (records: StorageRecord[]) => {
    let result = 0;

    for (const { amount, type } of records) {
      if (type === "Przychud")
        result += amount;
      else
        result -= amount;
    }

    return result;
  }

  const calcProductAmountForRecord = (product: string, record: StorageRecord) => {
    let records = leaveOnlyRecordsBelongTo(product);
    records = removeRecordAfter(records, record);

    return totalRecordsUp(records);
  }

  const removeRecordAfter = (records:StorageRecord[], record: StorageRecord) => {
    const limit = records.indexOf(record);
    
    return records.splice(0, limit + 1);
  }

  const getProducts = (crops: Crop[]) => {
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
        {getProducts(crops).map(product =>
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
