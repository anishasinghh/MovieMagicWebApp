import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

function Signin({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const SignIn = async () => {
    await client.signin(credentials);
    onLogin();
    navigate("/account");
  };
  return (
    <div className="signInFormContainer">
      <h1 className="fw-light" style={{ color: "white" }}>Sign In</h1>
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="username" style={{ color: "white" }}> Username </label>
        <input id="username" style={{ width: "300px" }} value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label for="password" style={{ color: "white" }}> Password </label>
        <input id="password" style={{ width: "300px" }} value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      </div>
      <br />
      <br />
      <button className="btn custom-purple-btn" onClick={SignIn}>Sign In</button>
    </div>

  );
}
export default Signin;