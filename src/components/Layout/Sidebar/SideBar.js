import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";


export const SideBar = (props) => {
  const {lugares, setLugar, lugar} = props
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
          <h3>Estamos en {lugar.name}</h3>
        </div>
        <div>
          <Nav className="flex-column pt-2">
            <p className="ml-3">Lugares Guardados</p>
            
            {lugares.map( (l, index) => {
                return  <Button type="button" key={index} onClick={() => setLugar(l)}>
                          {l.name}
                        </Button>
              })}
            
          </Nav>
        </div>

        
      </div>
        
      </>
    );
}

