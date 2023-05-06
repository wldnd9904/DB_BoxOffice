import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand href="#home">서울씨네마</Navbar.Brand>
      <Nav className="me-auto"> 
        <Nav.Link as={Link} to={'home'}>Home</Nav.Link>
        <Nav.Link as={Link} to={'seats'}>Seats</Nav.Link>
        <Nav.Link as={Link} to={'home'}>Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default Header;

