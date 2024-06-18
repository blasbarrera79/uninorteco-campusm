import React from "react";
import { Container } from "@ombiel/aek-lib";
import HelpdeskForm from "./components/form";

export default class Screen extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ background: 'radial-gradient(circle at 100%, #1d1d1b, #1d1d1b 50%, #d10a11 75%, #1d1d1b 75%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container style={{ width: '100%', maxWidth: '500px', padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <HelpdeskForm />
        </Container>
      </div>
    );
  }
}

