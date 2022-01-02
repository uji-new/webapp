import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'

//Inicio de Sesion
export const SingIn = ({setUser}) => {
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await Client.session.login( mail, password );
        setUser(mail);
      }
    
    return (
            <>
                <Row className="mt-5">
                        <Form onSubmit={handleSubmit}> 
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
                            <Button variant="success btn-block" type="submit">
                                Iniciar Sesion
                            </Button>
                        </Form>
                </Row>
            </>
    )
}

SingIn.prototype ={ 
    setUser: PropTypes.func.isRequired
}