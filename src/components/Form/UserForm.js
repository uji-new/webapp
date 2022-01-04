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
            <Row className="mt-5">
                <Form> 
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Mail</Form.Label>
                        <Form.Control 
                            name="mail"
                            type="text" 
                            autoComplete="off"
                            placeholder="Enter email" 
                            onChange={event => setMail(event.target.value)}
                            />
                            
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"                                    
                            type="password" 
                            placeholder="Password" 
                            onChange={event => setPassword(event.target.value)}
                            />
                    </Form.Group>
                    <br/>
                    <Button variant="success btn-block" onClick={handleSubmitIn}>
                        Iniciar sesion
                    </Button>
                    <Button variant="success btn-block" onClick={handleSubmitUp}>
                        Crear cuenta
                    </Button>
                </Form>
            </Row>
        </>
         
    )
}

UserForm.prototype ={ 
    setUser: PropTypes.func.isRequired
}