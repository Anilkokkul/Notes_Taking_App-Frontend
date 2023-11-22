import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">My Notes App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
            </Nav>
            <Link to={"/login"}>
              <Button variant="success" className="mx-2">
                LogIn
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button variant="primary" className="mx-2">
                SignUp
              </Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <div className="Intro">
        <h3>Welcome to MyNotesApp!</h3>
        <p>
          This is a simple web application where you can create, edit and delete
          your notes.
        </p>
        <img src="/notes.png" alt="notes"></img>
      </div>
    </div>
  );
}

export default Landing;
