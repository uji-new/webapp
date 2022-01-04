import React,{useEffect, useContext, useState} from "react";
import "App.css";
import { SideBar } from 'components'
import { Content } from 'components'
import { AuthContext } from "App.js";

import Client from "utils/Client";

export const Layout = () => {
  const { user, setUser, servicios} = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [previousWidth, setPreviousWidth] = useState(-1)
  
  const [serviciosLugar, setServiciosLugar] = useState({})
  const [datosLugar, setDatosLugar] = useState({})
  const [actializarServicios, setActializarServicios] = useState(true)
  
  const [lugar, setLugar] = useState({})
  const [lugares, setLugares] = useState([])
  const [lugaresNoG, setLugaresNoG] = useState([])
  const [actualizarLugares, setActualizarLugares] = useState(true)
  

  useEffect(() => {
    const fetchLugares = async () => {
      await Client.location.getLocations()
        .then(r => {
          setLugares(r)
      }).catch(setLugares([]))
    }
    fetchLugares()
  }, [lugar, user, actualizarLugares])

  useEffect(() => {
    const fetchServicios = async () => {
      lugar.coords ? (
        await Client.service.getServicesForLocation(lugar.coords)
        .then(s => {
          let serviciosLugarAux = {}
          let datosLugarAux = {}
          s.map(i => {
            serviciosLugarAux[i.service.type] = {...i.service, enabled:i.enabled}
            console.log(i.data)
            datosLugarAux[i.service.type] = i.data
          }) 
        setServiciosLugar(serviciosLugarAux)
        setDatosLugar(datosLugarAux)
      })):null
    }
    fetchServicios()
  }, [lugar, actializarServicios, servicios])
  
  useEffect(()=> {
    const updateWidth = () => {
      const width = window.innerWidth;
      const widthLimit = 576;
      const isMobileTemp = width <= widthLimit;   
      const wasMobile = previousWidth <= widthLimit;
      if (isMobileTemp !== wasMobile) {
        setIsOpen(!isMobileTemp)
      }
      setPreviousWidth(width);
    }
    updateWidth();

    window.addEventListener("resize", updateWidth.bind(this));
  },[window.innerWidth])

  const toggle = () => {
    setIsOpen(!isOpen)
  };



  return(
      <div className="App wrapper">
            <SideBar toggle={toggle}  isOpen={isOpen} 
                                      lugar={lugar} setLugar={setLugar}
                                      lugares={lugares}
                                      lugaresNoG={lugaresNoG} setLugaresNoG={setLugaresNoG}
                                      setActualizarLugares={setActualizarLugares}
                                      />
            <Content toggle={toggle}  isOpen={isOpen} 
                                      lugar={lugar} setLugar={setLugar}
                                      lugares={lugares} setLugares={setLugares}
                                      setLugaresNoG={setLugaresNoG}
                                      serviciosLugar={serviciosLugar} setServiciosLugar={setServiciosLugar}
                                      datosLugar={datosLugar} setDatosLugar={setDatosLugar}
                                      setActializarServicios={setActializarServicios}
                                      setActualizarLugares={setActualizarLugares}
                                      />              
      </div>
  )
}


//const ButtonSideBar = (props) => {
//  const {setLugar} = React.useContext(WizardContext)
//  return (
//      <button type="button" onClick={() => setLugar(props.nombre)}>
//          {props.nombre}
//      </button>
//  ) 
//}
