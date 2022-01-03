import React from "react";
import './Event.css';
import { Button, Card } from "react-bootstrap";

//title date location author url image price
export const Event = (props) => {
    const { event } = props;
    return (
        <Card className="events-card" style={{ width: '18rem' }}>
            {event.image ? <Card.Img variant="top" src={event.image} /> : ''}
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.author}</Card.Subtitle>
                <Card.Text>
                    {new Date(event.date).toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'short'})}
                    <br />
                    {event.location}
                    <br />
                    {event.price ? event.price.toLocaleString(undefined, {style: 'currency', currency: 'EUR'}) : 'No disponible'} 
                </Card.Text>
                <Button className="events-card-button" href={event.url} target="_blank" variant="primary">Reservar</Button>
            </Card.Body>
        </Card>
    )
}
