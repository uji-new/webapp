import React, { 
  useState, 
  useEffect,
  useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Layout} from './components/Layout';
import Client from 'utils/Client'
import {UserForm} from 'components/Form'


export const AuthContext = React.createContext()

export default function App(){
    const [user, setUser] = useState();
    const [servicios, setServicios] = useState({});

    //const servicios = useRef({}) //memoizacion para ahorar renderizados  
    
    useEffect(() => {
        let mounted = true;
        Client.session.getAccount()
          .then(r => {
            if(mounted) {
              setUser(r.mail)
            }
          }).catch(Client.session.loginAsGuest())
        return () => mounted = false;
    }, [])

    useEffect(() => {
      let mounted = true;
      Client.service.getServices()
        .then(r => {
          if(mounted) {
            let auxServicios = {}
            r.map(i => {
              auxServicios[i.service.type] = {...i.service, enabled:i.enabled}
            })
            setServicios(auxServicios)
          }
        }).catch(setServicios({}))
      return () => mounted = false;
  }, [] )
          
  const context = {
    user,
    setUser,
    servicios,
    setServicios
  }

  return (   
    <AuthContext.Provider value={context}> 
        <Layout servicios={servicios}/>
    </AuthContext.Provider >
    );
}