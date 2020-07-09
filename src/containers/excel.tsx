import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { FarmState } from "../store/reducers/farmReducer";
import PanelLabel from '../components/label/panelLabel';
import Column from "../components/layout/column";
import Flex from "../components/layout/flex";
import { RootState } from '../store/store';
import BlueBtn from '../components/buttons/blueBtn';
import { StorageState } from '../store/reducers/storageReducer';
import ExcelViewer from '../components/viewer/excelViewer';
import RegisterOfAgriEnvironmentalActivities from '../excelGenerators/registerOfAgriEnvironmentalActivities';
import { remote } from 'electron';
import os from "os";
import path from "path";
import { AgrotechnicalOperation } from '../store/reducers/agrotechnicalOperationsReducer';
import { Field } from '../store/reducers/fieldReducer';
import { Crop } from '../store/reducers/cropReducer';

const Excel = () => {
  const storage = useSelector<RootState, StorageState["records"]>((state) => state.storage.records)
  const farm = useSelector<RootState, FarmState>((state) => state.farm);
  const agroOperations = useSelector<RootState, AgrotechnicalOperation[]>((state) => state.agrotechnicalOperation.operations);
  const fields = useSelector<RootState, Field[]>((state) => state.fields.fields);
  const crops = useSelector<RootState, Crop[]>((state) => state.crops.crops);


  const generateRegiter = () => {
    const win = remote.getCurrentWindow();
    const dialog = remote.dialog;
    const home = os.homedir();
    const dialogOpitons = {
      title: "Gdzie zapisać wygenerowany pliku excel?",
      defaultPath: path.resolve(home, "Rejestr działalności rolnośrodowiskowej PROW.xlsx"),
      buttonLabel: "Generuj plik", filters: [
        { name: 'Excel', extensions: ['xlsx'] },
        { name: 'Wszystkie pliki', extensions: ['*'] }
      ]
    }

    const fileName = dialog.showSaveDialogSync(win, dialogOpitons)

    if (fileName === undefined) {
      generateMsg("error", "Błąd", "Wystąpił błąd podczas pobierania ścieżki od użytkownika!")
      return;
    }

    const registerGenerator = new RegisterOfAgriEnvironmentalActivities(fileName, agroOperations, farm, fields, crops);

    registerGenerator.generate()
      .catch((error) => {
        generateMsg("error", "Błąd", `Wystąpił błąd podczas generowania pliku excel, błąd: ${error}`)
      })
      .then(() => {
        generateMsg("info", "Gotowe", "Pliki excel zostały wygenerowane pomyślnie")
      })

  }

  const generateMsg = (type: "none" | "info" | "error" | "question" | "warning", title: string, message: string) => {
    const win = remote.getCurrentWindow();
    const dialog = remote.dialog;
    const options = {
      type: type,
      buttons: type === "question" ? ["Tak", "Nie"] : ['Ok'],
      title: title,
      message: message,
    };

    dialog.showMessageBoxSync(win, options);
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
