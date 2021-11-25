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

const routes = [
  {
    path: "/",
    main: () => <Home />,
    sidebar: () => (
      <p>
        This is your home page. You'll see your feed which is made up of the
        people you follow.
      </p>
    )
  },
  {
    path: "/profile",
    main: () => <Profile />,
    sidebar: () => (
      <p>
        This is your profile page. You'll be able to see all your profile
        information as well as the people you follow.
      </p>
    )
  },
  {
    path: "/settings",
    main: () => <Settings />,
    sidebar: () => (
      <p>
        This is your settings page. You can change your name, image, and
        anything else associated with your account.
      </p>
    )
  }
];

export class SideBar extends React.Component {
  render() {
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
          
          <Nav.Item className="active">
            <Link to="/">Home</Link>              
          </Nav.Item>

          <Nav.Item>
            <Link to="/profile">Profile</Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/settings">Settings</Link>
          </Nav.Item>

        </Nav>
        
          <Routes>
            {routes.map(({ path, sidebar }) => (
              <Route
                key={path}
                path={path}
                element={sidebar()}
              />
            ))}
          </Routes>
        </div>

        
      </div>
        <Routes>
        {routes.map(({ path, main }) => (
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

