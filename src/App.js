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
    

    //const servicios = useRef({}) //memoizacion para ahorar renderizados  
    //Client.session.loginAsGuest()
    
    //useEffect(() => {
    //  console.log("hola")
    //  async function xx() {
    //    x ? await Client.session.getAccount().catch(r => r? Client.session.loginAsGuest():null):null
    //  }   
    //  console.log("adios")
    //  xx()
    //})

    useEffect(() => {   
        let mounted = true;
        Client.session.getAccount()
          .then(r => {
            if(mounted) {
              setUser(r.mail)
            }
          }).catch((r) => {
            console.log(r)
            r => r? Client.session.loginAsGuest():null})   
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