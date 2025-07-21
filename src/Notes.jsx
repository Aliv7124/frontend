import React, { useContext, useEffect,useState } from 'react';
import noteContext from './Context/Notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getnote,editnote } = context;
const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
const ref = useRef(null);
const refClose = useRef(null);

  const navigate = useNavigate();
const handleClick = () => {
  editnote(note.id, note.etitle, note.edescription, note.etag);
  refClose.current.click();
  props.showAlert("Note updated successfully", "success");
};

const handleChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      props.showAlert("Please login first", "warning");
      navigate("/login");
    } else {
      getnote();
    }
  }, []);
const updatenote = (currentNote) => {
  
  setNote({
    id: currentNote._id,
    etitle: currentNote.title,
    edescription: currentNote.description,
    etag: currentNote.tag
  });
   ref.current.click(); 
};

  return (
    <>
      <Addnote showAlert={props.showAlert} />
    
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
  Launch edit modal
</button>

<div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">Description</label>
            <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

{/* Your Notes Section */}
<div className="row my-3">
  <h2>Your Notes</h2>
  {notes.length === 0 && <div className="container">No notes to display</div>}
  {notes.map((note) => (
    <Noteitem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert} />
  ))}
</div>

    </>
  );
}

export default Notes;



