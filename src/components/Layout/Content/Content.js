import React, {useContext} from "react";

import './Content.css'
import classNames from "classnames";
import { AuthContext } from "App.js";
import { NavBar} from "components";
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
    setLugaresNoG
  } = props
  

  return (
    <div className='content'
      
      className={classNames("content", { "is-open": props.isOpen })}
      >
    <NavBar 
      toggle={props.toggle} 
      setLugar={setLugar} 
      setLugares={setLugares}
      setLugaresNoG={setLugaresNoG}
      lugares={lugares}
    />
    
    {lugar.name ? (
      lugar.name === 'historial' ? (
        <Historial setLugaresApi={setLugaresApi} setLugar={setLugar}/>
        ):<Lugar {...props}/>
        ):<Bienvenida/>}

    </div>
  );
}
