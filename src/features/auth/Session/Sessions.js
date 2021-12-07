import React,{ Component, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Client from 'utils/Client';


export const Sessions = () => {
    const[usuario, setUsuario] = useState(null)
    const [mail, setMail] = useState('')
    const [password, setPasstord] = useState('')
    
    const handleCuenta = async(event) => {
        event.preventDefault();
        Client.user.newUser(mail, password).then(() => setUsuario(`${mail}hdCOD`));
    }
    
    const handleSesion = async(event) => {
        event.preventDefault()
        Client.session.newSession(mail, password).then(() => setUsuario(`${mail}hdCOD`));
    }

    const lista = () => {
        console.log("LISTA");
        Client.places.getPlaces().then(console.log);
    }

    const buscar = () => {
        console.log("BUSCAR");
        Client.query.query('cas').then(console.log);
    }

    const anadir = () => {
        console.log("ANADIR");
        Client.places.newPlace('Valencia', 'vlc');
    }
    const who = () => {
        console.log("QUIEN SOY");
        Client.session.getAccount(r => console.log(r));
    }
   
    return(
        <>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Whoiam                            
            <pre>{usuario}</pre>

        </h1>

        <Container>
            <Container>
                <Row className="mt-5">
                        <Form onSubmit={handleCuenta}>
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
                                    onChange={event => setPasstord(event.target.value)}
                                    />
                            </Form.Group>
                            <Button variant="success btn-block" type="submit">
                                Crear cuenta
                            </Button>
                        </Form>
                </Row>
            </Container>
            
            <Container>
                <Row className="mt-5">
                        <Form onSubmit={handleSesion}>
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
                                    onChange={event => setPasstord(event.target.value)}
                                    />
                            </Form.Group>
                            <Button variant="success btn-block" type="submit">
                                Iniciar Session
                            </Button>
                        </Form>
                </Row>
            </Container>

            <Container>
                
                <Button onClick={lista} variant="success btn-block">
                    lista
                </Button>
                <Button onClick={buscar} variant="success btn-block">
                    buscar
                </Button>
                <Button onClick={anadir} variant="success btn-block">
                    anadir
                </Button>
                <Button onClick={who} variant="success btn-block">
                    QUIEN
                </Button>
            
            </Container>
        </Container>
        </>
    )
}

