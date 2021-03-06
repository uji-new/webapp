import React, {useState, useEffect} from 'react';
import { Row, Offcanvas,Button, Navbar, Container, Form, FormControl} from "react-bootstrap";
import Client from 'utils/Client'
import { SearchBar } from 'features';

const logOut = () => {
    Client.session.deleteSession()
    Client.session.getSession().then(r => console.log(r))
}


export function Head() {
    const [user, setUser] = useState();
    
    useEffect(() => {
        let mounted = true;
        Client.session.getSession()
          .then(r => {
            if(mounted) {
              setUser(r.mail)
            }
          })
        return () => mounted = false;
      }, [])

    return (
      <Navbar bg="light" expand={false}>
            <Container >
                <Navbar.Brand href="#">App</Navbar.Brand>
                
                <SearchBar />

        
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

