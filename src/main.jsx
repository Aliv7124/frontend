import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import NoteState from './Context/Notes/noteState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NoteState>
  </React.StrictMode>
);

