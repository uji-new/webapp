import React from "react";
import { 
  Navbar, 
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
import { AuthContext } from "App.js";
import Client from "utils/Client";

//por ahora codigo repetido pero en un futuro
//supongo que los botones seran c.u distinto
export const BotonesServiciosCuenta = () => {
  const { servicios, setServicios } = React.useContext(AuthContext);
  
  const handleButton = (event) => {
    event.preventDefault()
    const {value} = event.target;
    const estado = servicios[value].enabled;
    
    estado ? (
      Client.service.disableService(value)
      ):Client.service.enableService(value)
          
    let auxServicios = {...servicios}
    auxServicios[value].enabled = !auxServicios[value].enabled
    setServicios(auxServicios) 
  }
  
  return(
    <>
      <ButtonGroup>
        {Object.keys(servicios).map((radio, idx) => (
          <Button
            key={radio}
            variant={servicios[radio].enabled ? "success":"secondary"}
            onClick={handleButton}
            value={radio} 
          >
            {radio}
          </Button>
        ))}
      </ButtonGroup>
    </>
  )
}
