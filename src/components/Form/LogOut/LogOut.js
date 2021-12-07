import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'

//Crear una cuenta
export const LogOut = ({setUser}) => {
    const handleDelSession = async e => {
        e.preventDefault();
        const token = await Client.session.logout();
        setUser('');
      }
    
    return (
            <Container>
                <h1> Cerrar Session </h1>
                    <Button variant="success btn-block" onClick={handleDelSession}>
                        Cerrar Session
                    </Button>        
            </Container>
    )
}

LogOut.prototype ={ 
    setUser: PropTypes.func.isRequired
}