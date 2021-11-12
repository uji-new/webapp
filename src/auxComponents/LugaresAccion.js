import React from "react";
import {Tab} from "react-bootstrap";

export default function LugaresAcciones(props) {
    return(    
        <Tab.Pane eventKey={props.lugar}>
            {props.lugar}
        </Tab.Pane>
    )
}