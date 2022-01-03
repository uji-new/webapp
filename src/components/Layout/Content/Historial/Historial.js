import React,{useState, useEffect} from 'react';

import {  
    Table,
    Button
  } from "react-bootstrap";
  import Client from "utils/Client";

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
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Restaurar</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map( (l, index) => {                                 
                        return <tr key={index}>
                            <td>{index}</td>
                            <td>{l.name}</td>
                            <td>{<Button variant="success" onClick={() => {
                                Client.history.restoreLocation(l.coords)
                                setLugar(l)
                                
                            }}> X </Button>}</td>
                            <td>{<Button variant="danger" onClick={() => Client.history.removeLocation(l.coords)}> X </Button>}</td>
                        </tr>
                    })
                    }
                    
                    
                </tbody>
            </Table> 
            
           
        </>
    )
}
