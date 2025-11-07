import React, { useState } from "react";
import API from "../api";

const AddSkill = ({ token }) => {
  const [formData, setFormData] = useState({
    skillName: "",
    category: "",
    level: "",
    description: "",
  });
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await API.post("/skills", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Skill added:", res.data);
      alert("Skill added successfully!");
      setFormData({ skillName: "", category: "", level: "", description: "" });
    } catch (error) {
      console.error(
        "❌ Error adding skill:",
        error.response?.data || error.message
      );
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // --- Dark Green + Black Palette (matching Login/Register) ---
  const blackBg = "#0B0C0B";
  const darkGreen = "#0F3D0F";
  const emerald = "#2ECC71";
  const lightText = "#E6F4E6";

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      boxSizing: "border-box",
      background: `linear-gradient(135deg, ${blackBg}, ${darkGreen})`,
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "720px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "16px",
      padding: "28px",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(8px)",
      color: lightText,
      boxSizing: "border-box",
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "18px",
    },
    title: {
      margin: 0,
      color: emerald,
      fontSize: "22px",
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
    // 🔥 Vertical layout only
    formGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginTop: "6px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: `1px solid ${emerald}`,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      color: lightText,
      outline: "none",
      fontSize: "14px",
      transition: "0.3s",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#00FF7F",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      boxShadow: `0 0 10px ${emerald}`,
    },
    textarea: {
      minHeight: "110px",
      resize: "vertical",
      padding: "12px",
      borderRadius: "10px",
      border: `1px solid ${emerald}`,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      color: lightText,
      outline: "none",
      fontSize: "14px",
      transition: "0.3s",
      boxSizing: "border-box",
      lineHeight: "1.4",
    },
    button: {
      padding: "12px 18px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "15px",
      background: `linear-gradient(90deg, ${emerald}, ${darkGreen})`,
      color: "#fff",
      transition: "0.25s ease",
      letterSpacing: "0.3px",
    },
    buttonHover: {
      transform: "translateY(-2px) scale(1.03)",
      boxShadow: `0 6px 18px rgba(46,204,113,0.45)`,
    },
    note: {
      marginTop: "10px",
      fontSize: "13px",
      color: "rgba(230,244,230,0.85)",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <h3 style={styles.title}>Add Skill</h3>
          <div style={{ fontSize: 13, color: "rgba(230,244,230,0.85)" }}>
            Protected • Token required
          </div>
        </div>

        <form onSubmit={handleAddSkill}>
          <div style={styles.formGrid}>
            <input
              name="skillName"
              placeholder="Skill name"
              value={formData.skillName}
              onChange={handleChange}
              onFocus={() => setFocused("skillName")}
              onBlur={() => setFocused("")}
              style={{
                ...styles.input,
                ...(focused === "skillName" ? styles.inputFocus : {}),
              }}
            />

            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              onFocus={() => setFocused("category")}
              onBlur={() => setFocused("")}
              style={{
                ...styles.input,
                ...(focused === "category" ? styles.inputFocus : {}),
              }}
            />

            <input
              name="level"
              placeholder="Level (e.g., Beginner, Intermediate)"
              value={formData.level}
              onChange={handleChange}
              onFocus={() => setFocused("level")}
              onBlur={() => setFocused("")}
              style={{
                ...styles.input,
                ...(focused === "level" ? styles.inputFocus : {}),
              }}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              onFocus={() => setFocused("description")}
              onBlur={() => setFocused("")}
              style={{
                ...styles.textarea,
                ...(focused === "description" ? styles.inputFocus : {}),
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <div style={styles.note}>
              Use clear, comma-separated tags in description for searchability.
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(hover ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
