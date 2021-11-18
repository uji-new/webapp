import React from 'react';
import {Nav,NavDropdown, Row, Col, Offcanvas,Button, Navbar, Container, Form, FormControl} from "react-bootstrap";
import { getSesion } from '../services/sesiones'

const handleSesion = (event) => {
    event.preventDefault()
    console.log("logIn")
}

export default function Barrasuperior() {
    return (
      <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">App</Navbar.Brand>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>

        
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel"> {"Log in"}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                <Container>
                {getSesion().then(r => r.text())}
                <Row className="mt-5">
                        <Form onSubmit={handleSesion}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Mail</Form.Label>
                                <Form.Control 
                                    name="mail"
                                    type="text" 
                                    placeholder="Enter email" 
                                    />
                                    
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password"                                    
                                    type="password" 
                                    placeholder="Password" 
                                    />
                            </Form.Group>
                            <Button variant="success btn-block" type="submit">
                                Iniciar Session
                            </Button>
                        </Form>
                </Row>
            </Container>
                
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
  }

