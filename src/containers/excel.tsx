import React from 'react'
import { useSelector } from "react-redux";
import { FarmState } from "../store/reducers/farmReducer";
import PanelLabel from '../components/label/panelLabel';
import Column from "../components/layout/column";
import Flex from "../components/layout/flex";
import { RootState } from '../store/store';
import BlueBtn from '../components/buttons/blueBtn';
import { StorageState, StorageRecord } from '../store/reducers/storageReducer';
import ExcelViewer from '../components/viewer/excelViewer';
import RegisterOfAgriEnvironmentalActivities from '../excelGenerators/registerOfAgriEnvironmentalActivities';
import { AgrotechnicalOperation } from '../store/reducers/agrotechnicalOperationsReducer';
import { Field } from '../store/reducers/fieldReducer';
import { Crop } from '../store/reducers/cropReducer';
import { openSaveFileDialog, openErrorDialog, openOkMessageDialog, openSelectFolderDialog } from '../dialog/dialog';
import StorageCarte from '../excelGenerators/storageCarte';

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

    const generator = new RegisterOfAgriEnvironmentalActivities(fileName, agroOperations, farm, fields, crops);

    generator.generate()
      .catch((error) => {
        openErrorDialog("Error", `Wystąpił błąd podczas generowania pliku excel, błąd: ${error}`)
      })
      .then(() => {
        openOkMessageDialog("Gotowe", "Pliki excel zostały wygenerowane pomyślnie")
      })
  }

  const generateStorageCarte = (product_name: string) => {
    const fileName = openSaveFileDialog(
      "Gdzie zapisać wygenerowany pliku excel?",
      "Generuj plik",
      `Kartoteka Magazynowa ${product_name}.xlsx`
    );

    const records = storage.filter(({ product }) => product === product_name);

    if (fileName === undefined) {
      openErrorDialog("Error", "Wystąpił błąd podczas pobierania ścieżki od użytkownika!")
      return;
    }

    const generator = new StorageCarte(fileName, records, farm);

    generator.generate()
      .then(() => {
        openOkMessageDialog("Gotowe", "Plik excel został wygenerowany pomyślnie")
      })
      .catch((error) => {
        openErrorDialog("Error", `Wystąpił błąd podczas generowania pliku excel, błąd: ${error}`)
        console.error(error);
      })
  }

  const getProducts = () => {
    const products = storage.map(record => record.product);

    return Array.from(new Set(products));
  }

  const generateAllStorageCards = () => {
    const folderName = openSelectFolderDialog(
      "Gdzie zapisać wygenerowane pliki excel?",
      "Generuj pliki",
    );

    if (folderName === undefined) {
      openErrorDialog("Error", "Wystąpił błąd podczas pobierania ścieżki od użytkownika!")
      return;
    }

    generateStoragesCards(folderName[0])
      .then(() => {
        openOkMessageDialog("Gotowe", "Pliki excel zostały wygenerowane pomyślnie")
      })
      .catch((error) => {
        openErrorDialog("Error", `Wystąpił błąd podczas generowania plików excel, błąd: ${error}`)
        console.error(error);
      })
  }

  const generateStoragesCards = async (folderName: string) => {
    const products = getProducts();

    for (const product of products) {
      const fileName = `${folderName}/Kartoteka Magazynowa ${product}.xlsx`;
      const records = storage.filter(record => record.product === product);

      const generator = new StorageCarte(fileName, records, farm);
      await generator.generate()
    }
  }

  return (
    <Flex>
      <Flex width="100%">
        <PanelLabel largeFont>Excel</PanelLabel>
      </Flex>


      <Column width="290px">
        <PanelLabel>Kartoteki Magazynowe</PanelLabel>
        {getProducts().map(product =>
          <ExcelViewer key={product} onClick={() => { generateStorageCarte(product) }}>{product}</ExcelViewer>
        )}
        <BlueBtn onClick={() => { generateAllStorageCards() }}>Generuj Wszystko</BlueBtn>
      </Column>

      <Column width="290px">
        <PanelLabel>Rejestr działalności rolniczej</PanelLabel>
        <BlueBtn onClick={() => { generateRegiter() }}>Generuj</BlueBtn>
      </Column>
    </Flex>
  )
}

export default Excel
