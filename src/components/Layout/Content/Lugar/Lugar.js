import React, {useEffect, useState, useContext} from "react";

import './Lugar.css'
import classNames from "classnames";

import {  
  Button,
  Row,
  Form,
  Stack
} from "react-bootstrap";

import { Event } from 'components';
import { New } from 'components';
import { Weather } from 'components';
import Client from "utils/Client";

export const Lugar = (props) => {  
    const [b, sB] = useState(false)
    
    const {lugares, lugar} = props  
    return (
        <>
            {!lugares.every((i) => i.coords !== lugar.coords) ? <LugarGuardado {...props} b={b} sB={sB} />:<LugarNoGuardado {...props}/>}       
        </>
    )
}

const LugarGuardado = (props) => {
    const { 
        lugares, 
        lugar, 
        setLugar, 
        serviciosLugar, 
        datosLugar,
        setActializarServicios,
        lugarRender,
        b, sB
    } = props  
    
    const [w,sW] = useState('')
    const [e,sE] = useState('')
    const [n,sN] = useState('')
    
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
        if (b) {
            alias ? null:alias = lugar.name
            Client.location.updateLocation(lugar.coords, alias)
        }
        b ? Client.location.updateLocation(lugar.coords, alias):console.log("mostrar")
        sB((old) => !old)
        setLugar((old) => {
            let x = {...old}
            x.alias = alias
            return x
        })
        
    }

    return (
        <>
        {/* NOMBRE */}
        <Stack className="location-name" direction="horizontal" gap={2}>
        <h1>
            {!b ? alias:(
                <input
                    onChange={(e) => setAlias(() => e.target.value)}
                    value={alias}
                />
            )}
        </h1>
        {!lugares.every((l) => l.coords !== lugar.coords) ? <Button onClick={(e) => hadleActualizarAlias(e)}>+</Button>:null}
        </Stack>
        <h5>{lugar.name}</h5>

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

const LugarNoGuardado = (props) => {
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

    
    return(
    <>
    <h1> {lugar.name} </h1>  
    
    
    <section className="service-section weather-section" data-testid="weather">
        { serviciosLugar['WEATHER'] ? (
            <>
                <h1 id="weather">{serviciosLugar['WEATHER'].name}</h1>
                {datosLugar['WEATHER']? (
                    <Weather lugar={lugarRender} event={datosLugar['WEATHER']}/>
                ):null}
            </>
        ) : null}
        

    </section>

    
    <section className="service-section events-section" data-testid="events">
        { serviciosLugar['EVENTS'] ? (
            <>
                <h1 id="events"> {serviciosLugar['EVENTS'].name}</h1>
                {datosLugar['EVENTS'] ? ( 
                    <Row xs={2} md={1} className="events-cards g-4">
                        {datosLugar['EVENTS'].map((e, idx) => <Event key={idx} event={e}/>)}
                    </Row>
                ):null}
            </>
            ):null}
    </section> 
    
    
    <section className="service-section news-section" data-testid="news">
        { serviciosLugar['NEWS'] ? (
                <>
                    <h1 id="news">{serviciosLugar['NEWS'].name}</h1>
                    {datosLugar['NEWS']? (
                        <Row xs={2} md={1} className="news-cards g-4">
                            {datosLugar['NEWS'].map((e, idx) => <New key={idx} event={e}/>)}
                        </Row>
                    ):null}
                </>
            ):null}

    </section>        

    </>
    )
}
