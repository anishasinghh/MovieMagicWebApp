import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./signin.css";
function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "", firstName: "", lastName: "", email: "", dob: ""
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="signInFormContainer">
      <h1 className="fw-light" style={{ color: "white", marginBottom: "30px" }}>Sign Up</h1>
      {error && <div>{error}</div>}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="username" style={{ color: "white" }}> Username </label>
        <input
          style={{ width: "300px" }}
          value={credentials.username}
          onChange={(e) => setCredentials({
            ...credentials,
            username: e.target.value
          })} />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="password" style={{ color: "white" }}> Password </label>
        <input
          style={{ width: "300px" }}
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials,
            password: e.target.value
          })} />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="firstName" style={{ color: "white" }}> First Name </label>
        <input
          style={{ width: "300px" }}
          value={credentials.firstName}
          onChange={(e) => setCredentials({
            ...credentials,
            firstName: e.target.value
          })} />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="lastName" style={{ color: "white" }}> Last Name </label>
        <input
          style={{ width: "300px" }}
          value={credentials.lastName}
          onChange={(e) => setCredentials({
            ...credentials,
            lastName: e.target.value
          })} />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="email" style={{ color: "white" }}> Email </label>
        <input
          style={{ width: "300px" }}
          value={credentials.email}
          onChange={(e) => setCredentials({
            ...credentials,
            email: e.target.value
          })} />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="dob" style={{ color: "white" }}> Date of Birth </label>
        <input type="date"
          style={{ width: "300px" }}
          value={credentials.dob}
          onChange={(e) => setCredentials({
            ...credentials,
            dob: e.target.value
          })} />
      </div>
      <br />
      <br />
      <button className="btn custom-purple-btn" onClick={signup}>
        Sign Up
      </button>
    </div>
  );
}
export default Signup;