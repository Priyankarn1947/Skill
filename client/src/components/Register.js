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
        `Error registering user: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        /><br />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        /><br />
        <input
          name="teachSkills"
          placeholder="Teach skills (comma separated)"
          value={formData.teachSkills}
          onChange={handleChange}
        /><br />
        <input
          name="learnSkills"
          placeholder="Learn skills (comma separated)"
          value={formData.learnSkills}
          onChange={handleChange}
        /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
