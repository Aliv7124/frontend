import React, { useContext, useState } from 'react';
import noteContext from './Context/Notes/noteContext';





function Addnote(props) {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault();
    if (note.title.length < 3 || note.description.length < 5) {
      props.showAlert("Title or description too short", "warning");
      return;
    }
    addnote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully", "success");
    setNote({ title: '', description: '', tag: '' }); // Clear fields
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h3>Add a Note</h3>
      <form className="my-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
}

export default Addnote;