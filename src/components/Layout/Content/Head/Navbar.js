import React,{useState, useEffect, useContext} from "react";

import "./Navbar.css";
import { 
  FontAwesomeIcon 
} from "@fortawesome/react-fontawesome";
import { 
  faAlignLeft,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { 
  Navbar, 
  Button, 
  Stack,
  Offcanvas,
  Form
} from "react-bootstrap";

import { SearchBar } from "features";
import { UserForm } from "components";
import { AuthContext } from "App.js";
import { LogOut } from "components/Form/LogOut";
import { BotonesServiciosCuenta } from "features";
import Client from "utils/Client";


export const NavBar = (props) => {
    return (
      
        <Navbar
          bg="light"
          className="ml-auto navbar shadow-sm p-3 mb-5 bg-white rounded"
          expand={false} sticky="top"
        >
          <Stack direction="horizontal" gap={3}>
              
            <Button className="sidebar-icon" variant="outline-info" onClick={props.toggle}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </Button>
            
            <SearchBar 
              setLugar={props.setLugar} 
              setLugares={props.setLugares}
              setLugaresNoG={props.setLugaresNoG}
              lugares={props.lugares}
            /> 

            <SessionOffCanvas 
              setLugaresNoG={props.setLugaresNoG}
            /> 
          </Stack>
          
        </Navbar>
    
    );
}

const SessionOffCanvas = ({setLugaresNoG}) => {
  const { user, setUser, servicios, setServicios} = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [w,sW] = useState('')
  const [e,sE] = useState('')
  const [n,sN] = useState('')
    

  useEffect(() => {
    servicios[Client.service.TYPE.WEATHER] ? sW(servicios[Client.service.TYPE.WEATHER].enabled):null,
    servicios[Client.service.TYPE.EVENTS] ? sE(servicios[Client.service.TYPE.EVENTS].enabled):null,
    servicios[Client.service.TYPE.NEWS] ? sN(servicios[Client.service.TYPE.NEWS].enabled):null
  }, [servicios])   
  
  const handleEventInvertir = async(event, tipo) => {
    event.preventDefault()
    let auxServicios
    switch (tipo) {
        case Client.service.TYPE.WEATHER:
            w ? (
              Client.service.disableService(tipo)
              ):Client.service.enableService(tipo)
            
            sW((old) => !old)

            auxServicios = {...servicios}
            auxServicios[tipo].enabled = !auxServicios[tipo].enabled
            setServicios(auxServicios) 
            break;
        case Client.service.TYPE.EVENTS:
            e ? (
              Client.service.disableService(tipo)
              ):Client.service.enableService(tipo)      
            
              sE((old) => !old) 

            auxServicios = {...servicios}
            auxServicios[tipo].enabled = !auxServicios[tipo].enabled
            setServicios(auxServicios) 
            break;
        case Client.service.TYPE.NEWS:
            n ? (
              Client.service.disableService(tipo)
              ):Client.service.enableService(tipo)
            
            sN((old) => !old)
            
            auxServicios = {...servicios}
            auxServicios[tipo].enabled = !auxServicios[tipo].enabled
            setServicios(auxServicios) 
            
            break;
        default:
            break;
    }

}
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        <FontAwesomeIcon icon={faUser} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'end'}>
          {!user ? (
            <>
              <Offcanvas.Header closeButton>
              <Offcanvas.Title><h1>Cuenta</h1></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body><UserForm setUser={setUser}/></Offcanvas.Body>
            </>
          ) : (
            <>  
              <Offcanvas.Title><h1>Servicios</h1></Offcanvas.Title>
              <Offcanvas.Body>
                {/* WEATHER */}
                {servicios[Client.service.TYPE.WEATHER] ? (
                  <>
                    <Stack direction="horizontal" gap={2}>
                      <h2> {servicios[Client.service.TYPE.WEATHER].name} </h2>
                      <Form.Switch 
                          size='lg'
                          checked={w}
                          className="ms-auto"
                          onChange={(e)=>handleEventInvertir(e, Client.service.TYPE.WEATHER)}
                      />
                    </Stack>
                    <p>{servicios[Client.service.TYPE.WEATHER].description}</p>
                  </>):null}
                {/* EVENTS */}
                {servicios[Client.service.TYPE.EVENTS] ? (
                  <>
                    <Stack direction="horizontal" gap={2}>
                      <h2> {servicios[Client.service.TYPE.EVENTS].name} </h2>
                      <Form.Switch 
                          size='lg'
                          checked={e}
                          className="ms-auto"
                          onChange={(e)=>handleEventInvertir(e, Client.service.TYPE.EVENTS)}
                      />
                    </Stack>
                    <p>{servicios[Client.service.TYPE.EVENTS].description}</p>
                  </>):null}
                {/* NEWS */}
                {servicios[Client.service.TYPE.NEWS] ? (
                  <>
                    <Stack direction="horizontal" gap={2}>
                      <h2> {servicios[Client.service.TYPE.NEWS].name} </h2>
                      <Form.Switch 
                          size='lg'
                          checked={n}
                          className="ms-auto"
                          onChange={(e)=>handleEventInvertir(e, Client.service.TYPE.NEWS)}
                      />
                    </Stack>
                    <p>{servicios[Client.service.TYPE.NEWS].description}</p>
                  </>):null}
                  <Stack direction="horizontal" gap={2}>
                    <strong className="username">{user}</strong>
                    <LogOut 
                      setLugaresNoG={setLugaresNoG}
                      setUser={setUser}
                    />
                  </Stack>
                </Offcanvas.Body>
            </>
          )}
      </Offcanvas>
    </>
  )
}