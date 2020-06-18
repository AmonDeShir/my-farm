import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import TextboxsPanel from "../components/panel/TextboxsPanel";
import PanelLabel from '../components/label/panelLabel';
import Column from "../components/layout/column";
import Flex from "../components/layout/flex";
import Textbox from '../components/textbox/textbox';
import DeletableStringViewer from "../components/viewer/deletableStringViewer"
import AddBtn from "../components/buttons/addBtn";
import Center from "../components/layout/center";
import { FieldsState, Field } from '../store/reducers/FieldReducer';
import { editField, createField, removeField } from '../store/actions/fieldActions';
import Grid from "../components/layout/grid"

const Fields = () => {
  const dispatch = useDispatch();
  const fields = useSelector<FieldsState, FieldsState["fields"]>((state) => state.fields);

  const onEditField = (id: number, data: Partial<Field>) => {
    dispatch(editField(id, data));
  };

  const onCreateField = () => {
    dispatch(createField());
  };

  const onRemoveField = (id: number) => {
    dispatch(removeField(id));
  };

  return (
    <>
    <Flex>
      <PanelLabel largeFont>Pola</PanelLabel>
    </Flex>
    <Grid column-size="280px" row-size="223px">
    
    </Grid>
    </>
  )
}

export default Fields
