import React, { Component } from 'react';
import {Card, Button} from "react-bootstrap";

//Respuesta: 
//{icon: URL, description: string, temp: number, rain: number, wind: number}
export const Weather = (props) => {
    const event = props.event;
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
            Clima
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
    )
}