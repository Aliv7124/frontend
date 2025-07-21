import React from 'react';
import noteContext from './Context/Notes/noteContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
const Noteitem = (props) => {
  const { note,updatenote} = props;
  const context = useContext(noteContext);
    const { deletenote } = context;
  return (

     <div className="col-md-3">
      <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{note.description}</h6>
     <FontAwesomeIcon icon={faEdit} className="mx-3" onClick={()=>{updatenote(note)}}style={{ cursor: 'pointer' }}/>
      <FontAwesomeIcon icon={faTrash} className="mx-3 "onClick={()=>{deletenote(note._id),  props.showAlert("Deleted successfully","success")}} style={{ cursor: 'pointer' }}/>
</div>
</div>
  </div>
  )
}

export default Noteitem
