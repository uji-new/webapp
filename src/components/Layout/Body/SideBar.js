import React ,{useState} from 'react';
import {Tab, Row, Col, Nav} from "react-bootstrap";
import {Sessions} from 'features';
import {LugaresListado} from '.';
import {LugaresAcciones} from '.';


export class SideBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lugares: []
                     //[  {
                     //   coords: "39,0", 
                     //   name: "Castellon", 
                     //   alias: "Castellon"
                     //   },
                     //   {  
                     //   coords: "39,0", 
                     //   name: "Valencia", 
                     //   alias: "Valencia"
                     //   }]
        }
    }
    render(){
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {this.state.lugares.map(l => <LugaresListado key={l.name} lugar={l.name}/>)}    
                        <Nav.Item>
                        <Nav.Link eventKey="create">Creac cuenta</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        {this.state.lugares.map(l => <LugaresAcciones key={l.name} lugar={l.name}/>)}    
                        <Tab.Pane eventKey="create">
                            <Sessions/>
                        </Tab.Pane>
                    
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            
        );
    }
}
