import React, { Component } from 'react';

import './Weather.css'
import {Card, Button} from "react-bootstrap";

//icon description temp rain wind
export const Weather = (props) => {
    const {event, lugar} = props;
    const mS_to_kmH = (velocity) => velocity * 3.6;
    return (
        <div className="widget">
            <Card>
                <Card.Body>
                    <Card.Title className="city">
                        {lugar.name}
                    </Card.Title>
                    <Card.Subtitle className="date mb-2 text-muted">
                        {new Date().toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                    </Card.Subtitle>
                    <Card.Text className="weather">
                        <img src={event.icon} alt="" width="90"/>
                        {event.temp.toLocaleString(undefined, {maximumFractionDigits: 1, style: 'unit', unit: 'celsius'})}
                    </Card.Text>
                    <Card.Subtitle className="weather-description">
                        {event.description}
                    </Card.Subtitle>
                    <Card.Text className="additional-info">
                        <div className="rain-data">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-rain" className="rain-icon svg-inline--fa fa-cloud-rain fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="rgba(0,0,0,0.7)" d="M416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.1 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96zM88 374.2c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0z"></path>
                            </svg>
                            {event.rain.toLocaleString(undefined, {style: 'percent'})}
                        </div>
                        <div className="wind-data">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wind" className="wind-icon svg-inline--fa fa-wind fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="rgba(0,0,0,0.7)" d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"></path>
                            </svg>
                            {mS_to_kmH(event.wind).toLocaleString(undefined, {style: 'unit', unit: 'kilometer-per-hour', maximumFractionDigits: 1})}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    )

}
