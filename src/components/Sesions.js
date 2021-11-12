import React,{ Component, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { crearCuenta, iniciarSesion } from '../services/sesiones'
import { verLugares, anadirLugares,buscarLugares } from '../services/lugares'
import { fetchOP } from '../helpers/fetchOP'



const GestorSesiones = () => {
    const[usuario, setUsuario] = useState(null)
    const [mail, setMail] = useState('')
    const [password, setPasstord] = useState('')
    
    const handleCuenta = async(event) => {
    event.preventDefault()
        let b = crearCuenta({
            mail,
            password
        })
        b.then(setUsuario(mail+'hdCOD'))
    }
    
    
    const handleSesion = async(event) => {
        event.preventDefault()
        let b = iniciarSesion({
            mail,
            password
        })
        if(b)
            setUsuario(mail+'hdCOD')
    }

    const lista = () => {
        console.log("LISTA")
        verLugares({})
    }
    const buscar = () => {
        console.log("BUSCAR");
        buscarLugares({query: 'cas'})
    }
    const anadir = () => {
        console.log("ANADIR")
        anadirLugares({
            query: 'Valencia',
            name: 'vlc'
        })
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
            
            </Container>
        </Container>
        </>
    )
}

export default GestorSesiones

