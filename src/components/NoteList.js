import React, { useState, useEffect } from "react";
import { instance } from "../App";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    instance
      .get("/notes")
      .then((response) => setNotes(response.data.Notes))
      .catch((error) => console.error("Error fetching notes: ", error));
  }, []);
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
                <Button variant="danger">Delete</Button>{" "}
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default NoteList;
