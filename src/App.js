import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
