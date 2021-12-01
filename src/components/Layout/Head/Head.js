import React, {useState, useEffect} from 'react';
import { Row, Offcanvas,Button, Navbar, Container, Form, FormControl} from "react-bootstrap";
import Client from 'utils/Client'

const logOut = () => {
    console.log("logOut")
    Client.session.deleteSession()
    Client.session.getAccount().then(r => console.log(r))
}


export function Head() {
    const [user, setUser] = useState();
    
    useEffect(() => {
        let mounted = true;
        Client.session.getAccount()
          .then(r => {
            if(mounted) {
                console.log(r.mail);
              setUser(r.mail)
            }
          })
        return () => mounted = false;
      }, [])

    return (
      <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">App</Navbar.Brand>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>

        
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel"> {user}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                <Container>                                               
                    <Button onClick={logOut} variant="success btn-block">
                        Cerrar Session
                    </Button>                                          
                </Container>
                
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
  }

