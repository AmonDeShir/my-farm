import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { FarmState } from "../store/reducers/farmReducer";
import PanelLabel from '../components/label/panelLabel';
import Column from "../components/layout/column";
import Flex from "../components/layout/flex";
import { RootState } from '../store/store';
import BlueBtn from '../components/buttons/blueBtn';
import { StorageState } from '../store/reducers/storageReducer';
import { removeStorageRecord } from '../store/actions/storageActions';
import ExcelViewer from '../components/viewer/excelViewer';

const Excel = () => {
  const storage = useSelector<RootState, StorageState["records"]>((state) => state.storage.records)

  const generate = () => {
  }

  const getProducts = () => {
    const products = storage.map(record => record.product);

    return Array.from(new Set(products));
  }

  return (
    <Flex>
      <Flex width="100%">
        <PanelLabel largeFont>Excel</PanelLabel>
      </Flex>


      <Column width="290px">
        <PanelLabel>Kartoteki Magazynowe</PanelLabel>
        {getProducts().map(product =>
          <ExcelViewer key={product} onClick={()=>{}}>{product}</ExcelViewer>
        )}
        <BlueBtn onClick={() => { }}>Generuj Wszystko</BlueBtn>
      </Column>

      <Column width="290px">
        <PanelLabel>Rejestr działalności rolniczej</PanelLabel>
        <BlueBtn onClick={() => { }}>Generuj</BlueBtn>
      </Column>
    </Flex>
  )
}

export default Excel
