import React, { 
  useState, 
  useEffect,
  useLayoutEffect,
  useRef } from 'react';
import {Layout} from './components/Layout';
import Client from 'utils/Client'

export const AuthContext = React.createContext()

export default function App(){
    const [user, setUser] = useState();
    const [servicios, setServicios] = useState({});

    useEffect(() => {   
        let mounted = true;
        Client.session.getAccount()
          .then(r => {
            if(mounted) {
              setUser(r.mail)
            }
          }).catch((r) => { 
            Client.session.loginAsGuest()
          })
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