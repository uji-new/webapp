import React from "react";
import { Button, Card } from "react-bootstrap";

// title: string, description: string, author: string, url: URL, image: URL
export const New = (props) => {
    const event = props.event;
    return (
        <Card style={{ width: '18rem' }}>
            {event.image ? <Card.Img variant="top" src={event.image} /> : ''}
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.author}</Card.Subtitle>
                <Card.Text>{event.description}</Card.Text>
                <Button href={event.url} variant="primary">Seguir leyendo</Button>
            </Card.Body>
        </Card>
    )
}