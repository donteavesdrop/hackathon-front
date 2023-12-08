import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // New state for error message

  localStorage.removeItem("token");

  const handleLogin = async (e) => {
    e.preventDefault();

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
      localStorage.setItem("token", token);

      // редирект при успешном входе
      navigate("/tasks");
    } catch (error) {
      localStorage.removeItem("token");
      console.error("Login failed:", error);
      setError("Incorrect username or password"); 
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
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
