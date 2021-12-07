import React from "react";
import { Button, Card } from "react-bootstrap";

export const Event = (props) => {
    const event = props.event;
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
            Un Evento
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
    )
}