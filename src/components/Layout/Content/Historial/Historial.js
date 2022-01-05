import React,{useState, useEffect} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTrashAlt,
} from"@fortawesome/free-regular-svg-icons"
import {  
    ListGroup,
    Button, ButtonGroup
  } from "react-bootstrap";
  import Client from "utils/Client";
import "./Historal.css"

//Crear una cuenta
export const Historial = (props) => {
    const [historial, setHistorial] = useState([])   

    const {setLugar, setLugaresApi} = props
    
    useEffect(() => {
        let mounted = true;
        Client.history.getLocations()
            .then((r) => {
                if(mounted) {
                    setHistorial(r)
                }
            })
        return () => mounted = false;
    })
    return (
        
        <>
            <ListGroup as="ul">
                    {historial.length ? historial.map( (l, index) => {                                 
                        return <ListGroup.Item key={l.coords}>
                            <ButtonGroup aria-label="Basic example" className="history-buttons">
                                <Button variant="outline-primary" onClick={() => {Client.history.restoreLocation(l.coords); setLugar(l)}}> 
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                                <Button variant="outline-primary" onClick={() => Client.history.removeLocation(l.coords)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </ButtonGroup>
                            <p>{l.alias} ({l.name})</p>
                        </ListGroup.Item>
                    }) : <ListGroup.Item>Ninguna ubicacion</ListGroup.Item>
                    }
            </ListGroup> 
            
           
        </>
    )
}
