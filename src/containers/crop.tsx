import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Flex from "../components/layout/flex";
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';
import PanelLabel from '../components/label/panelLabel';
import Grid from '../components/layout/grid';
import PastureViewer from '../components/viewer/pastureViewer';
import { PasturesState } from '../store/reducers/pastureReducer';
import { CropState } from '../store/reducers/cropReducer';
import { removeCrop, createCrop, editCrop } from '../store/actions/cropActions';
import CropViewer from '../components/viewer/cropViewer';
import { FieldsState } from '../store/reducers/fieldReducer';

const Crop = () => {
  const dispatch = useDispatch();
  const crops = useSelector<RootState, CropState["crops"]>((state) => state.crops.crops);
  const fields = useSelector<RootState, FieldsState["fields"]>((state) => state.fields.fields);

  const onRemoveClick = (id: number) => {
    dispatch(removeCrop(id));
  }

  const onCreate = () => {
    dispatch(createCrop());
  }

  const onPlantChanged = (id: number, value: string) => {
    dispatch(editCrop(id, { plant: value }));
  }

  const onAreaInHectaresChanged = (id: number, value: number) => {
    dispatch(editCrop(id, { areaInHectares: value }));
  }

  const onNameChanged = (id: number, value: string) => {
    console.log("1", value)
    dispatch(editCrop(id, { name: value }));
    console.log("2", crops[id].name);
  }

  const onPlantVariantChanged = (id: number, value: string) => {
    dispatch(editCrop(id, { plantVariant: value }));
  }

  const onCropTypeChanged = (id: number, value: string) => {
    dispatch(editCrop(id, { cropType: value }));
  }

  const onFieldChanged = (id: number, value?: number) => {
    dispatch(editCrop(id, { field: value }));
    console.log("5", value)
  }

  return (
    <>
      <Flex>
        <PanelLabel largeFont>Uprawy</PanelLabel>
      </Flex>

      <Grid column-size="290px" row-size="315px">
        {crops.map(crop =>
          <CropViewer
            id={crop.id}
            key={crop.id}
            data={crop}
            fieldNames={fields.map(({name, id}) => ({key: id, value:name}))}
            onPlantChanged={onPlantChanged}
            onAreaInHectaresChanged={onAreaInHectaresChanged}
            onNameChanged={onNameChanged}
            onPlantVariantChanged={onPlantVariantChanged}
            onCropTypeChanged={onCropTypeChanged}
            onFieldChanged={onFieldChanged}
            onDeleteBtnClick={onRemoveClick}
          />
        )}

        <Center width="280px" height="262px">
          <AddBtn small onClick={onCreate} />
        </Center>
      </Grid>
    </>
  )
}

export default Crop
