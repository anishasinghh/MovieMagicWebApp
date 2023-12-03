import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import  "./signin.css";
function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
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
      <h1 style={{color:"white", marginBottom:"30px"}}>Sign Up</h1>
      {error && <div>{error}</div>}
      <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      <label for = "username" style={{color:"white"}}> Username </label>
      <input
        style={{width:"300px"}}
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value })} />
      </div>
      <br/>
      <br/>
      <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      <label for = "password" style={{color: "white"}}> Password </label>
      <input
        style={{width:"300px"}}
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })} />
      </div>
      <br/>
      <br/>
      <button className="btn custom-purple-btn" onClick={signup}>
        Sign Up
      </button>
    </div>
  );
}
export default Signup;