import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SideBar.css'
import {
  faTimes,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTrashAlt,
  faPlusSquare,
  faSave
} from"@fortawesome/free-regular-svg-icons"
import { 
  Nav, 
  Button,
  ButtonGroup
 } from "react-bootstrap";
import classNames from "classnames";
import Client from "utils/Client";


export const SideBar = (props) => {
  const {lugares, setLugar, lugar, lugaresNoG, setLugaresNoG, setActualizarLugares} = props
  
  const handleGuardar = async (e,l) => {
    e.preventDefault();
    
    Client.location.addLocation(l.coords)
    setActualizarLugares((old) => !old)

    setLugaresNoG(lugaresNoG.filter(item => item !== l))
    setLugar(l)
  }
  const handleEliminar = async (e,l) => {
    e.preventDefault();
    let lugaresNoGAux = lugaresNoG.filter(item => item !== l)
    setLugaresNoG(lugaresNoGAux)
    
    if(lugar.coords === l.coords){
      if(lugaresNoGAux.length > 1){
        setLugar(lugaresNoGAux[0])
      }else if(lugares.length){
        setLugar(lugares[0])
      }else{
        setLugar({})
      }
    }    
  }
  
  const handleEliminarGuardado = async (e,l) => {
    e.preventDefault();
    
    Client.location.removeLocation(l.coords)
    setActualizarLugares((old) => !old)
    
    let lugaresAux = lugares.filter(item => item.coords !== l.coords)
    if(lugar.coords === l.coords){
      lugaresAux.length >= 1 ? setLugar(lugaresAux[0]):setLugar({})
    }   
  }

    return (
      <>
      <div className={classNames("sidebar", { "is-open": props.isOpen })}>
        <div className="sidebar-header">
          <Button
              variant="link"
              onClick={props.toggle}
              style={{ color: "#fff" }}
              className="mt-4"
            >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3><img className="brand-icon" src="/favicon.ico"/> N.E.W </h3>
        </div>  
      <div>
          <Nav className="flex-column pt-2">
            
            <strong className="ml-3 sidebar-section">Busquedas</strong>
            {!lugaresNoG.length ? <p className="no-lugares" >Sin Busquedas</p>:(
              lugaresNoG.map( (l, index) => {
                  return (
                      <ButtonGroup key={l.coords+'A'} aria-label="Basic example">
                        <Button variant="secondary" key={index+'f'} onClick={() => setLugar(l)} >{l.alias}</Button>
                        <Button  sm={1} size="sm" className="sidebar-action" variant="outline-secondary" key={index+"a"} onClick={(e) => handleGuardar(e,l)} >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Button  sm={1} size="sm" className="sidebar-action" variant="outline-secondary" key={index+"b"} onClick={(e) => handleEliminar(e,l)} >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </ButtonGroup>
                          )
              })
            )}
            <strong className="ml-3 sidebar-section">Ubicaciones</strong>
            {console.log(lugares)}
            
            {!lugares.length ? <p className="no-lugares" >Sin Ubicaciones</p>:(
              lugares.map( (l, index) => {
                  return (
                        <ButtonGroup key={l.coords+'B'}aria-label="Basic example">
                          <Button sm={1} variant="primary" key={index+'q'} onClick={() => setLugar(l)} >{l.alias}</Button>
                          <Button sm={1} className="sidebar-action" variant="outline-primary" key={index+'z'} onClick={(e) => handleEliminarGuardado(e,l)} >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </ButtonGroup>

                          )
              })
            )}
            
            <strong className="ml-3 sidebar-section">Historial</strong>
            <Button variant="secondary" onClick={() => setLugar({name : 'historial',alias : 'Historial'})}>
                Ver Historial
            </Button>
            
          </Nav>
        </div>    
      </div>
        
      </>
    );
}

