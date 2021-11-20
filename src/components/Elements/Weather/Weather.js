import React, { Component } from 'react';
import {Card, Button} from "react-bootstrap";

//Respuesta: 
//{icon: URL, description: string, temp: number, rain: number, wind: number}
export default function Clima(props) {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.icon} />
            <Card.Body>
                <Card.Title>WEATHER</Card.Title>
                <Card.Text>
                {props.description,
                props.temp,
                props.rain,
                props.wind}
                </Card.Text>
            </Card.Body>
        </Card>
    )  
}