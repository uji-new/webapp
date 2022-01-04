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
              
            <Button variant="outline-info" onClick={props.toggle}>
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
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user ? user : 'Invitado'}</Offcanvas.Title>
          {user ? 
          <LogOut 
                setLugaresNoG={setLugaresNoG}
                setUser={setUser}
              /> : null}
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!user ? <UserForm setUser={setUser}/>
          : (
            <>  
              <h1>Servicios</h1>
              {
              //WEATHER
              }
              {servicios[Client.service.TYPE.WEATHER] ? (
                <>
                  <h2> {servicios[Client.service.TYPE.WEATHER].name} </h2>
                  <p>{servicios[Client.service.TYPE.WEATHER].description}</p>
                  <Form.Switch 
                      size='lg'
                      checked={w}
                      onChange={(e)=>handleEventInvertir(e, Client.service.TYPE.WEATHER)}
                  />
                </>):null}
              {
              //EVENTS
              }
              {servicios[Client.service.TYPE.EVENTS] ? (
                <>
                  <h2> {servicios[Client.service.TYPE.EVENTS].name} </h2>
                  <p>{servicios[Client.service.TYPE.EVENTS].description}</p>
                  <Form.Switch 
                      size='lg'
                      checked={e}
                      onChange={(e)=>handleEventInvertir(e, Client.service.TYPE.EVENTS)}
                  />
                </>):null}
              {
              //NEWS
              }
              {servicios[Client.service.TYPE.NEWS] ? (
                <>
                  <h2> {servicios[Client.service.TYPE.NEWS].name} </h2>
                  <p>{servicios[Client.service.TYPE.NEWS].description}</p>
                  <Form.Switch 
                      size='lg'
                      checked={n}
                      onChange={(e)=>handleEventInvertir(e, Client.service.TYPE.NEWS)}
                  />
                </>):null}
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}