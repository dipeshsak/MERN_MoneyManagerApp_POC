import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChartLine,faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const NavigationBar = () => {

    const navigate = useNavigate();
  

  const onLogoutHandler=()=>{
    localStorage.clear();
    navigate('/login')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Money Manager App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Add Expense
              </Nav.Link> */}
              <Nav.Link href="#analytics">
                <FontAwesomeIcon icon={faChartLine} /> Analytics
              </Nav.Link>
              <Nav.Link href="#logout" onClick={onLogoutHandler}>
                <FontAwesomeIcon icon={faUser} /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
