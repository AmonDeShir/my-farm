import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { FarmState } from "../store/reducers/farmReducer";
import { editOwnerData, editFarmName, editDistrictNumber, editPlEkoNumber, editAgroEnvPackage, editEkoPackage, removeAgroEnvPackage, removeEkoPackage, createAgroEnvPackage, createEkoPackage } from '../store/actions/farmActions';
import TextboxsPanel from "../components/panel/TextboxsPanel";
import PanelLabel from '../components/label/panelLabel';
import Column from "../components/layout/column";
import Flex from "../components/layout/flex";
import Textbox from '../components/textbox/textbox';
import DeletableStringViewer from "../components/viewer/deletableStringViewer"
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';

const Farm = () => {
  const dispatch = useDispatch();

  const ownerData = useSelector<RootState, FarmState["ownerData"]>((state) => state.farm.ownerData)
  const farmName = useSelector<RootState, FarmState["farmName"]>((state) => state.farm.farmName)
  const districtNumber = useSelector<RootState, FarmState["districtNumber"]>((state) => state.farm.districtNumber)
  const plEkoNumber = useSelector<RootState, FarmState["plEkoNumber"]>((state) => state.farm.plEkoNumber)
  const ekoPackages = useSelector<RootState, FarmState["ekoPackages"]>((state) => state.farm.ekoPackages)
  const agroEnvPackages = useSelector<RootState, FarmState["agroEnvPackages"]>((state) => state.farm.agroEnvPackages)

  const onEditOwnerLegalName = (name?: string) => {
    dispatch(editOwnerData({
      "legalName": name
    }));
  }

  const onEditOwnerRecordNumber = (record?: string) => {
    dispatch(editOwnerData({
      recordNumber: record
    }));
  }


  const onEditFarmName = (value: string) => {
    dispatch(editFarmName(value));
  }

  const onEditDistrictNumber = (value: string) => {
    console.log(value, "distric number")
    dispatch(editDistrictNumber(value));
  }

  const onEditPlEkoNumber = (value: string) => {
    console.log(value, "pleko")
    dispatch(editPlEkoNumber(value));
  }

  const onEditAgroEnvPackage = (id: number, value: string) => {
    dispatch(editAgroEnvPackage(id, value));
  }

  const onEditEkoPackage = (id: number, value: string) => {
    dispatch(editEkoPackage(id, value));
  }

  const onRemoveAgroEnvPackage = (id: number) => {
    dispatch(removeAgroEnvPackage(id));
  }

  const onRemoveEkoPackage = (id: number) => {
    dispatch(removeEkoPackage(id));
  }

  const onCreateAgroEnvPackage = () => {
    dispatch(createAgroEnvPackage());
  }

  const onCreateEkoPackage = () => {
    dispatch(createEkoPackage());
  }

  return (
    <Flex>
      <Column width="290px">
        <PanelLabel>Dane Ogólne</PanelLabel>

        <TextboxsPanel width="280px" height="110px">
          <Textbox
            description="Imię i nazwisko podmiotu"
            defaultValue={ownerData.legalName}
            onEdit={onEditOwnerLegalName}
          />
          <Textbox
            description="Numer ewidencyjny"
            defaultValue={ownerData.recordNumber}
            onEdit={onEditOwnerRecordNumber}
          />
        </TextboxsPanel>

        <TextboxsPanel width="280px" height="150px">
          <Textbox
            description="Nazwa gospodarstwa"
            defaultValue={farmName}
            onEdit={onEditFarmName}
          />

          <Textbox
            description="Numer rejonowy"
            defaultValue={districtNumber}
            onEdit={onEditDistrictNumber}
          />

          <Textbox
            description="PL-EKO-07"
            defaultValue={plEkoNumber}
            onEdit={onEditPlEkoNumber}
          />
        </TextboxsPanel>
      </Column>

      <Column width="290px">
        <PanelLabel>Pakiety Ekologiczne</PanelLabel>


        {ekoPackages.map(pack =>
          <DeletableStringViewer
            id={pack.id}
            key={pack.id}
            defaultValue={pack.value}
            onEdit={onEditEkoPackage}
            onDeleteBtnClicked={onRemoveEkoPackage}
          />
        )}

        <Center width="280px" height="40px">
          <AddBtn small onClick={onCreateEkoPackage} />
        </Center>
      </Column>

      <Column width="290px">
        <PanelLabel>Pakiety Rolno-Środowiskowe</PanelLabel>
        {agroEnvPackages.map(pack =>
          <DeletableStringViewer
            id={pack.id}
            key={pack.id}
            defaultValue={pack.value}
            onEdit={onEditAgroEnvPackage}
            onDeleteBtnClicked={onRemoveAgroEnvPackage}
          />
        )}

        <Center width="280px" height="40px">
          <AddBtn small onClick={onCreateAgroEnvPackage} />
        </Center>
      </Column>
    </Flex>
  )
}

export default Farm
