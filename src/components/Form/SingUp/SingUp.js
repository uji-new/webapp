import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'

//Crear una cuenta
export function SingUp({setUser}) {
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await Client.user.newUser( mail, password );
        setUser(mail);
      }
    
    return (
            <Container>
                <Row className="mt-5">
                        <Form onSubmit={handleSubmit}> 
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Mail</Form.Label>
                                <Form.Control 
                                    name="mail"
                                    type="text" 
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

                            <Button variant="success btn-block" type="submit">
                                Crear cuenta
                            </Button>
                        </Form>
                </Row>
            </Container>
    )
}

SingUp.prototype ={ 
    setUser: PropTypes.func.isRequired
}