import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, 
  Button, 
  ButtonGroup,
  ToggleButton,
  Nav, 
  Offcanvas,
  NavDropdown, 
  Form, 
  FormControl,
  Container 
} from "react-bootstrap";
import { SearchBar } from "features";
import { UserForm } from "components";
import { AuthContext } from "App.js";
import { LogOut } from "components/Form/LogOut";
import Client from "utils/Client";
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
            <SearchBar setLugarRender={props.setLugarRender}/>
        </Nav>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Session/>

      </Navbar>
    );
}

const Session = () => {
  const { user, setUser} = React.useContext(AuthContext);
  
  return (
 
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">{user}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {!user ? <UserForm setUser={setUser}/>
        :(<>
          <LogOut setUser={setUser}/>
          <br/>
          <BotonesServicios.Cuenta/>
          </>
        )}
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  )
}