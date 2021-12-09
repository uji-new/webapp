import React, { Component } from 'react';
import {Card, Button} from "react-bootstrap";

//Respuesta: 
//{icon: URL, description: string, temp: number, rain: number, wind: number}
export const Weather = (props) => {
    const {event, lugar} = props;
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{lugar.name}</Card.Title>
            <Card.Text>               
                {event.description + '\n'} 
                <br />  
                {`temp = ${event.temp}`}
                <br />
                {`rain = ${event.rain}` + '\n'}
                <br />
                {`wind = ${event.wind}` + '\n'}   
            </Card.Text>
        </Card.Body>
        </Card>
    )
}