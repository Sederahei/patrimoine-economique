import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function EnTete() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/patrimoine">Mon Patrimoine</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/patrimoine">Patrimoine</Nav.Link>
          <Nav.Link as={Link} to="/possession">Liste des Possessions</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default EnTete;
