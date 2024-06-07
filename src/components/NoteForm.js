import React, { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function NoteForm({ editNote, setSelectedNote }) {
  const data = useMemo(() => ({ title: "", content: "", type: "task" }), []);
  const selectedNote = useMemo(() => editNote, [editNote]);
  const [note, setNote] = useState(data);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedNote) {
      setNote(selectedNote);
    } else {
      setNote(data);
    }
  }, [selectedNote, data]);

  const handleUser = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.type === "") {
      return alert("Please select type");
    }
    const apiEndpoint = selectedNote
      ? `/notes/${selectedNote._id}`
      : "/notes   ";
    instance
      .request({
        method: selectedNote ? "put" : "post",
        url: apiEndpoint,
        data: note,
      })
      .then((data) => {
        toast(data.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setSelectedNote(null);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        toast.warn(errorMessage, {
          position: "top-center",
          autoClose: 2000,
        });
        if (errorMessage === "Not Authenticated need to login") {
          navigate("/login");
        }
      });
    setNote(data);
  };
  return (
    <div>
      <Form className="noteForm" onSubmit={handleSubmit}>
        <h1>{selectedNote ? "Edit Note" : "Create Note"}</h1>
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
          <option defaultValue="idea">idea</option>
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
