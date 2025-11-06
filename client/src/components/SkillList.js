import React, { useEffect, useState } from "react";
import API from "../api";

const SkillList = ({ token }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!token) return; // Skip if not logged in
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

  return (
    <div style={{ margin: "30px" }}>
      <h2>All Skills</h2>
      {skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <ul>
          {skills.map((s) => (
            <li key={s._id}>
              <b>{s.skillName}</b> ({s.category}) — {s.level}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillList;
