import React from "react";
import styled from '@emotion/styled'
import RemoveBtn from "../buttons/removeBtn";
import Panel from "./panel";

type Props = {
  onDeleteBtnClicked: () => void;
  width:string;
  height:string;
  "flex-column"?: boolean;
}

type StyledPanelProps = {
  "flex-column"?: boolean
}

const StyledPanel = styled(Panel)`
  position: relative;
  display: flex;
  align-items: center;

  padding: ${(props:StyledPanelProps) => props["flex-column"] ? "5px 1px 5px 0" : "0 0 0 0"};
  justify-content:  ${(props:StyledPanelProps) => props["flex-column"] ? "space-around" : "center"};
  flex-direction: ${(props:StyledPanelProps) => props["flex-column"] ? "column" : "row"};
`;

const CentredPanelWithDeleteBtn : React.FC<Props> = (props) => (
  <StyledPanel flex-column={props["flex-column"]} width={props.width} height={props.height}>
    {props.children}
    <RemoveBtn onClick={() => props.onDeleteBtnClicked()}/>
  </StyledPanel>
);

export default CentredPanelWithDeleteBtn;
