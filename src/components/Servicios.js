import React, { Component } from 'react';
import {Card, Button} from "react-bootstrap";


//Respuesta: 
//{icon: URL, description: string, temp: number, rain: number, wind: number}
function Clima(props) {
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
//Respuesta: 
//[{title: string, date: string, location: string, author: string, url: URL, image: URL, price: number}, ...]
function Evento(){
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
}

//Respuesta: 
//[{title: string, description: string, author: string, url: URL, image: URL}, ...]
function Noticia() {
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
}