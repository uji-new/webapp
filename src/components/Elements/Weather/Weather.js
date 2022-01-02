import React, { Component } from 'react';

import './Weather.css'
import {Card, Button} from "react-bootstrap";

var days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
//icon description temp rain wind
export const Weather = (props) => {
    const {event, lugar} = props;
    return (
        <div className="widget">            
            <div className="left-panel panel">
                <div className="date">
                    {new Date().toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                </div>
                <div className="city">
                    {lugar.name}
                </div>
                <div className="temp">
                   <img src={event.icon} alt="" width="90"/>
                   {event.temp.toLocaleString(undefined, {maximumFractionDigits: 1})} &deg;C
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