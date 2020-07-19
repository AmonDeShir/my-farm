import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Flex from "../components/layout/flex";
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';
import PanelLabel from '../components/label/panelLabel';
import { CropState, Crop } from '../store/reducers/cropReducer';
import { FieldsState } from '../store/reducers/fieldReducer';
import { AgrotechnicalOperationState, AgrotechnicalOperation } from '../store/reducers/agrotechnicalOperationsReducer';
import AgrotechnicalOperationViewer from "../components/viewer/agrotechnicalOperationViewer";
import { createAgrotechnicalOperation, editAgrotechnicalOperation, removeAgrotechnicalOperation } from '../store/actions/agrotechnicalOperationsActions';
import Grid from '../components/layout/grid';

const AgrotechnicalOperations = () => {
  const dispatch = useDispatch();
  const crops = useSelector<RootState, CropState["crops"]>((state) => state.crops.crops);
  const fields = useSelector<RootState, FieldsState["fields"]>((state) => state.fields.fields);
  const operations = useSelector<RootState, AgrotechnicalOperationState["operations"]>((state) => state.agrotechnicalOperation.operations);

  const onRemoveClick = (id: number) => {
    dispatch(removeAgrotechnicalOperation(id));
  }

  const onCreate = () => {
    dispatch(createAgrotechnicalOperation());
  }

  const onActivityChanged = (id: number, value: string) => {
    dispatch(editAgrotechnicalOperation(id, { activity: value }));
  }

  const onCropChanged = (id: number, value?: number) => {
    let update = autoCompleteBasedOnDataFromCrop(value);
    update.crop = value;

    dispatch(editAgrotechnicalOperation(id, update));
  }

  const autoCompleteBasedOnDataFromCrop = (cropNumber?: number) => {
    const crop = getCrop(cropNumber);
    const field = getFieldFromCrop(crop);
    let autocomplete: Partial<AgrotechnicalOperation> = {};

    if (!crop)
      return {};

    if (crop.areaInHectares > 0)
      autocomplete.workingAreaInHectare = crop.areaInHectares

    if (field)
      autocomplete.field = field.id;

    return autocomplete;
  }

  const getCrop = (cropNumber?: number) => {
    const crop = cropNumber === undefined ? undefined : crops.filter(({ id }) => id === cropNumber)[0];

    return crop;
  }

  const getFieldFromCrop = (crop?: Crop) => {
    const field = crop?.field === undefined ? undefined : fields.filter(({ id }) => id === crop.field)[0];

    return field;
  }


  const onFieldChanged = (id: number, value?: number) => {
    let update = autoCompleteBasedOnField(id, value);
    update.field = value;
  
    dispatch(editAgrotechnicalOperation(id, update));
  }

  const autoCompleteBasedOnField = (id: number, fieldNumber?: number) => {
    const operation = operations.filter(operation => operation.id === id)[0];
    const field = getField(fieldNumber);
    let autocomplete: Partial<AgrotechnicalOperation> = {};


    if (operation.crop) {
      const cropField = getFieldFromCrop(getCrop(operation.crop));

      if (!cropField)
        autocomplete.crop = undefined;

      if (cropField?.id !== field?.id)
        autocomplete.crop = undefined;
    }

    if (field)
      autocomplete.workingAreaInHectare = field.areaInHectares;

    return autocomplete;
  }

  const getField = (fieldId?: number) => {
    const field = fieldId === undefined ? undefined : fields.filter(({ id }) => id === fieldId)[0];

    return field;
  }

  const onDateChanged = (id: number, value: string) => {
    dispatch(editAgrotechnicalOperation(id, { date: value }));
  }

  const onDescriptionChaged = (id: number, value: string) => {
    dispatch(editAgrotechnicalOperation(id, { description: value }));
  }

  const onWorkingAreaInHectaresChanged = (id: number, value: number) => {
    dispatch(editAgrotechnicalOperation(id, { workingAreaInHectare: value }));
  }

  return (
    <>
      <Flex width="100%">
        <PanelLabel largeFont>Operacje Agrotechniczne</PanelLabel>
        <PanelLabel largeFont small margin>Wszystkie</PanelLabel>
      </Flex>

      <Grid column-size="305px" row-size="294px">
        {operations.map(operation =>
          <AgrotechnicalOperationViewer
            id={operation.id}
            key={operation.id}
            fields={fields.map(({ name, id }) => ({ key: id, value: name }))}
            crops={crops.map(({ name, id }) => ({ key: id, value: name }))}
            data={operation}
            onActivityChanged={onActivityChanged}
            onCropChanged={onCropChanged}
            onFieldChanged={onFieldChanged}
            onDateChanged={onDateChanged}
            onDescriptionChaged={onDescriptionChaged}
            onWorkingAreaInHectaresChanged={onWorkingAreaInHectaresChanged}
            onDeleteBtnClick={onRemoveClick}
          />
        )}

        <Center width="295px" height="256px">
          <AddBtn small onClick={onCreate} />
        </Center>
      </Grid>
    </>
  )
}

export default AgrotechnicalOperations
