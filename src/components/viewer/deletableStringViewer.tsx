import React from "react";

import CentredPanelWithDeleteBtn from "../panel/centredPanelWithDeleteBtn";
import LabelTextbox from "../textbox/labelTextbox";

type Props = {
  id: number;
  defaultValue: string;
  onEdit: (id: number, value: string) => void;
  onDeleteBtnClicked: (id: number) => void;
}


const DeletableStringViewer: React.FC<Props> = ({ defaultValue, id, onEdit, onDeleteBtnClicked }) => (
  <CentredPanelWithDeleteBtn 
    width="280px" 
    height="40px"
    onDeleteBtnClicked={() => onDeleteBtnClicked(id)}
    >
    <LabelTextbox
      value={defaultValue}
      onChange={(value) => onEdit(id, value)}
    />
  </CentredPanelWithDeleteBtn>
)

export default DeletableStringViewer
