import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'

//Crear una cuenta
export const LogOut = ({setUser}) => {
    const handleDelSession = async e => {
        e.preventDefault();
        await Client.session.logout();
        await Client.session.loginAsGuest()
        setUser('');
      }
    
    return (
            <Container>
                <Button variant="success btn-block" onClick={handleDelSession}>
                    Cerrar Session
                </Button>        
            </Container>
    )
}

LogOut.prototype ={ 
    setUser: PropTypes.func.isRequired
}