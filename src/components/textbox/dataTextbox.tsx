import React from "react";
import Textbox from './textbox';

type Props = {
    description: string;
    onEdit: (text: string) => void;
    defaultValue: string;
};

const DataTextbox: React.FC<Props> = (props) => {

    const onEdit = (text: string) => {
        if (text.length < props.defaultValue.length){
            props.onEdit(text);
            return;
        }

        text = text.replace(/[^\d/]/g, '');

        if (text.length == 2 || text.length == 5)
            text += "/";

        props.onEdit(text);
    }

    return (
        <Textbox
            defaultValue={props.defaultValue}
            description={props.description}
            onEdit={onEdit}
        ></Textbox>
    )
}

export default DataTextbox;