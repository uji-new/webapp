import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Layout} from './components/Layout';
import Client from 'utils/Client'
import {UserForm} from 'components/Form'


export const AuthContext = React.createContext()

export default function App(){
    const [user, setUser] = useState();
    
    useEffect(() => {
        let mounted = true;
        Client.session.getAccount()
          .then(r => {
            if(mounted) {
              console.log(r.mail);
              setUser(r.mail)
            }
          })
        return () => mounted = false;
    }, [])

    //if(!user) {
    //  return <UserForm setUser={setUser}/>
    //}

          
  const context = {
    user,
    setUser
  }
    

  return (   
    <AuthContext.Provider value={context}>              
        {!user ? <UserForm setUser={setUser}/>: <Layout/>}
    </AuthContext.Provider >
    );
}