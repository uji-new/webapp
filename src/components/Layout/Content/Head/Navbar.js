import React,{useState, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAlignLeft,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, 
  Button, 
  Nav, 
  Offcanvas
} from "react-bootstrap";
import { SearchBar } from "features";
import { UserForm } from "components";
import { AuthContext } from "App.js";
import { LogOut } from "components/Form/LogOut";
import {BotonesServicios} from "features";


export const NavBar = (props) => {
    return (
      <Navbar
        bg="light"
        className="ml-auto navbar shadow-sm p-3 mb-5 bg-white rounded"
        sticky="top"
        expand={false}
      >
        <Button variant="outline-info" onClick={props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        
        <Nav className="ml-auto" navbar>
            <SearchBar setLugar={props.setLugar}/>
        </Nav>
        
        <SessionOffCanvas placement={'end'} name={'end'} />

      </Navbar>
    );
}

const SessionOffCanvas = ({name, ...props}) => {
  const { user, setUser} = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        <FontAwesomeIcon icon={faUser} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user ? user:'Invitado'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!user ? <UserForm setUser={setUser}/>
          : (
            <>  
            <LogOut setUser={setUser}/>
            <br/>
            <BotonesServicios.Cuenta/>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}