import React from "react";
import { Button, Card } from "react-bootstrap";

//title date location author url image price
export const Event = (props) => {
    const { event } = props;
    return (
        <Card style={{ width: '18rem' }}>
            {event.image ? <Card.Img variant="top" src={event.image} /> : ''}
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.author}</Card.Subtitle>
                <Card.Text>
                    {new Date(event.date).toLocaleString()}
                    <br />
                    {event.location}
                    <br />
                    {event.price ? event.price.toLocaleString(undefined, {style: 'currency', currency: 'EUR'}) : 'No disponible'} 
                </Card.Text>
                <Button href={event.url} variant="primary">Reservar</Button>
            </Card.Body>
        </Card>
    )
}

{
//  <div className="card-grid-space">
//  <div className="num">{event.image}</div>
//  <a className="card" href={event.url} styles={`--bg-img: url(${event.image})`}>
//  <div>
//      <h1>HTML Syntax</h1>
//      <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
//      <div className="date">6 Oct 2017</div>
//      <div className="tags">
//      <div className="tag">HTML</div>
//      </div>
//  </div>
//  </a>
//</div>

//<Card style={{ width: '18rem' }}>
//        <Card.Body>
//            <Card.Title>{event.title}</Card.Title>
//            <Card.Text> 
//                {event.url}
//                <br/>  
//                {event.image}
//                <br/>
//                {`date = ${event.date}`}                
//                <br />  
//                {`location = ${event.location}`}
//                <br />
//                {`author = ${event.author}` + '\n'}
//                <br />
//                {`price = ${event.price}` + '\n'}   
//            </Card.Text>
//        </Card.Body>
//        </Card>
}