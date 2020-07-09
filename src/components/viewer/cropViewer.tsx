import React from "react";
import CentredPanelWithDeleteBtn from "../panel/centredPanelWithDeleteBtn";
import LabelTextbox from "../textbox/labelTextbox";
import Textbox from "../textbox/textbox";
import Combobox from "../combobox/combobox";
import { Crop } from "../../store/reducers/cropReducer";
import Link from "../navigation/Link";
import styled from "@emotion/styled";
import BlueLink from "../navigation/BlueLink";


const LinkConeainer = styled.div`
  width: 100%;
  height: 38px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

type Props = {
  id: number;
  data: Crop;
  fieldNames: { "key": number, value: string }[];
  onDeleteBtnClick: (id: number) => void;
  onPlantChanged: (id: number, value: string) => void;
  onNameChanged: (id: number, value: string) => void;
  onPlantVariantChanged: (id: number, value: string) => void;
  onCropTypeChanged: (id: number, value: string) => void;
  onFieldChanged: (id: number, value?: number) => void;
  onAreaInHectaresChanged: (id: number, value: number) => void;
}

const CropViewer: React.FC<Props> = (props) => {
  const { id, data } = props;

  const onPlantChanged = (value: string) => {
    props.onPlantChanged(id, value);
  };

  const onNameChanged = (value: string) => {
    props.onNameChanged(id, value);
  };

  const onPlantVariantChanged = (value: string) => {
    props.onPlantVariantChanged(id, value);
  };

  const onCropTypeChanged = (value: number) => {
    props.onCropTypeChanged(id, value === 0 ? "Plon Główn" : "Poplon");
  };

  const onFieldChanged = (value: number) => {

    if (value === -1)
      props.onFieldChanged(id, undefined);
    else
      props.onFieldChanged(id, value);
  }

  const onAreaInHectaresChanged = (value: string) => {
    props.onAreaInHectaresChanged(id, Number(value));
  };

  return (
    <CentredPanelWithDeleteBtn
      width="280px"
      height="305px"
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
        description="Roślina"
        defaultValue={data.plant}
        onEdit={onPlantChanged}
      />

      <Textbox
        description="Odmiana"
        defaultValue={data.plantVariant}
        onEdit={onPlantVariantChanged}
      />

      <Combobox
        description="Typ"
        values={[{ key: 0, value: "Plon Główn" }, { key: 1, value: "Poplon" }]}
        defaultValue={data.cropType === "Poplon" ? 1 : 0}
        onEdit={onCropTypeChanged}
      />

      <Combobox
        description="Pole"
        values={[...props.fieldNames, { key: -1, value: "Brak" }]}
        defaultValue={data.field !== undefined ? data.field : -1}
        onEdit={onFieldChanged}
      />

      <Textbox
        description="Powieszchnia uprawy"
        onlyNumbers
        defaultValue={data.areaInHectares.toString()}
        onEdit={onAreaInHectaresChanged}
      />

      <LinkConeainer>
        <BlueLink width="120px" to="/">Przejdz do magazynu</BlueLink>
        <BlueLink width="128px" to="/">Przejdz do operacji agrotechnicznych</BlueLink>
      </LinkConeainer>

    </CentredPanelWithDeleteBtn>
  )
}
export default CropViewer
