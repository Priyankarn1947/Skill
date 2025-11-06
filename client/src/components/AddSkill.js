import React, { useState } from "react";
import API from "../api";

const AddSkill = ({ token }) => {
  const [formData, setFormData] = useState({
    skillName: "",
    category: "",
    level: "",
    description: "",
  });

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
    } catch (error) {
      console.error("❌ Error adding skill:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h2>Add Skill</h2>
      <form onSubmit={handleAddSkill}>
        <input
          name="skillName"
          placeholder="Skill name"
          value={formData.skillName}
          onChange={handleChange}
        /><br />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        /><br />
        <input
          name="level"
          placeholder="Level"
          value={formData.level}
          onChange={handleChange}
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        /><br />
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};

export default AddSkill;
