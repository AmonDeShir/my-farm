import React from 'react'
import { useSelector } from "react-redux";
import { FarmState } from "../store/reducers/farmReducer";
import PanelLabel from '../components/label/panelLabel';
import Column from "../components/layout/column";
import Flex from "../components/layout/flex";
import { RootState } from '../store/store';
import BlueBtn from '../components/buttons/blueBtn';
import { StorageState } from '../store/reducers/storageReducer';
import ExcelViewer from '../components/viewer/excelViewer';
import RegisterOfAgriEnvironmentalActivities from '../excelGenerators/registerOfAgriEnvironmentalActivities';
import { AgrotechnicalOperation } from '../store/reducers/agrotechnicalOperationsReducer';
import { Field } from '../store/reducers/fieldReducer';
import { Crop } from '../store/reducers/cropReducer';
import { openSaveFileDialog, openErrorDialog, openOkMessageDialog } from '../dialog/dialog';

const Excel = () => {
  const storage = useSelector<RootState, StorageState["records"]>((state) => state.storage.records)
  const farm = useSelector<RootState, FarmState>((state) => state.farm);
  const agroOperations = useSelector<RootState, AgrotechnicalOperation[]>((state) => state.agrotechnicalOperation.operations);
  const fields = useSelector<RootState, Field[]>((state) => state.fields.fields);
  const crops = useSelector<RootState, Crop[]>((state) => state.crops.crops);


  const generateRegiter = () => {
    
    const fileName = openSaveFileDialog(
      "Gdzie zapisać wygenerowany pliku excel?",
      "Generuj plik",
      "Rejestr działalności rolnośrodowiskowej PROW.xlsx"
    );

    if (fileName === undefined) {
      openErrorDialog("Error", "Wystąpił błąd podczas pobierania ścieżki od użytkownika!")
      return;
    }

    const registerGenerator = new RegisterOfAgriEnvironmentalActivities(fileName, agroOperations, farm, fields, crops);

    registerGenerator.generate()
      .catch((error) => {
        openErrorDialog("Error", `Wystąpił błąd podczas generowania pliku excel, błąd: ${error}`)
      })
      .then(() => {
        openOkMessageDialog("Gotowe", "Pliki excel zostały wygenerowane pomyślnie")
      })
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
          <ExcelViewer key={product} onClick={() => { }}>{product}</ExcelViewer>
        )}
        <BlueBtn onClick={() => { }}>Generuj Wszystko</BlueBtn>
      </Column>

      <Column width="290px">
        <PanelLabel>Rejestr działalności rolniczej</PanelLabel>
        <BlueBtn onClick={() => { generateRegiter() }}>Generuj</BlueBtn>
      </Column>
    </Flex>
  )
}

export default Excel
