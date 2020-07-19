import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Flex from "../components/layout/flex";
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { RootState } from '../store/store';
import PanelLabel from '../components/label/panelLabel';
import Grid from '../components/layout/grid';
import { CropState, Crop as CropModel } from '../store/reducers/cropReducer';
import { removeCrop, createCrop, editCrop } from '../store/actions/cropActions';
import CropViewer from '../components/viewer/cropViewer';
import { FieldsState } from '../store/reducers/fieldReducer';
import { removeStorageRecordsByProduct } from '../store/actions/storageActions';

const Crop = () => {
  const dispatch = useDispatch();
  const crops = useSelector<RootState, CropState["crops"]>((state) => state.crops.crops);
  const fields = useSelector<RootState, FieldsState["fields"]>((state) => state.fields.fields);

  const onRemoveClick = (id: number) => {    
    const crop = crops.filter(crop => crop.id === id)[0];
    const product = crop.plant + " " + crop.plantVariant;

    dispatch(removeStorageRecordsByProduct(product))
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
    dispatch(editCrop(id, { name: value }));
  }

  const onPlantVariantChanged = (id: number, value: string) => {
    dispatch(editCrop(id, { plantVariant: value }));
  }

  const onCropTypeChanged = (id: number, value: string) => {
    dispatch(editCrop(id, { cropType: value }));
  }

  const onFieldChanged = (id: number, value?: number) => {
    let autocomplete = areaSizeAutoCompleteBasedOnField(value);
    autocomplete.field = value;

    dispatch(editCrop(id, autocomplete));
  }

  const areaSizeAutoCompleteBasedOnField = ( fieldNumber?: number) => {
    const field = fieldNumber === undefined ? undefined : fields.filter(({id}) => id === fieldNumber)[0];
    let autocomplete: Partial<CropModel> = {};

    if (field)
     autocomplete.areaInHectares = field.areaInHectares;

    return autocomplete;
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
