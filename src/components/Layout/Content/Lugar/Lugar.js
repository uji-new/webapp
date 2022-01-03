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
    
        useEffect(() => {
            serviciosLugar['WEATHER'] ? (
            sW(serviciosLugar['WEATHER'].enabled),
            console.log(w) 
            ):console.log("malament")
        }, [])     
    return (
        <>   
        <h1> {lugar.name} </h1>
        {lugarRender.coords ? (
            <>
            <BotonesServicios.Lugar 
            serviosLugar={serviciosLugar} 
            setServiciosLugar={setServiciosLugar}
            lugar={lugar}
            />
            </>
            ):null}
        
        {datosLugar['WEATHER'] ? (
        <>
            
            <h1> {serviciosLugar['WEATHER'].name} </h1>
            <Form>
            <Form.Check 
                type="switch"
                id="custom-switch"
                size='lg'
                checked={w}
                isValid={true}
                onChange={() => sW((old) => !old )}
            />
        </Form>
            <Weather lugar={lugarRender} event={datosLugar['WEATHER']}/>
        </>
        ):null}
    
        {datosLugar['EVENTS'] ? ( 
        <>
            <h1> EVENTS </h1>
            <Row xs={2} md={1} className="g-4">
                {datosLugar['EVENTS'].map((e, idx) => <Event key={idx} event={e}/>)}
            </Row>
        </>
        ):null}
        
        
        {datosLugar['NEWS'] ? (
        <>
            <h1> NEWS </h1>

            <Row xs={2} md={1} className="g-4">
                {datosLugar['NEWS'].map((e, idx) => <New key={idx} event={e}/>)}
            </Row>
        </>
        ):null}
            
    </>
    
    )
}
