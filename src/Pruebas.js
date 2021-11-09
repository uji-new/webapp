import React,{ Component, useState, useEffect } from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import App from "./App";
import { crearCuenta, iniciarSesion } from './services/sesiones';
import { verLugares, anadirLugares,buscarLugares } from './services/lugares';
import { fetch } from './helpers/Api';


const Pruebas = () => {
    //state = {Mail: "", Password: ""};
    const [usuario, setUsuario] = useState(null);
    const [mail, setMail] = useState('');
    const [password, setPasstord] = useState('');
    
    //const handleCuenta = async(event) => {
    //event.preventDefault()
    //const b = crearCuenta({
    //            mail: mail,
    //            password: password
    //    }).then(r => console.log(r.json()))
    //    
    //}
    const handleCuenta = async(event) => {
        event.preventDefault();
        fetch('GET', '/places', {}).then(r => console.log(r));
    }
    
    
    const handleSesion = async(event) => {
        event.preventDefault();
        let b = iniciarSesion({mail, password});
        if(b) setUsuario(mail + 'hdCOD');
    }
    
        //const valueToPassword = (target) => {
       //   this.setPasstord(() => {
      //        return { [target.name]:target.value }
     //   });
    //  }
    
    return(
        <>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Whoiam                            
            <pre>{usuario}</pre>

        </h1>

        <Container>
            <Container>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
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
                    </Col>
                </Row>
            </Container>
            
            <Container>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
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
                    </Col>
                </Row>
            </Container>

            <Container>
            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                
                <Button id="lista" variant="success btn-block">
                    lista
                </Button>
                <Button id="buscar" variant="success btn-block">
                    buscar
                </Button>
                <Button id="anadir" variant="success btn-block">
                    anadir
                </Button>
            
            </Col>
            </Container>
        </Container>
        </>
    )
    
    
}
export default Pruebas
window.onload = function(){
    //lista
    document.getElementById("lista").onclick = function() {
        console.log("LISTA")
        verLugares({})
    }
    //buscar
    document.getElementById("buscar").onclick = function() {
        console.log("BUSCAR");
        buscarLugares({query: 'cas'})
    }
    //anadir
    document.getElementById("anadir").onclick = function() {
        console.log("ANADIR")
        anadirLugares({
            query: 'Valencia',
            name: 'vlc'
        })
    }
}
