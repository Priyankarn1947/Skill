import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddSkill from './components/AddSkill';
import SkillList from './components/SkillList';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🟩 Dark Green + Black Theme
  const darkBg = "#0B0B0B";         // deep black
  const forestGreen = "#0B3D0B";    // rich dark green
  const neonGreen = "#00FF7F";      // glowing green accent
  const lightText = "#E8FFE8";      // soft greenish white

  const navStyle = {
    background: `linear-gradient(135deg, ${darkBg}, ${forestGreen})`,
    padding: "18px 40px",
    boxShadow: "0 4px 18px rgba(0, 255, 127, 0.25)",
    borderBottom: `1px solid rgba(0,255,127,0.3)`,
  };

  const ulStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "45px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    textDecoration: "none",
    color: lightText,
    fontWeight: "500",
    letterSpacing: "0.5px",
    fontSize: "17px",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.25s ease-in-out",
  };

  const linkHover = {
    backgroundColor: "rgba(0, 255, 127, 0.15)",
    color: neonGreen,
    transform: "translateY(-2px)",
    textShadow: `0 0 6px ${neonGreen}`,
  };

  return (
    <Router>
      <div>
        {/* Elegant Dark Green Navbar */}
        <nav style={navStyle}>
          <ul style={ulStyle}>
            {[
              { path: "/register", label: "Register" },
              { path: "/login", label: "Login" },
              { path: "/add-skill", label: "Add Skill" },
              { path: "/skills", label: "View Skills" },
            ].map((item, index) => (
              <NavItem key={index} to={item.path} label={item.label} baseStyle={linkStyle} hoverStyle={linkHover} />
            ))}
          </ul>
        </nav>

        {/* Routes */}
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

// Component for hover effect on navbar links
const NavItem = ({ to, label, baseStyle, hoverStyle }) => {
  const [hover, setHover] = useState(false);
  return (
    <li>
      <Link
        to={to}
        style={{
          ...baseStyle,
          ...(hover ? hoverStyle : {}),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {label}
      </Link>
    </li>
  );
};

export default App;
