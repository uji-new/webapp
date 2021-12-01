import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Route,Routes,Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

const lugares = [
  {coords: "0,1", name: "castellon", alias: "cs"},
  {coords: "0,2", name: "valencia", alias: "vlc"},
  {coords: "0,3", name: "alicante", alias: "ali"}
],

export class SideBar extends React.Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true,
      routes: [
        {
          nombre: 'HOME',
          path: "/",
        },
      ]
    }
  }
  render() {
    const routes = []
    lugares.map(r => {
      routes.push({
        nombre: r.name,
        path: '/'+r.name,
        main: r.name
      })
    })
  

    return (
      <>
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
          <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>react-bootstrap sidebar</h3>
        </div>
        <div>
          <Nav className="flex-column pt-2">
            <p className="ml-3">Heading</p>
            
            <Nav.Item>
              
                <Link to="/">Home</Link>   
                       
            </Nav.Item>

            <Nav.Item>
             
                <Link to="/place">Profile</Link>
              
            </Nav.Item>

            <Nav.Item>
              
                <Link to="/settings">Settings</Link>
              
            </Nav.Item>
          </Nav>
        </div>

        
      </div>
        
      </>
    );
  }
}

