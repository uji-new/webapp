import React, {useEffect} from "react";
import classNames from "classnames";

import {  
  Button
} from "react-bootstrap";

import { Container } from "react-bootstrap";
import { NavBar} from "components";
import { WizardContext } from "components";
import { Event } from 'components';
import { New } from 'components';
import { Weather } from 'components';
import { BotonesServicios } from 'features'
import Client from "utils/Client";


export const Content = (props) => {
  const { 
    lugares, 
    lugar, 
    setLugar, 
    serviciosLugar, 
    setServiciosLugar,
    datosLugar,
    setDatosLugar } = props

  const[lugarRender, setLugarRender] = React.useState({})
  
  const [clima, setClima] = React.useState([])
  const [noticias, setNoticias]= React.useState([])
  const [eventos, setEventos] = React.useState([]) 
  

  useEffect(() => {
    setLugarRender(lugar)
  },[lugar])


  //BOTON add localizacion
  const handleAddPlace = async e => {
    e.preventDefault();
    //undefine falsy
    lugarRender.name ? (
      await Client.location.addLocation(lugarRender.coords, '').then(setLugar(lugarRender))
    ):setLugar({})
  }

  //BOTON del localizacion
  const handleDelPlace = async e => {
    e.preventDefault();
    //necesita coordenadas
    lugarRender.name ? (
      await Client.location.removeLocation(lugarRender.coords).then(setLugar({}))
    ):null
  }


  return (
    <Container
      fluid
      className={classNames("content", { "is-open": props.isOpen })}
      >
    <NavBar toggle={props.toggle} setLugarRender={setLugarRender} />
    <>
      <h1> {lugarRender.name} </h1>
      
      <br/>
      <br/>

      <Button onClick={handleAddPlace}>guardar lugar</Button>
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
      
      <h1> WEATHER </h1>
      {datosLugar['WEATHER'] ? <Weather lugar={lugarRender} event={datosLugar['WEATHER']}/>:null}
   
      <h1> EVENTS </h1>
      {datosLugar['EVENTS'] ? datosLugar['EVENTS'].map((e, idx) => <Event key={idx} event={e}/>):null}
      
      <h1> NEWS </h1>
      {datosLugar['NEWS'] ? datosLugar['NEWS'].map((e, idx) => <New key={idx} event={e}/>):null}
    
    </>


    </Container>
  );
}
