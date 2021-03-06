import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'

//Crear una cuenta
export const LogOut = ({setUser, setLugaresNoG}) => {
    const handleDelSession = async e => {
        e.preventDefault();
        setLugaresNoG([])
        await Client.session.logout();
        await Client.session.loginAsGuest()
        setUser(null);
      }
    
    return (
            <Button variant="primary" onClick={handleDelSession}>
                Cerrar session
            </Button>
    )
}

LogOut.prototype ={ 
    setUser: PropTypes.func.isRequired
}