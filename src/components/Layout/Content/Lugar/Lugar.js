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
    
    var [alias, setAlias] = useState('')
    
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
    const enterPress = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { 
            b ? hadleActualizarAlias(event):null
        } 
      }

    return (
        <>
        {/* NOMBRE */}
        <Stack className="location-name" direction="horizontal" gap={2}>
        <h1>
            {!b ? alias:(
                <input className="location-name-edit"
                    onChange={(e) => setAlias(() => e.target.value)}
                    value={alias}
                    onKeyDownCapture={(e) => enterPress(e)}

                />
            )}
        </h1>
        {!lugares.every((l) => l.coords !== lugar.coords) ? <Button onClick={(e) => hadleActualizarAlias(e)}>+</Button>:null}
        </Stack>
        {lugar.name === alias ? null:<h4 className="subtitle">{lugar.name}</h4>}

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
                {e ? ( 
                    datosLugar[Client.service.TYPE.EVENTS] === false ? (
                        <h4 className="subtitle">Intentelo mas tarde</h4>
                    ):<Row xs={2} md={1} className="events-cards g-4">
                        {datosLugar[Client.service.TYPE.EVENTS].length ? datosLugar[Client.service.TYPE.EVENTS].map((e, idx) => <Event key={idx} event={e}/>) : <h4 className="subtitle">No hay ningun evento</h4>}
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
                    onChange={(e) => handleEventInvertir(e, Client.service.TYPE.NEWS)}/>
                <h1 id="news">{serviciosLugar[Client.service.TYPE.NEWS].name}</h1>
                {n ? (
                    datosLugar[Client.service.TYPE.NEWS] === false ? (
                        <h4 className="subtitle">Intentelo mas tarde</h4>
                    ):<Row xs={2} md={1} className="news-cards g-4">
                        {datosLugar[Client.service.TYPE.NEWS].length ? datosLugar[Client.service.TYPE.NEWS].map((e, idx) => <New key={idx} event={e}/>) : <h4 className="subtitle">No hay ninguna noticia</h4>}
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
        {/* WEATHER */}
        { serviciosLugar[Client.service.TYPE.WEATHER] ? (
            <section className="service-section weather-section" data-testid="weather">
                <h1 id="weather">{serviciosLugar[Client.service.TYPE.WEATHER].name}</h1>
                {datosLugar[Client.service.TYPE.WEATHER] ? (
                    <Weather lugar={lugarRender} event={datosLugar[Client.service.TYPE.WEATHER]}/>
                ):null}
            </section>
        ) : null}

        {/* EVENTS */}
        { serviciosLugar[Client.service.TYPE.EVENTS] ? (
            <section className="service-section events-section" data-testid="events">
                <h1 id="events"> {serviciosLugar[Client.service.TYPE.EVENTS].name}</h1>
                    datosLugar[Client.service.TYPE.EVENTS] === false ? (
                        <h4 className="subtitle">Intentelo mas tarde</h4>
                    ):<Row xs={2} md={1} className="events-cards g-4">
                        {datosLugar[Client.service.TYPE.EVENTS].length ? datosLugar[Client.service.TYPE.EVENTS].map((e, idx) => <Event key={idx} event={e}/>) : <h4 className="subtitle">No hay ningun evento</h4>}
                    </Row>
            </section> 
        ):null}
        
        {/* NEWS */}
        { serviciosLugar[Client.service.TYPE.NEWS] ? (
            <section className="service-section news-section" data-testid="news">
                <h1 id="news">{serviciosLugar[Client.service.TYPE.NEWS].name}</h1>
                    datosLugar[Client.service.TYPE.NEWS] === false ? (
                        <h4 className="subtitle">Intentelo mas tarde</h4>
                    ):<Row xs={2} md={1} className="news-cards g-4">
                        {datosLugar[Client.service.TYPE.NEWS].length ? datosLugar[Client.service.TYPE.NEWS].map((e, idx) => <New key={idx} event={e}/>) : <h4 className="subtitle">No hay ninguna noticia</h4>}
                    </Row>
            </section>
        ):null}
    </>
    )
}
