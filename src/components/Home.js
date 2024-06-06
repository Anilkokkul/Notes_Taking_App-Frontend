import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NoteForm from "./NoteForm";
// import NoteList from "./NoteList";
import { useEffect, useState } from "react";

import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NoteList from "./NoteList";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    instance
      .get("/notes")
      .then((response) => setNotes(response.data.Notes))
      .catch((error) => console.error("Error fetching notes: ", error));
  };
  const handleEdit = (note) => {
    setSelectedNote(note);
  };

  const handleDelete = (id) => {
    try {
      instance
        .delete(`/notes/${id}`)
        .then((data) => {
          toast(data.data.message, {
            position: "top-center",
            theme: "dark",
            autoClose: 2000,
          });
          getNotes();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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
      <NoteForm
        getNotes={getNotes}
        editNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <NoteList />
      <ToastContainer />
    </>
  );
}

export default Home;
