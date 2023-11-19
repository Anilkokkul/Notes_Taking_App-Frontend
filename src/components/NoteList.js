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
      {notes &&
        notes.map((note) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <Button variant="success">Edit</Button>{" "}
              <Button variant="danger">Delete</Button>{" "}
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default NoteList;
