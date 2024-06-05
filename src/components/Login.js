import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function SignUp() {
  const data = { email: "", password: "" };
  const [user, setUser] = useState(data);
  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/login", user)
      .then((data) => {
        toast.success(data.data.message, {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        toast.warn(errorMessage, {
          position: "top-center",
        });
      });

    setUser({ ...user, email: "", password: "" });
  };

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
              <Link to={"/"} className=" text-decoration-none  text-black-50 ">
                Home
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Form className="signUp p-4" onSubmit={handleSubmit}>
        <h1>Log-In</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleUser}
            value={user.email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleUser}
            value={user.password}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to={"/signup"} className="m-1">
          Create Account
        </Link>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
