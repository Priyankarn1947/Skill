import React, { useEffect, useState } from "react";
import API from "../api";

const SkillList = ({ token }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!token) return;
      try {
        const res = await API.get("/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(res.data);
      } catch (error) {
        console.error(
          "❌ Error fetching skills:",
          error.response?.data || error.message
        );
      }
    };
    fetchSkills();
  }, [token]);

  // --- Dark Green & Black Theme ---
  const darkBg = "#0D0D0D"; // almost black background
  const forestGreen = "#0B3D0B"; // rich dark green
  const neonGreen = "#00FF7F"; // glowing green accent
  const mintGlow = "#8FFFA3"; // lighter green highlight
  const lightText = "#E8FFE8"; // off-white text with green tint

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      background: `linear-gradient(135deg, ${darkBg}, ${forestGreen})`,
      color: lightText,
      fontFamily: "'Poppins', sans-serif",
      boxSizing: "border-box",
    },
    card: {
      width: "100%",
      maxWidth: "900px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "16px",
      padding: "28px",
      boxShadow: "0 12px 30px rgba(0, 255, 127, 0.15)",
      backdropFilter: "blur(8px)",
      boxSizing: "border-box",
      border: `1px solid ${neonGreen}`,
    },
    title: {
      color: neonGreen,
      fontSize: "26px",
      fontWeight: 600,
      marginBottom: "20px",
      textAlign: "center",
      letterSpacing: "0.8px",
      textShadow: `0 0 8px ${mintGlow}`,
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    listItem: {
      backgroundColor: "rgba(10, 30, 10, 0.75)",
      border: `1px solid ${mintGlow}`,
      borderRadius: "12px",
      padding: "16px",
      transition: "all 0.25s ease",
      boxShadow: "0 6px 15px rgba(0, 255, 127, 0.25)",
      cursor: "default",
    },
    listItemHover: {
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: `0 8px 20px rgba(0,255,127,0.35)`,
      borderColor: neonGreen,
      backgroundColor: "rgba(15, 50, 15, 0.85)",
    },
    skillName: {
      color: neonGreen,
      fontWeight: "600",
      fontSize: "17px",
      marginBottom: "5px",
    },
    category: {
      color: "rgba(200,255,200,0.85)",
      fontSize: "14px",
      marginBottom: "3px",
    },
    level: {
      fontSize: "13px",
      color: "#9EF7B3",
    },
    empty: {
      textAlign: "center",
      fontSize: "15px",
      color: "rgba(180,255,180,0.75)",
      marginTop: "25px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>All Skills</h2>

        {skills.length === 0 ? (
          <p style={styles.empty}>No skills found.</p>
        ) : (
          <ul style={styles.list}>
            {skills.map((s) => (
              <SkillCard key={s._id} skill={s} styles={styles} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const SkillCard = ({ skill, styles }) => {
  const [hover, setHover] = useState(false);
  return (
    <li
      style={{
        ...styles.listItem,
        ...(hover ? styles.listItemHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.skillName}>{skill.skillName}</div>
      <div style={styles.category}>Category: {skill.category}</div>
      <div style={styles.level}>Level: {skill.level}</div>
    </li>
  );
};

export default SkillList;
