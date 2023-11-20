import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function SignUp() {
  const data = { name: "", email: "", password: "" };
  const navigate = useNavigate();
  const [user, setUser] = useState(data);
  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/register", user)
      .then((data) => {
        toast.success(data.data.message, {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        toast.warn(errorMessage, {
          position: "top-center",
        });
        if (
          errorMessage === "An account is already registered with your email"
        ) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });

    setUser({ ...user, name: "", email: "", password: "" });
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
      <Form className="signUp p-4 " onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={handleUser}
            name="name"
            value={user.name}
            required
          />
        </Form.Group>
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
        <Link to={"/login"} className="mx-2">
          Login
        </Link>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
