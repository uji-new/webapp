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

const Home = () => <h1>Home</h1>;
const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;


export class SideBar extends React.Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true,
      routes: [
        {
          path: "/",
          main: () => <h1>home</h1>
        },
      ]
    }
  }
  render() {
    const routes = []
    this.props.lugares.map(r => {
      routes.push({
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
             
                <Link to="/profile">Profile</Link>
              
            </Nav.Item>

            <Nav.Item>
              
                <Link to="/settings">Settings</Link>
              
            </Nav.Item>
          </Nav>
        </div>

        
      </div>
        <Routes>
        {this.state.routes.map(({ path, main }) => (
          <Route
            key={path}
            path={path}
            element={main()}
          />
        ))}
      </Routes>
      </>
    );
  }
}

