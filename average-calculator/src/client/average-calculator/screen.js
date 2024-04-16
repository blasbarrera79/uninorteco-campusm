import React from "react";
import { Container } from "@ombiel/aek-lib";
import Home from "./Home";

export default function Screen(props) {
  return (
    <Container>
      <Home {...props} />
    </Container>
  );
}