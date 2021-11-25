import React, { Fragment,useState } from 'react'
import { ListGroup } from "react-bootstrap";

export const Recomendacion = ({setEstado,setRecomendacion, lugar}) =>{
   
    const handleEvent = () => {
        setEstado(lugar)
        setRecomendacion([])
    }

    return(
        <ListGroup.Item eventKey={lugar} action onClick={handleEvent}>
            {lugar}        
        </ListGroup.Item>
    )
}