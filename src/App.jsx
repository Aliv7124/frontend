
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import Alert from './Alert';
import Home from './Home';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import NoteState from './Context/Notes/NoteState';

/*
function App() {
   const [alert, setAlert] = useState("light");
    const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1000);
  };

 
const Navigate=useNavigate();
 

 const token = localStorage.getItem('token');

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
          
            <Route
              path="/"
              element={token ? <Home showAlert={showAlert} /> : <Navigate to="/login" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
*/

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1000);
  };

  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </div>
    </>
  );
}
export default App;