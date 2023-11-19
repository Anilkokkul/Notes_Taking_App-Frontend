import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NoteForm() {
  const data = { title: "", content: "", type: "" };
  const [note, setNote] = useState(data);

  const handleUser = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note);
    if (note.type === "") {
      return alert("Please select type");
    }
    instance
      .post("/notes", note)
      .then((data) => {
        toast.success(data.data.message, {
          position: "top-center",
        });
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        toast.warn(errorMessage, {
          position: "top-center",
        });
      });
  };
  return (
    <div>
      <Form className="noteForm" onSubmit={handleSubmit}>
        <h1>Create Note</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={handleUser}
            value={note.title}
            name="title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Write your note here"
            style={{ height: "100px" }}
            onChange={handleUser}
            value={note.content}
            name="content"
            required
          />
        </Form.Group>
        <Form.Label>Type:</Form.Label>
        <Form.Select
          className="mb-2"
          aria-label="Default select"
          onChange={handleUser}
          value={note.type}
          name="type"
          required
        >
          <option value="idea">idea</option>
          <option value="reminder">reminder</option>
          <option value="task">task</option>
          <option value="important">important</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default NoteForm;
