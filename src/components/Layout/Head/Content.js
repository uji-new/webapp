import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { NavBar} from "components";

export class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        clima: "hola",
        eventos: "adioas",
        noticias: "bon dia"
    };
  }
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
        >
      <NavBar toggle={this.props.toggle} />
        {this.state.clima}
        {this.state.eventos}
        {this.state.noticias}
      </Container>
    );
  }
}
