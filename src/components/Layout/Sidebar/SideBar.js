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
  const {lugares, setLugar, lugar, lugaresNoG, setLugaresNoG} = props
  
  const handleGuardar = async (e,l) => {
    e.preventDefault();
    Client.location.addLocation(l.coords)
    setLugaresNoG(lugaresNoG.filter(item => item !== l))
    setLugar({})
  }
  const handleEliminar = async (e,l) => {
    e.preventDefault();
    
    setLugaresNoG(lugaresNoG.filter(item => item !== l))
  }
  const handleEliminarGuardado = async (e,l) => {
    e.preventDefault();
    lugares ? setLugar(lugares[0]):setLugar({})
    Client.location.removeLocation(l.coords)
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
          <h3> N.E.W </h3>
        </div>
        
        <div>
          <Nav className="flex-column pt-2">
            <p className="ml-3">Ubicaciones Buscadas</p>
            {lugaresNoG.map( (l, index) => {
                return (
                    <ButtonGroup key={l.coords+'A'} aria-label="Basic example">
                      <Button variant="secondary" key={index+'f'} onClick={() => setLugar(l)} >{l.name}</Button>
                      <Button  size="sm" variant="outline-secondary" key={index+"a"} onClick={(e) => handleGuardar(e,l)} >V</Button>
                      <Button  size="sm" variant="outline-secondary" key={index+"b"} onClick={(e) => handleEliminar(e,l)} >X</Button>
                    </ButtonGroup>                                        
                        )
            })}
           
            <p className="ml-3">Ubicaciones Guardados</p> 
            <strong className="ml-3 sidebar-section">Ubicaciones</strong>
            
            {lugares.map( (l, index) => {
                return (
                      <ButtonGroup key={l.coords+'B'}aria-label="Basic example">
                        <Button variant="primary" key={index+'q'} onClick={() => setLugar(l)} >{l.name}</Button>
                        <Button variant="outline-primary" key={index+'z'} onClick={(e) => handleEliminarGuardado(e,l)} >X</Button>
                      </ButtonGroup>                      

                        )
            })}
            <br/>
            <strong className="ml-3 sidebar-section">Historial</strong>
            <Button variant="dark" onClick={() => setLugar({name : 'historial'})}>
                Ver Historial
            </Button>
            
          </Nav>
        </div>    
      </div>
        
      </>
    );
}

