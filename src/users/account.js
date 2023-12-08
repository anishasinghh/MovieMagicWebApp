import * as client from "./client";
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Account({ onLogout, onSignIn }) {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  

  const navigate = useNavigate();
  const save = async () => {
    await client.updateUser(account);
  };
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    onSignIn(account);
    
  };
  const signout = async () => {
    await client.signout();
    onLogout();
    
    navigate("/signin");
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);

  
  return (
    <div className="w-50" style={{marginLeft:"500px"}}>
      <h1>Account</h1>
      {account && (
        <div>
          <input style={{marginBottom:"20px"}} value={account.password}
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>
            <br/>
          <input style={{marginBottom:"20px"}} value={account.firstName}
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/>
               <br/>
          <input style={{marginBottom:"20px"}} value={account.lastName}
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/>
               <br/>
          <input style={{marginBottom:"20px"}} type = "date" value={account.dob} 
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value })}/>
               <br/>
          <input style={{marginBottom:"20px"}} value={account.email}
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/>
               <br/>
          <select style={{marginBottom:"20px"}} onChange={(e) => setAccount({ ...account,
              role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            
          </select>
          <br/>
          <button className = "btn btn-primary" onClick={save}>
            Save
          </button>
          <Link to = "/admin/users" className="btn btn-warning ">
            Users
          </Link>
          <br/>
          <br/>
          <button className = "btn btn-danger" onClick={signout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
export default Account;