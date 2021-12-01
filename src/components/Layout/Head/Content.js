import React, {useEffect} from "react";
import classNames from "classnames";

import { Container } from "react-bootstrap";
import { NavBar} from "components";
import { Route,Routes } from "react-router-dom";

export function Content(props) {
  var routes = [
    {
      path: "/",
      main: () => <h1>home</h1>
    }
  ]

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": props.isOpen })}
      >
    <NavBar toggle={props.toggle} />
    <Routes>
        {routes.map(({ path, main }) => (
          <Route
            key={path}
            path={path}
            element={main()}
          />
        ))}
      </Routes>
    </Container>
  );
}
