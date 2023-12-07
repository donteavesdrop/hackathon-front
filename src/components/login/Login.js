import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    try {
      console.log("Attempting login with username:", username, "and password:", password);

      const loginResponse = await axios.post("http://localhost:8080/login", null, {
        params: {
          username,
          password,
        },
      });
      

      console.log("Login response:", loginResponse.data);

      const token = loginResponse.data;
      // Store the token in localStorage or a state management system
      localStorage.setItem("token", token);

      // Redirect to another page after successful login
      navigate("/tasks");
    } catch (error) {
      localStorage.removeItem("token");
      console.error("Login failed:", error);
      // Handle login error, show a message, or redirect to an error page
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div className="login-field">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
