import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Layout} from './components/Layout';
import Client from 'utils/Client'
import {UserForm} from 'components/Form'

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
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} />                     
                </Routes>
            </BrowserRouter>
        </>
      );
}