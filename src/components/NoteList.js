import React, { useState, useEffect } from "react";
import { instance } from "../App";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteList = ({ handleEdit }) => {
  const [notes, setNotes] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getNotes();
  }, [notes]);

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
          getNotes(); // Refresh notes after deletion
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter((note) => {
    if (filterOption === "all") {
      return note.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        note.type === filterOption
      );
    }
  });

  return (
    <div>
      <h1>Notes</h1>
      <div className=" d-flex justify-content-center align-items-center gap-2 p-2">
        <label>
          Filter by Category:
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="form-select p-2"
          >
            <option value="all">All</option>
            <option value="task">Task</option>
            <option value="idea">Idea</option>
            <option value="reminder">Reminder</option>
            <option value="important">Important</option>
          </select>
        </label>
        <br />
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </label>
      </div>
      <div className="d-flex justify-content-center align-content-center gap-3 flex-wrap">
        {filteredNotes.map((note, index) => (
          <Card style={{ width: "18rem" }} key={index}>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {note.type}
              </Card.Subtitle>
              <Card.Text>{note.content}</Card.Text>
              <Button variant="success" onClick={() => handleEdit(note)}>
                Edit
              </Button>{" "}
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
