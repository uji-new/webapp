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

const dominio = {
  USUARIO: 'USUARIO',
  CUENTA: 'CUENTA'
}



export const BotonesServicios = ({children}) => {
  return (
    ''
  )
}

//por ahora codigo repetido pero en un futuro
//supongo que los botones seran c.u distinto
export const Cuenta = () => {
  const { servicios, setServicios } = React.useContext(AuthContext);

  const handleButton = (event) => {
    event.preventDefault()
    const {value} = event.target;
    const estado = servicios[value].enabled;
    
    estado ? (
      Client.service.disableService(value)
      ):Client.service.enableService(value)
  
    //un poco cutre creo q habra alguna manera de hacer padando una funcion al setServicios
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

export const Lugar = (props) => {
  const { serviosLugar, lugar, setServiciosLugar} = props

  const handleButton = (event) => {
    event.preventDefault()
    const {value} = event.target;
    const estado = serviosLugar[value].enabled;
    
    estado ? (
      Client.service.disableServiceForLocation(lugar.coords, value) 
      ):Client.service.enableServiceForLocation(lugar.coords, value)
  
    //un poco cutre creo q habra alguna manera de hacer padando una funcion al setServicios
    let auxServicios = {...serviosLugar}
    auxServicios[value].enabled = !auxServicios[value].enabled
    setServiciosLugar(auxServicios)
  }
  

  return(
    <>
      <ButtonGroup>
        {Object.keys(serviosLugar).map((radio, idx) => (
          <Button
            key={radio}
            variant={serviosLugar[radio].enabled ? "success":"secondary"}
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

BotonesServicios.Lugar = Lugar
BotonesServicios.Cuenta = Cuenta
