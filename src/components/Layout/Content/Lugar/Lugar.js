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
        serviciosLugar['WEATHER'] ? sW(serviciosLugar['WEATHER'].enabled):null,
        serviciosLugar['EVENTS'] ? sE(serviciosLugar['EVENTS'].enabled):null,
        serviciosLugar['NEWS'] ? sN(serviciosLugar['NEWS'].enabled):null
    }, [serviciosLugar])   

    const handleEventInvertir = async(event, tipo) => {
        event.preventDefault()
        setActializarServicios((old) => !old)
        switch (tipo) {
            case 'WEATHER':
                w ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo) 
                    ):Client.service.enableServiceForLocation(lugar.coords, tipo)              
                sW((old) => !old)
                break;
            case 'EVENTS':
                e ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo)
                    ):(
                        Client.service.enableServiceForLocation(lugar.coords, tipo)
                    )       
                sE((old) => !old) 
                break;
            case 'NEWS':
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
        {
        //NOMBRE
        }
        <>
            <h1> {!b ? alias:(
            <input
                onChange={(e) => setAlias(e.target.value)}
                value={alias}
            />) 
            } </h1>  
            {!lugares.every((l) => l.coords !== lugar.coords) ? <Button onClick={(e) => hadleActualizarAlias(e)}></Button>:null
            }
        </>
        {
        //WEATHER
        }
        <section className="weather-section" data-testid="weather">
            { serviciosLugar['WEATHER'] ? (
                    <>
                        <h1 id="weather"> {serviciosLugar['WEATHER'].name} </h1>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            size='lg'
                            checked={w}
                            onChange={(e) => handleEventInvertir(e, 'WEATHER')}
                        />
                    </>
                ):null}
            
            {datosLugar['WEATHER'] && w ? (
            <> 
                <Weather lugar={lugarRender} event={datosLugar['WEATHER']}/>
            </>
            ):null}
        </section>

        {
        //EVENTS
        }
        <section className="events-section" data-testid="events">
            { serviciosLugar['EVENTS'] ? (
                <>
                    <h1 id="events"> {serviciosLugar['EVENTS'].name} </h1>
                    <Form>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        size='lg'
                        checked={e}
                        onChange={(event) => handleEventInvertir(event, 'EVENTS')}
                    />
                    </Form>
                </>
                ):null}
            {datosLugar['EVENTS'] && e ? ( 
            <>
                <Row xs={2} md={1} className="events-cards g-4">
                    {datosLugar['EVENTS'].map((e, idx) => <Event key={idx} event={e}/>)}
                </Row>
            </>
            ):null}
        </section> 
        
        {
        //NEWS
        }
        <section className="news-section" data-testid="news">
            { serviciosLugar['NEWS'] ? (
                    <>
                        <h1 id="news"> {serviciosLugar['NEWS'].name} </h1>
                        <Form>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            size='lg'
                            checked={n}
                            onChange={(e) => handleEventInvertir(e, 'NEWS')}
                        />
                        </Form>
                    </>
                ):null}
            {datosLugar['NEWS'] && n ? (
            <>
                <Row xs={2} md={1} className="news-cards g-4">
                    {datosLugar['NEWS'].map((e, idx) => <New key={idx} event={e}/>)}
                </Row>
            </>
            ):null}

        </section>        
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