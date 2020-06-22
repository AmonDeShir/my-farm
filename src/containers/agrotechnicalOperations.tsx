import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Flex from "../components/layout/flex";
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';
import PanelLabel from '../components/label/panelLabel';
import { CropState } from '../store/reducers/cropReducer';
import { removeCrop, createCrop, editCrop } from '../store/actions/cropActions';
import { FieldsState } from '../store/reducers/fieldReducer';
import Column from '../components/layout/column';
import { AgrotechnicalOperationState, agrotechnicalOperationReducer } from '../store/reducers/agrotechnicalOperationsReducer';
import AgrotechnicalOperationViewer from "../components/viewer/AgrotechnicalOperationViewer";
import { createAgrotechnicalOperation, editAgrotechnicalOperation } from '../store/actions/agrotechnicalOperationsActions';
import Grid from '../components/layout/grid';

const AgrotechnicalOperations = () => {
  const dispatch = useDispatch();
  const crops = useSelector<RootState, CropState["crops"]>((state) => state.crops.crops);
  const fields = useSelector<RootState, FieldsState["fields"]>((state) => state.fields.fields);
  const operations = useSelector<RootState, AgrotechnicalOperationState["operations"]>((state) => state.agrotechnicalOperation.operations);

  const onRemoveClick = (id: number) => {
    dispatch(removeCrop(id));
  }

  const onCreate = () => {
    dispatch(createAgrotechnicalOperation());
  }

  const onActivityChanged = (id: number, value: string) => {
    dispatch(editAgrotechnicalOperation(id, { activity: value }));
  }

  const onCropChanged = (id: number, value?: number) => {
    dispatch(editAgrotechnicalOperation(id, { crop: value }));
  }

  const onFieldChanged = (id: number, value?: number) => {
    dispatch(editAgrotechnicalOperation(id, { field: value }));
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
            fields={fields.map(({name, id}) => ({key: id, value:name}))}
            crops={crops.map(({name, id}) => ({key: id, value:name}))}
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
