import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Flex from "../components/layout/flex";
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';
import { FieldsState } from '../store/reducers/fieldReducer';
import { createField, removeField, editField } from '../store/actions/fieldActions';
import FieldViewer from '../components/viewer/fieldViewer';
import PanelLabel from '../components/label/panelLabel';
import Grid from '../components/layout/grid';

const Fields = () => {
  const dispatch = useDispatch();
  const fields = useSelector<RootState, FieldsState["fields"]>((state) => state.fields.fields);

  const onRemoveClick = (id: number) => {
    dispatch(removeField(id));
  }

  const onCreate = () => {
    dispatch(createField());
  }

  const onAlphabeticalIdChanged = (id: number, value: string) => {
    dispatch(editField(id, { alphabeticalId: value }));
  }

  const onAreaInHectaresChanged = (id: number, value: number) => {
    dispatch(editField(id, { areaInHectares: value }));
  }

  const onNameChanged = (id: number, value: string) => {
    dispatch(editField(id, { name: value }));
  }

  const onRealizedPackageOrVariantChanged = (id: number, value: string) => {
    dispatch(editField(id, { realizedPackageOrVariant: value }));
  }

  const onRecordNumberChanged = (id: number, value: string) => {
    dispatch(editField(id, { recordNumber: value }));
  }

  return (
    <>
      <Flex>
        <PanelLabel largeFont>Pola</PanelLabel>
      </Flex>

      <Grid column-size="290px" row-size="233px">
        {fields.map(field =>
          <FieldViewer
            id={field.id}
            key={field.id}
            data={field}
            onAlphabeticalIdChanged={onAlphabeticalIdChanged}
            onAreaInHectaresChanged={onAreaInHectaresChanged}
            onNameChanged={onNameChanged}
            onRealizedPackageOrVariantChanged={onRealizedPackageOrVariantChanged}
            onRecordNumberChanged={onRecordNumberChanged}
            onDeleteBtnClick={onRemoveClick}
          />
        )}

        <Center width="280px" height="223px">
          <AddBtn small onClick={onCreate} />
        </Center>
      </Grid>
    </>
  )
}

export default Fields
