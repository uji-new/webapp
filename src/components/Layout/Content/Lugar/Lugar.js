import React, {useEffect, useState, useContext} from "react";

import './Lugar.css'
import classNames from "classnames";

import {  
  Button,
  Row,
  Form
} from "react-bootstrap";

import { Container } from "react-bootstrap";
import { AuthContext } from "App.js";
import { NavBar} from "components";
import { Event } from 'components';
import { New } from 'components';
import { Weather } from 'components';
import { BotonesServicios } from 'features'
import Client from "utils/Client";
import { Render } from "features";



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
        lugarRender } = props    
    
    const [w,sW] = useState(true)
    const [e,sE] = useState(true)
    const [n,sN] = useState(true)

    
    useEffect(() => {
        serviciosLugar['WEATHER'] ? sW(serviciosLugar['WEATHER'].enabled):console.log("malament"),
        serviciosLugar['EVENTS'] ? sE(serviciosLugar['EVENTS'].enabled):console.log("malament"),
        serviciosLugar['NEWS'] ? sN(serviciosLugar['NEWS'].enabled):console.log("malament")
    }, [serviciosLugar])   

    const handleEventInvertir = async(e, tipo) => {
        e.preventDefault()
        switch (tipo) {
            case 'WEATHER':
                sW((old) => !old)
                !w ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo) 
                    ):Client.service.enableServiceForLocation(lugar.coords, tipo)              
            break;
            case 'EVENTS':
                console.log('hola')
                sE((old) => !old) 
                !e ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo) 
                    ):Client.service.enableServiceForLocation(lugar.coords, tipo)        
            break;
            case 'NEWS':
                sN((old) => !old)
                !n ? (
                    Client.service.disableServiceForLocation(lugar.coords, tipo) 
                    ):Client.service.enableServiceForLocation(lugar.coords, tipo)  
            break;
        
            default:
                break;
        }

    }
    
    return (
        <>
        {
        //NOMBRE
        }
        <h1> {lugar.name} </h1>     
        
        {
        //WEATHER
        }
        <section className="weather-section" data-testid="weather">
            { serviciosLugar['WEATHER'] ? (
                    <>
                        <h1 id="weather"> {serviciosLugar['WEATHER'].name} </h1>
                        <Form>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            size='lg'
                            checked={w}
                            onChange={(e) => handleEventInvertir(e, 'WEATHER')}
                        />
                        </Form>
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
                        onChange={(e) => handleEventInvertir(e, 'EVENTS')}
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