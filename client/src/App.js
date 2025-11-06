import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddSkill from './components/AddSkill';
import SkillList from './components/SkillList';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <Router>
      <div>
        <nav>
          <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/add-skill">Add Skill</Link></li>
            <li><Link to="/skills">View Skills</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/add-skill" element={<AddSkill token={token} />} />
          <Route path="/skills" element={<SkillList token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;