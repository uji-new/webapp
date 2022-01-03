import React,{useState, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAlignLeft,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, 
  Button, 
  Col,
  Nav, 
  Row,
  Stack,
  Offcanvas,
  Container
} from "react-bootstrap";
import "./Navbar.css";
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
          expand={false} sticky="top"
        >
          <Stack direction="horizontal" gap={3}>
              
            <Button variant="outline-info" onClick={props.toggle}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </Button>
            
            <SearchBar 
              setLugar={props.setLugar} 
              setLugares={props.setLugares}
              setLugaresNoG={props.setLugaresNoG}
            /> 

            <SessionOffCanvas 
              placement={'end'} name={'end'} /> 
          </Stack>
          
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
          <Offcanvas.Title>User: {user ? user:(user === null ? 'invitado': 'error')}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!user ? <UserForm setUser={setUser}/>
          : (
            <>  
            <h2>Servicion</h2>
            <BotonesServicios.Cuenta/>
            <br/>
            <br/>
            <h2>Cerrar Session</h2>
            <LogOut setUser={setUser}/>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}