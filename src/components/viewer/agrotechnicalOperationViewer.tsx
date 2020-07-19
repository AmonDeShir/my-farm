import React from "react";
import CentredPanelWithDeleteBtn from "../panel/centredPanelWithDeleteBtn";
import Textbox from "../textbox/textbox";
import Combobox from "../combobox/combobox";;
import { AgrotechnicalOperation } from "../../store/reducers/agrotechnicalOperationsReducer";
import DataTextbox from "../textbox/dataTextbox";

type Props = {
  id: number;
  data: AgrotechnicalOperation;
  crops: { key: number, value: string }[];
  fields: { key: number, value: string }[];
  onDeleteBtnClick: (id: number) => void;
  onDateChanged: (id: number, value: string) => void;
  onCropChanged: (id: number, value: number | undefined) => void;
  onFieldChanged: (id: number, value: number | undefined) => void;
  onActivityChanged: (id: number, value: string) => void;
  onDescriptionChaged: (id: number, value: string) => void;
  onWorkingAreaInHectaresChanged: (id: number, value: number) => void;
}

const AgrotechnicalOperationViewer: React.FC<Props> = (props) => {
  const { id, data } = props;

  const onDateChanged = (value: string) => {
    props.onDateChanged(id, value);
  };

  const onCropChanged = (value: number) => {
    if (value === -1)
      props.onCropChanged(id, undefined);
    else
      props.onCropChanged(id, value);
  }

  const onFieldChanged = (value: number) => {
    if (value === -1)
      props.onFieldChanged(id, undefined);
    else
      props.onFieldChanged(id, value);
  }

  const onActivityChanged = (value: string) => {
    props.onActivityChanged(id, value);
  };

  const onDescriptionChaged = (value: string) => {
    props.onDescriptionChaged(id, value);
  };

  const onWorkingAreaInHectaresChanged = (value: string) => {
    props.onWorkingAreaInHectaresChanged(id, Number(value));
  };

  return (
    <CentredPanelWithDeleteBtn
      width="295px"
      height="284px"
      flex-column
      onDeleteBtnClicked={() => props.onDeleteBtnClick(id)}
    >
      <DataTextbox
        description="Data wykonania
        czyności"
        defaultValue={data.date}
        onEdit={onDateChanged}
      />

      <Combobox
        description="Uprawa"
        values={[...props.crops, { key: -1, value: "Brak" }]}
        defaultValue={data.crop !== undefined ? data.crop : -1}
        onEdit={onCropChanged}
      />

      <Combobox
        description="Pole"
        values={[...props.fields, { key: -1, value: "Brak" }]}
        defaultValue={data.field !== undefined ? data.field : -1}
        onEdit={onFieldChanged}
      />

      <Textbox
        description="Rodzaj wykonanej czyności"
        defaultValue={data.activity}
        onEdit={onActivityChanged}
      />

      <Textbox
        description="Powieszchnia wykonywanej czyności"
        onlyNumbers
        defaultValue={data.workingAreaInHectare.toString()}
        onEdit={onWorkingAreaInHectaresChanged}
      />

      <Textbox
        description="Uwagi"
        defaultValue={data.description}
        onEdit={onDescriptionChaged}
      />

    </CentredPanelWithDeleteBtn>
  )
}
export default AgrotechnicalOperationViewer
