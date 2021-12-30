import React, { useState } from 'react';
import { 
    Tab, 
    Tabs, 
    Container,
    Button,
    ButtonGroup
 } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'
import { SingIn } from 'components';
import { SingUp } from 'components';

export function UserForm({setUser}) {
    const [accion, setAccion] = useState(true);

    const handSingIn = () => setAccion(true);
    const handSingUp = () => setAccion(false);
    return (    
        <>
            <ButtonGroup aria-label="Basic example">
                <Button 
                    variant={accion?'success btn-block':'secondary'}
                    onClick={handSingIn} >Sing In</Button>
                <Button 
                    variant={!accion?'success btn-block':'secondary'}
                    onClick={handSingUp} >Sing Up</Button>
            </ButtonGroup>
            <br/>
            <br/>

            {accion ? <SingIn setUser={setUser}/>:<SingUp setUser={setUser}/>}
                    
              
                   
            
        </>
         
    )
}

UserForm.prototype ={ 
    setUser: PropTypes.func.isRequired
}