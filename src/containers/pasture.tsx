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
import { createPasture, editPasture, removePasture } from '../store/actions/pastureActions';

const Pasture = () => {
  const dispatch = useDispatch();
  const pastures = useSelector<RootState, PasturesState["pastures"]>((state) => state.pastures.pastures);

  const onRemoveClick = (id: number) => {
    dispatch(removePasture(id));
  }

  const onCreate = () => {
    dispatch(createPasture());
  }

  const onAlphabeticalIdChanged = (id: number, value: string) => {
    dispatch(editPasture(id, { alphabeticalId: value }));
  }

  const onAreaInHectaresChanged = (id: number, value: number) => {
    dispatch(editPasture(id, { areaInHectares: value }));
  }

  const onNameChanged = (id: number, value: string) => {
    dispatch(editPasture(id, { name: value }));
  }

  const onRealizedPackageOrVariantChanged = (id: number, value: string) => {
    dispatch(editPasture(id, { realizedPackageOrVariant: value }));
  }

  const onRecordNumberChanged = (id: number, value: string) => {
    dispatch(editPasture(id, { recordNumber: value }));
  }

  const onTypeOfUseChanged = (id: number, value: string) => {
    dispatch(editPasture(id, { recordNumber: value }));
  }

  return (
    <>
      <Flex>
        <PanelLabel largeFont>Pastwiska</PanelLabel>
      </Flex>

      <Grid column-size="290px" row-size="272px">
        {pastures.map(pasture =>
          <PastureViewer
            id={pasture.id}
            key={pasture.id}
            data={pasture}
            onAlphabeticalIdChanged={onAlphabeticalIdChanged}
            onAreaInHectaresChanged={onAreaInHectaresChanged}
            onNameChanged={onNameChanged}
            onRealizedPackageOrVariantChanged={onRealizedPackageOrVariantChanged}
            onRecordNumberChanged={onRecordNumberChanged}
            onTypeOfUseChanged={onTypeOfUseChanged}
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

export default Pasture
