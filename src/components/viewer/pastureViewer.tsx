import React from "react";
import CentredPanelWithDeleteBtn from "../panel/centredPanelWithDeleteBtn";
import LabelTextbox from "../textbox/labelTextbox";
import Textbox from "../textbox/textbox";
import { Pasture } from "../../store/reducers/pastureReducer";

type Props = {
  id: number;
  data: Pasture;
  onDeleteBtnClick: (id: number) => void;
  onAlphabeticalIdChanged: (id: number, value: string) => void;
  onRecordNumberChanged: (id: number, value: string) => void;
  onAreaInHectaresChanged: (id: number, value: number) => void;
  onRealizedPackageOrVariantChanged: (id: number, value: string) => void;
  onNameChanged: (id:number, value: string) => void;
  onTypeOfUseChanged: (id:number, value: string) => void;
}

const PastureViewer: React.FC<Props> = (props) => {
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
    props.onNameChanged(id, value);
  }

  const onTypeOfUseChanged = (value: string) => {
    props.onTypeOfUseChanged(id, value);
  }

  return (
    <CentredPanelWithDeleteBtn
      width="280px"
      height="262px"
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

      <Textbox
        description="Typ użytkowania działki rolnej"
        defaultValue={data.typeOfUse}
        onEdit={onTypeOfUseChanged}
      />
    </CentredPanelWithDeleteBtn>
  )
}
export default PastureViewer
