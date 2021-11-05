import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import urlcat from 'urlcat'

const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Crear una cuenta")
    fetch(  urlcat('/user?mail=:mail&password=:password', {
            mail:'juan', password:'juan'}), {
            method: 'POST', credentials:'same-origin'}
    );
    //fetchOP('POST','/user?mail=:mail&password=:password', {id:'juan', password:'juan'})
    //.then(response => response.text())
    //.then(data => console.log(data));
    console.log("usuario creado")
}

const LoginPage = () => {
    return (
        <>
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Login</h1>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" />
                            </Form.Group>

                            <Button variant="success btn-block" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2021 Masud Rana. All Rights Reserved.</h6>
            </Container>
        </>
    );
};

export default LoginPage;