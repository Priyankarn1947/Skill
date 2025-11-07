import React, { useState } from "react";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    teachSkills: "",
    learnSkills: "",
  });

  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        ...formData,
        teachSkills: formData.teachSkills.split(",").map((s) => s.trim()),
        learnSkills: formData.learnSkills.split(",").map((s) => s.trim()),
      });
      console.log("✅ Registered successfully:", res.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error(
        "❌ Registration failed:",
        error.response?.data || error.message
      );
      alert(
        `Error registering user: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // --- Dark Green + Black Color Palette ---
  const blackBg = "#0B0C0B"; // pure black with slight green tint
  const darkGreen = "#0F3D0F"; // deep forest green
  const emerald = "#2ECC71"; // accent highlight
  const lightText = "#E6F4E6"; // soft white-green tone

  // --- Styles ---
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: `linear-gradient(135deg, ${blackBg}, ${darkGreen})`,
      fontFamily: "'Poppins', sans-serif",
    },
    form: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "40px 50px",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
      width: "350px",
      textAlign: "center",
    },
    heading: {
      color: emerald,
      fontSize: "28px",
      marginBottom: "25px",
      fontWeight: "600",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0",
      borderRadius: "8px",
      border: `1px solid ${emerald}`,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      color: lightText,
      outline: "none",
      fontSize: "15px",
      transition: "0.3s ease",
    },
    inputFocus: {
      borderColor: "#00FF7F",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      boxShadow: `0 0 10px ${emerald}`,
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      background: `linear-gradient(90deg, ${emerald}, ${darkGreen})`,
      border: "none",
      borderRadius: "8px",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s ease",
      letterSpacing: "0.5px",
    },
    buttonHover: {
      transform: "scale(1.03)",
      boxShadow: `0 4px 15px rgba(46, 204, 113, 0.6)`,
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.heading}>Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused("")}
          style={{
            ...styles.input,
            ...(focused === "name" ? styles.inputFocus : {}),
          }}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused("")}
          style={{
            ...styles.input,
            ...(focused === "email" ? styles.inputFocus : {}),
          }}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused("")}
          style={{
            ...styles.input,
            ...(focused === "password" ? styles.inputFocus : {}),
          }}
        />

        <input
          name="teachSkills"
          placeholder="Teach skills (comma separated)"
          value={formData.teachSkills}
          onChange={handleChange}
          onFocus={() => setFocused("teachSkills")}
          onBlur={() => setFocused("")}
          style={{
            ...styles.input,
            ...(focused === "teachSkills" ? styles.inputFocus : {}),
          }}
        />

        <input
          name="learnSkills"
          placeholder="Learn skills (comma separated)"
          value={formData.learnSkills}
          onChange={handleChange}
          onFocus={() => setFocused("learnSkills")}
          onBlur={() => setFocused("")}
          style={{
            ...styles.input,
            ...(focused === "learnSkills" ? styles.inputFocus : {}),
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
