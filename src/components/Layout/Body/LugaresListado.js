import React from "react";
import {Nav} from "react-bootstrap";

export function LugaresListado(props) {
    return(      
        <Nav.Item>
        <Nav.Link eventKey={props.lugar}>{props.lugar}</Nav.Link>
        </Nav.Item>
    
    )
}