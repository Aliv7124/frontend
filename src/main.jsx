import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import NoteState from './Context/Notes/NoteState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteState>
      <BrowserRouter  basename="/frontend">
        <App />
      </BrowserRouter>
    </NoteState>
  </React.StrictMode>
);

