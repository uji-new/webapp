import React, {useEffect, useState, useContext} from "react";

import './Lugar.css'
import classNames from "classnames";

import {  
  Button,
  Row,
  Form
} from "react-bootstrap";

import { Event } from 'components';
import { New } from 'components';
import { Weather } from 'components';
import Client from "utils/Client";
import { ModalService } from 'features'

export const Lugar = (props) => {  
    const { 
        lugares, 
        lugar, 
        setLugar, 
        setLugares,
        setLugaresApi,
        serviciosLugar, 
        setServiciosLugar,
        datosLugar,
        setDatosLugar,
        setActializarServicios,
        lugarRender } = props  

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [w,sW] = useState('')
    const [e,sE] = useState('')
    const [n,sN] = useState('')
    
    const [b, sB] = useState(false)
    const [alias, setAlias] = useState('')
    
    useEffect(() => {
        lugar.alias ? setAlias(lugar.alias):null   
    },[lugar]) 

    useEffect(() => {
        serviciosLugar[Client.service.TYPE.WEATHER] ? sW(serviciosLugar[Client.service.TYPE.WEATHER].enabled):null,
        serviciosLugar[Client.service.TYPE.EVENTS] ? sE(serviciosLugar[Client.service.TYPE.EVENTS].enabled):null,
        serviciosLugar[Client.service.TYPE.NEWS] ? sN(serviciosLugar[Client.service.TYPE.NEWS].enabled):null
    }, [serviciosLugar])   

    const handleEventInvertir = async(event, tipo) => {
        event.preventDefault()
        setActializarServicios((old) => !old)
        switch (tipo) {
            case Client.service.TYPE.WEATHER:
                w ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo) 
                    ):Client.service.enableServiceForLocation(lugar.coords, tipo)              
                sW((old) => !old)
                break;
            case Client.service.TYPE.EVENTS:
                e ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo)
                    ):(
                        Client.service.enableServiceForLocation(lugar.coords, tipo)
                    )       
                sE((old) => !old) 
                break;
            case Client.service.TYPE.NEWS:
                n ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo) 
                    ):Client.service.enableServiceForLocation(lugar.coords, tipo)  
                sN((old) => !old)
                break;
            default:
                break;
        }

    }
    const hadleActualizarAlias = async(event) => {
        event.preventDefault()
        
        b ? Client.location.updateLocation(lugar.coords, alias):console.log("mostrar")
        setLugar((old) => {
            let x = {...old}
            console.log(old)
            x.alias = alias
            console.log(x)
            return x
        })
        sB((old) => !old)
    }
    
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <ModalService show={show} onHide={handleClose}/>

            {/* NOMBRE */}
            <h1>
                {!b ? alias:(
                    <input
                        onChange={(e) => setAlias(e.target.value)}
                        value={alias}
                    />
                )}
            </h1>
            {!lugares.every((l) => l.coords !== lugar.coords) ? <Button onClick={(e) => hadleActualizarAlias(e)}></Button>:null}

            {/* WEATHER */}
            { serviciosLugar[Client.service.TYPE.WEATHER] ? (
                <section className="service-section weather-section" data-testid="weather">
                    <Form.Switch
                        size='lg'
                        checked={w}
                        onChange={(e) => handleEventInvertir(e, Client.service.TYPE.WEATHER)}/>
                    <h1 id="weather">{serviciosLugar[Client.service.TYPE.WEATHER].name}</h1>
                    {datosLugar[Client.service.TYPE.WEATHER] && w ? (
                        <Weather lugar={lugarRender} event={datosLugar[Client.service.TYPE.WEATHER]}/>
                    ):null}
                </section>
            ) : null}

            {/* EVENTS */}
            { serviciosLugar[Client.service.TYPE.EVENTS] ? (
                <section className="service-section events-section" data-testid="events">
                    <Form.Switch 
                        size='lg'
                        checked={e}
                        onChange={(event) => handleEventInvertir(event, Client.service.TYPE.EVENTS)}/>
                    <h1 id="events"> {serviciosLugar[Client.service.TYPE.EVENTS].name}</h1>
                    {datosLugar[Client.service.TYPE.EVENTS] && e ? ( 
                        <Row xs={2} md={1} className="events-cards g-4">
                            {datosLugar[Client.service.TYPE.EVENTS].map((e, idx) => <Event key={idx} event={e}/>)}
                        </Row>
                    ):null}
                </section> 
            ):null}
            
            {/* NEWS */}
            { serviciosLugar[Client.service.TYPE.NEWS] ? (
                <section className="service-section news-section" data-testid="news">
                    <Form.Switch 
                        size='lg'
                        checked={n}
                        onChange={(e) => handleEventInvertir(e, Client.service.TYPE.NEWS)}
                    />
                    <h1 id="news">{serviciosLugar[Client.service.TYPE.NEWS].name}</h1>
                    {datosLugar[Client.service.TYPE.NEWS] && n ? (
                        <Row xs={2} md={1} className="news-cards g-4">
                            {datosLugar[Client.service.TYPE.NEWS].map((e, idx) => <New key={idx} event={e}/>)}
                        </Row>
                    ):null}
                </section>
            ):null}
        </>
    )
}
//{lugarRender.coords ? (
//    <>
//    <BotonesServicios.Lugar 
//    serviosLugar={serviciosLugar} 
//    setServiciosLugar={setServiciosLugar}
//    lugar={lugar}
//    />
//    </>
//    ):null}  