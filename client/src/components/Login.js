import React, { useState } from "react";
import API from "../api";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

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

  return (
    <div style={{ margin: "30px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
