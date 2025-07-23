
import React from "react";
import { useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host ="https://inotebook-backend-3o0e.onrender.com";

  const [notes, setNotes] = useState([]);

  // Get all notes
  const getnote = async () => {
    try {
      console.log("Token used for fetch:", localStorage.getItem('token'));

      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const json = await response.json();
      if (!response.ok) {
        console.error("Fetch failed:", json?.error || response.status);
        return setNotes([]);
      }

      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Expected array from backend, got:", json);
        setNotes([]);
      }
    } catch (error) {
      console.error("Fetch notes error:", error.message);
    }
   };
  // Edit note
  const editnote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
      
   const newNotes = notes.map(note =>
          note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };
// Add note
const addnote = async (title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    setNotes(prevNotes => [...prevNotes, newNote]);
  } catch (error) {
    console.error("Error adding note:", error.message);
  }
};

// Delete note
const deletenote = async (id) => {
  try {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (response.ok) {
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } else {
      console.error("Delete failed");
    }
  } catch (error) {
    console.error("Error deleting note:", error.message);
  }
};
  

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;




