import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(()=>{
      setAlert(null);
    },1000);
  }

  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} />
              <Route path='/signup' element={<Signup showAlert={showAlert} />} />
              <Route path='/' element={<Home showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
