import React, {useEffect} from "react";
import classNames from "classnames";

import { Container } from "react-bootstrap";
import { NavBar} from "components";
import { Route,Routes } from "react-router-dom";
import { WizardContext } from "components";
import { Event } from 'components';
import { New } from 'components';
import { Weather } from 'components';
import Client from "utils/Client";


export const Content = (props) => {
  const {lugares, lugar, setLugar} = props

  const[lugarRender, setLugarRender] = React.useState({})
  
  const [clima, setClima] = React.useState([])
  const [noticias, setNoticias]= React.useState([])
  const [eventos, setEventos] = React.useState([]) 
  

  useEffect(() => {
    setLugarRender(lugar)
  },[lugar])

  let event = {title: 'string', date: 'string', location: 'string', author: 'string', url: 'URL', image: 'URL', price: 'number'}

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
    
    <h1> {lugarRender.name} </h1>
    <button onClick={handleAddPlace}>guardar lugar</button>
    {console.log(lugares)}
    {console.log(lugarRender)}
    {!lugares.every((i) => i.coords !== lugarRender.coords) ? (
      <button onClick={handleDelPlace}>Eliminar lugar</button>
    ):null}

    <Event event={event}/>
    <New event={event}/>
    <Weather event={event}/>

    </Container>
  );
}
