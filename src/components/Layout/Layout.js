import React from "react";
import "App.css";
import { SideBar } from 'components'
import { Content } from 'components'
import { Button } from "react-bootstrap";
import { NavBar} from "components";
import Client from "utils/Client";

export const Layout = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(true)
  const [previousWidth, setPreviousWidth] = React.useState(-1)
  
  const [lugar, setLugar] = React.useState({})
  const [lugares, setLugares] = React.useState([])
  
  React.useEffect(() => {
    const fetchLugares = async () => {
      const l = await Client.location.getLocations()
      setLugares(l)
    }
    fetchLugares();
  }, [lugar])
  
  React.useEffect(()=> {
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
  })

  const toggle = () => {
    setIsOpen(!isOpen)
  };



  return(
      <div className="App wrapper">
            <SideBar toggle={toggle} isOpen={isOpen} lugar={lugar} lugares={lugares} setLugar={setLugar}/>
            <Content toggle={toggle} isOpen={isOpen} lugar={lugar} lugares={lugares} setLugar={setLugar}/>               
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
