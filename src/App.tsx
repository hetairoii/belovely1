import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SurprisePage from './components/SurprisePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surprise/:id" element={<SurprisePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;