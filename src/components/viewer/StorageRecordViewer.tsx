import React from "react";
import CentredPanelWithDeleteBtn from "../panel/centredPanelWithDeleteBtn";
import LabelTextbox from "../textbox/labelTextbox";
import Textbox from "../textbox/textbox";
import { Field } from "../../store/reducers/fieldReducer";
import Combobox from "../combobox/combobox";
import { StorageRecord } from "../../store/reducers/storageReducer";
import ValueLabel from "../label/valueLabel";

type Props = {
  id: number;
  data: StorageRecord;
  onDeleteBtnClick: (id: number) => void;
  onDateChanged: (id: number, value: string) => void;
  onTypeChanged: (id: number, value: string) => void;
  onAmountChanged: (id: number, value: number) => void;
  onDescriptionChanged: (id: number, value: string) => void;
  valueAfterAction: number;
}

const StorageRecordViewer: React.FC<Props> = (props) => {
  const { id, data } = props;

  const onDateChanged = (value: string) => {
    props.onDateChanged(id, value);
  };

  const onTypeChanged = (value: number) => {
    props.onTypeChanged(id, value === 0 ? "Przychud" : "Rozchud");
  };

  const onAmountChanged = (value: string) => {
    props.onAmountChanged(id, Number(value));
  };

  const onDescriptionChanged = (value: string) => {
    props.onDescriptionChanged(id, value);
  };

  return (
    <CentredPanelWithDeleteBtn
      width="287px"
      height="194px"
      flex-column
      onDeleteBtnClicked={() => props.onDeleteBtnClick(id)}
    >
      <Textbox
        description="Data"
        defaultValue={data.date}
        onEdit={onDateChanged}
      />

      <Combobox
        description="Typ"
        values={[{ key: 0, value: "Przychud" }, { key: 1, value: "Rozchud" }]}
        defaultValue={data.type === "Przychud" ? 0 : 1}
        onEdit={onTypeChanged}
      />

      <Textbox
        description="Ilość"
        defaultValue={data.amount.toString()}
        onEdit={onAmountChanged}
        onlyNumbers
      />

      <Textbox
        description="Opis"
        defaultValue={data.description}
        onEdit={onDescriptionChanged}
      />

      <ValueLabel
        description="Stan po akcji"
        width="265px"
        height="40px"
        marginLeft="30px"
        value={`${props.valueAfterAction} ton`}
      />
    </CentredPanelWithDeleteBtn>
  )
}
export default StorageRecordViewer
