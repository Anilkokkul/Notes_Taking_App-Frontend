import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NoteForm from "./NoteForm";
import { useState } from "react";

import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NoteList from "./NoteList";

function Home() {
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (note) => {
    setSelectedNote(note);
  };

  const handleLogout = () => {
    instance
      .get("/logout")
      .then((data) => {
        toast.success(data.data.message, {
          position: "top-center",
          autoClose: 2000,
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
      });
  };
  return (
    <>
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
            <Button variant="danger" className="mx-2" onClick={handleLogout}>
              LogOut
            </Button>{" "}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NoteForm editNote={selectedNote} setSelectedNote={setSelectedNote} />
      <NoteList handleEdit={handleEdit} />
      <ToastContainer />
    </>
  );
}

export default Home;
