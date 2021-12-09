import React from "react";
import { Button, Card } from "react-bootstrap";

export const New = (props) => {
    const event = props.event;
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
                {`date = ${event.description}`}                
                <br />  
                {`author = ${event.author}`}
      
            </Card.Text>
        </Card.Body>
        </Card>
    )
}