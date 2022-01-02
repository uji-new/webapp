import React, {useEffect, useState, useContext} from "react";

import classNames from "classnames";

import {  
  Button,
  Row
} from "react-bootstrap";

import { Container } from "react-bootstrap";
import { AuthContext } from "App.js";
import { NavBar} from "components";
import { Event } from 'components';
import { New } from 'components';
import { Weather } from 'components';
import { BotonesServicios } from 'features'
import Client from "utils/Client";


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
        
    const handleAddPlace = async e => {
        e.preventDefault();
        lugarRender.name ? (
        await Client.location.addLocation(lugarRender.name)
        .then(setLugaresApi(old => [lugarRender, ...old]))
        .catch(setLugaresApi(old => [lugarRender, ...old]))
        ):setLugar({})
    }

    const handleDelPlace = async e => {
        e.preventDefault();
        lugarRender.name ? (
        await Client.location.removeLocation(lugarRender.coords)
        .then( () => {
            setLugar(lugares[0] ? lugares[0]: {})
            setLugares(lugares.filter(item => item !== lugarRender))
        })
        .catch( () => {
            setLugar(lugares[0] ? lugares[0]: {})
            setLugares(lugares.filter(item => item !== lugarRender))
        })
        ):null
    }

    return (
        <>    
        <h1> {lugar.name} </h1>
        
        <br/>
        <br/>

        {lugarRender.name ? <Button onClick={handleAddPlace}>guardar lugar</Button>: null}
        
        {!lugares.every((i) => i.coords !== lugarRender.coords) ? (
            <Button onClick={handleDelPlace}>Eliminar lugar</Button>
        ):null}

        <br/>
        <br/>

        {lugarRender.coords ? (
            <>
            <BotonesServicios.Lugar 
            serviosLugar={serviciosLugar} 
            setServiciosLugar={setServiciosLugar}
            lugar={lugar}
            />
            </>
            ):null}
        
        <br/>
        <br/>
        
        
        {datosLugar['WEATHER'] ? (
        <>
            <h1> WEATHER </h1>
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
