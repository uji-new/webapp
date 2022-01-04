import React, { useState } from 'react';
import { 
    Tab, 
    Tabs, 
    Container,
    Button,
    ButtonGroup,
    Col, Form, Row
 } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'

export function UserForm({setUser}) {
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();

    const handleSubmitIn = async e => {
        e.preventDefault();
        await Client.session.login( mail, password );
        setUser(mail);
      }

    const handleSubmitUp = async e => {
        e.preventDefault();
        await Client.account.register( mail, password );
        setUser(mail);
    }

    return (    
        <>
                <Form> 
                    <Form.Group className="form-group" controlId="formBasicEmail">
                        <Form.Label>Mail</Form.Label>
                        <Form.Control 
                            name="mail"
                            type="mail" 
                            autoComplete="off"
                            placeholder="mail@example.org" 
                            onChange={event => setMail(event.target.value)}
                            />
                            
                    </Form.Group>

                    <Form.Group className="form-group" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"                                    
                            type="password" 
                            placeholder="password" 
                            onChange={event => setPassword(event.target.value)}
                            />
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example" className="form-buttons">
                    <Button sm={1} variant="primary" onClick={handleSubmitIn}>
                        Iniciar sesion
                    </Button>
                    <Button sm={1} variant="primary" onClick={handleSubmitUp}>
                        Crear cuenta
                    </Button>
                    </ButtonGroup>
                </Form>
        </>
         
    )
}

UserForm.prototype ={ 
    setUser: PropTypes.func.isRequired
}