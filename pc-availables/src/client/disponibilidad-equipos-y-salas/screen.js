import React from "react";
import {
  Container
} from "@ombiel/aek-lib";
import SalaUsuarioList from "./components/SalaUsuarioList";

export default class Screen extends React.Component {

  componentDidMount() {

  }

  render() {

    return (
      <Container>
        <SalaUsuarioList />
      </Container>
    );

  }

}
