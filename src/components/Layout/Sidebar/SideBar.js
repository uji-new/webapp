import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SideBar.css'
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
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
    setLugaresNoG(lugaresNoG.filter(item => item !== l))
    
    if(lugar.coords === l.coords){
      if(lugaresNoG.length > 1){
        setLugar(lugaresNoG[0])
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
    
    if(lugar.coords === l.coords){
      lugares.length > 1 ? setLugar(lugares[0]):setLugar({})
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
          <h3> N.E.W {lugar.alias} </h3>
        </div>  
      <div>
          <Nav className="flex-column pt-2">
            
            <strong className="ml-3 sidebar-section">Busquedas</strong>
            
            {lugaresNoG.map( (l, index) => {
                return (
                    <ButtonGroup key={l.coords+'A'} aria-label="Basic example">
                      <Button variant="secondary" key={index+'f'} onClick={() => setLugar(l)} >{l.alias}</Button>
                      <Button  sm={1} size="sm" className="sidebar-action" variant="outline-secondary" key={index+"a"} onClick={(e) => handleGuardar(e,l)} >
                        +
                      </Button>
                      <Button  sm={1} size="sm" className="sidebar-action" variant="outline-secondary" key={index+"b"} onClick={(e) => handleEliminar(e,l)} >
                        X
                      </Button>
                    </ButtonGroup>                                        
                        )
            })}
           
            <strong className="ml-3 sidebar-section">Ubicaciones</strong>
            
            {lugares.map( (l, index) => {
                return (
                      <ButtonGroup key={l.coords+'B'}aria-label="Basic example">
                        <Button variant="primary" key={index+'q'} onClick={() => setLugar(l)} >{l.alias}</Button>
                        <Button sm={1} className="sidebar-action" variant="outline-primary" key={index+'z'} onClick={(e) => handleEliminarGuardado(e,l)} >
                          X
                        </Button>
                      </ButtonGroup>                      

                        )
            })}
            
            <strong className="ml-3 sidebar-section">Historial</strong>
            <Button variant="dark" onClick={() => setLugar({name : 'historial',alias : 'Historial'})}>
                Ver Historial
            </Button>
            
          </Nav>
        </div>    
      </div>
        
      </>
    );
}

