import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const SignIn = async () => {
    await client.signin(credentials);
    navigate("/account");
  };
  return (
    <div style={{marginLeft:"500px"}}>
      <h1>Sign In</h1>
      <br/> 
      <input style={{width:"300px"}} value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <br/>
      <br/>
      <input style={{width:"300px"}}  value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <br/>
      <br/>
      <button className="btn btn-success" onClick={SignIn}> Signin </button>
    </div>
  );
}
export default Signin;