import React, { useState, useEffect } from "react";
import { instance } from "../App";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // console.log("Notes::::", notes);
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

  const filteredNotes = notes.filter((note) => {
    if (filterOption === "all") {
      return note.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        note.category === filterOption
      );
    }
  });

  return (
    <div>
      <h1>Notes11</h1>
      <div>
        <label>
          Filter by Category:
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="Task">Task</option>
            <option value="category2">Category 2</option>
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
