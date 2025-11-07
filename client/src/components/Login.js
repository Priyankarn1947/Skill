import React, { useState } from "react";
import API from "../api";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [hover, setHover] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      if (setToken) setToken(res.data.token);
      alert("✅ Login successful!");
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // --- Dark Green + Black Palette ---
  const blackBg = "#0B0C0B"; // pure black base
  const darkGreen = "#0F3D0F"; // forest green
  const emerald = "#2ECC71"; // highlight green
  const lightText = "#E6F4E6"; // soft green-white

  // --- Inline styles ---
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: `linear-gradient(135deg, ${blackBg}, ${darkGreen})`,
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    },
    form: {
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: "36px 44px",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.8)",
      backdropFilter: "blur(10px)",
      width: "360px",
      textAlign: "center",
    },
    heading: {
      color: emerald,
      fontSize: "26px",
      marginBottom: "22px",
      fontWeight: "600",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "9px 0",
      borderRadius: "8px",
      border: `1px solid ${emerald}`,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: lightText,
      outline: "none",
      fontSize: "15px",
      transition: "0.25s ease",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#00FF7F",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      boxShadow: `0 0 10px ${emerald}`,
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "16px",
      background: `linear-gradient(90deg, ${emerald}, ${darkGreen})`,
      border: "none",
      borderRadius: "8px",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s ease",
      letterSpacing: "0.4px",
    },
    buttonHover: {
      transform: "scale(1.03)",
      boxShadow: `0 4px 15px rgba(46,204,113,0.5)`,
    },
    smallNote: {
      color: "rgba(230,244,230,0.85)",
      fontSize: "13px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
          style={{
            ...styles.input,
            ...(focusedInput === "email" ? styles.inputFocus : {}),
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("")}
          style={{
            ...styles.input,
            ...(focusedInput === "password" ? styles.inputFocus : {}),
          }}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>

        <div style={styles.smallNote}>
          Enter your credentials to access your account
        </div>
      </form>
    </div>
  );
};

export default Login;
