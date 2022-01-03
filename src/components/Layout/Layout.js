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
  
  const [lugar, setLugar] = useState({})
  const [serviciosLugar, setServiciosLugar] = useState({})
  const [datosLugar, setDatosLugar] = useState({})
  const [actializarServicios, setActializarServicios] = useState(true)

  const [lugares, setLugares] = useState([])
  const [lugaresNoG, setLugaresNoG] = useState([])
  

  useEffect(() => {
    const fetchLugares = async () => {
      await Client.location.getLocations()
        .then(r => {
          setLugares(r)
      }).catch(setLugares([]))
    }
    fetchLugares()
  }, [lugar, user])

  useEffect(() => {
    const fetchServicios = async () => {
      lugar.coords ? (
        await Client.service.getServicesForLocation(lugar.coords)
        .then(s => {
          console.log(s)
          let serviciosLugarAux = {}
          let datosLugarAux = {}
          s.map(i => {
            console.log(i)
            serviciosLugarAux[i.service.type] = {...i.service, enabled:i.enabled}
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
                                      setActializarServicios={setActializarServicios}
                                      />
            <Content toggle={toggle}  isOpen={isOpen} 
                                      lugar={lugar} setLugar={setLugar}
                                      lugares={lugares} setLugares={setLugares}
                                      setLugaresNoG={setLugaresNoG}
                                      serviciosLugar={serviciosLugar} setServiciosLugar={setServiciosLugar}
                                      datosLugar={datosLugar} setDatosLugar={setDatosLugar}
                                      setActializarServicios={setActializarServicios}
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
