import React, { Component } from 'react';

import './Weather.css'
import {Card, Button} from "react-bootstrap";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var months = [
"Enero",
"Febrero",
"Marzo",
"Abril",
"Mayo",
"Junio",
"Julio",
"Agosto",
"Septiembre",
"Octubre",
"Noviembre",
"Diciembre",
];

var days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
//icon description temp rain wind
export const Weather = (props) => {
    const {event, lugar} = props;
    return (
        <div className="widget">            
            <div className="left-panel panel">
                <div className="date">
                    {days[today.getDay()]} {today.getDate()} de {months[mm - 1]}
                </div>
                <div className="city">
                    {lugar.name}
                </div>
                <div className="temp">
                   <img src={event.icon} alt="" width="90"/>
                   {event.temp}&deg;
                </div>
            </div>           
        </div>
    )

}

{
        //<Card style={{ width: '18rem' }}>
        //<Card.Body>
        //    <Card.Title>{lugar.name}</Card.Title>
        //    <Card.Text>               
        //        {event.description + '\n'} 
        //        {event.icon}
        //        <br />  
        //        {`temp = ${event.temp}`}
        //        <br />
        //        {`rain = ${event.rain}` + '\n'}
        //        <br />
        //        {`wind = ${event.wind}` + '\n'}   
        //    </Card.Text>
        //</Card.Body>
        //</Card>
}