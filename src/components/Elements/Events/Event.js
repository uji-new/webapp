import React from "react";
import { Button, Card } from "react-bootstrap";

export const Event = (props) => {
    const { event } = props;
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>               
                {`date = ${event.date}`}                
                <br />  
                {`location = ${event.location}`}
                <br />
                {`author = ${event.author}` + '\n'}
                <br />
                {`price = ${event.price}` + '\n'}   
            </Card.Text>
        </Card.Body>
        </Card>
    )
}