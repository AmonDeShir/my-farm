import React from "react";
import CentredPanelWithDeleteBtn from "../panel/centredPanelWithDeleteBtn";
import LabelTextbox from "../textbox/labelTextbox";
import Textbox from "../textbox/textbox";
import { Field } from "../../store/reducers/fieldReducer";

type Props = {
  id: number;
  data: Field;
  onDeleteBtnClick: (id: number) => void;
  onAlphabeticalIdChanged: (id: number, value: string) => void;
  onRecordNumberChanged: (id: number, value: string) => void;
  onAreaInHectaresChanged: (id: number, value: number) => void;
  onRealizedPackageOrVariantChanged: (id: number, value: string) => void;
  onNameChanged: (id:number, value: string) => void;
}

const FieldViewer: React.FC<Props> = (props) => {
  const { id, data } = props;

  const onAlphabeticalIdChanged = (value: string) => {
    props.onAlphabeticalIdChanged(id, value);
  };

  const onRecordNumberChanged = (value: string) => {
    props.onRecordNumberChanged(id, value);
  };

  const onAreaInHectaresChanged = (value: string) => {
    props.onAreaInHectaresChanged(id, Number(value));
  };

  const onRealizedPackageOrVariantChanged = (value: string) => {
    props.onRealizedPackageOrVariantChanged(id, value);
  };

  const onNameChanged = (value: string) => {
    console.log(value);
    props.onNameChanged(id, value);
  }

  return (
    <CentredPanelWithDeleteBtn
      width="280px"
      height="223px"
      flex-column
      onDeleteBtnClicked={() => props.onDeleteBtnClick(id)}
    >
      <LabelTextbox
        value={data.name}
        onChange={onNameChanged}
        no-border
        large-font
      />
      <Textbox
        description="Oznaczenie działki rolnej"
        defaultValue={data.alphabeticalId}
        onEdit={onAlphabeticalIdChanged}
      />

      <Textbox
        description="Numer Ewidencyjny"
        defaultValue={data.recordNumber}
        onEdit={onRecordNumberChanged}
      />

      <Textbox
        description="Powieszchnia"
        defaultValue={data.areaInHectares.toString()}
        onEdit={onAreaInHectaresChanged}
        onlyNumbers
      />

      <Textbox
        description="Realizowany pakiet/wariant"
        defaultValue={data.realizedPackageOrVariant}
        onEdit={onRealizedPackageOrVariantChanged}
      />
    </CentredPanelWithDeleteBtn>
  )
}
export default FieldViewer
