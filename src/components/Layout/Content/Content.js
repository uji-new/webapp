import React, {useEffect, useState, useContext} from "react";

import './Content.css'
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
import { Bienvenida } from "./Bienvenida";
import { Historial } from "./Historial";

import { Lugar } from "./Lugar";


export const Content = (props) => {
  const { user, setUser} = useContext(AuthContext);

  const { 
    lugares, 
    lugar, 
    setLugar, 
    setLugares,
    setLugaresApi,
    setLugaresNoG,
    serviciosLugar, 
    setServiciosLugar,
    datosLugar,
    setDatosLugar } = props

  const[lugarRender, setLugarRender] = useState({})

  useEffect(() => {
    setLugarRender(lugar)
  },[lugar])

  useEffect(() => {
    setLugarRender({})
  },[user])

  

  return (
    <div className='content'
      
      className={classNames("content", { "is-open": props.isOpen })}
      >
    <NavBar 
      toggle={props.toggle} 
      setLugar={setLugar} 
      setLugares={setLugares}
      setLugaresNoG={setLugaresNoG}
    />
    
    {lugarRender.name ? (lugarRender.name === 'historial' ? <Historial setLugaresApi={setLugaresApi} setLugar={setLugar}/>:<Lugar lugarRender={lugarRender}{...props}/>):<Bienvenida/>}

    </div>
  );
}
