import React, { useState, useEffect } from "react";
import { instance } from "../App";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NoteList = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    instance
      .get("/notes")
      .then((response) => setNotes(response.data.Notes))
      .catch((error) => console.error("Error fetching notes: ", error));
  };

  const handleDelete = (id) => {
    try {
      instance
        .delete(`/notes/${id}`)
        .then((data) => {
          toast(data.data.message, {
            position: "top-center",
            theme: "dark",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    getNotes();
  };
  return (
    <div>
      <h1>Notes</h1>
      <div className="d-flex justify-content-center align-content-center gap-3 flex-wrap ">
        {notes &&
          notes.map((note, index) => (
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Button variant="success">Edit</Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(note._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default NoteList;
