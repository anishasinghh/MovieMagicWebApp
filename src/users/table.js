import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil }
  from "react-icons/bs";
import { Link } from "react-router-dom";
import "./table.css"


function UserTable() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <h1 style={{ color: "white" }}>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <tr>
            <td>
              <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </td>
            <td>
              <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
            </td>
            <td>
              <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            </td>
            <td>
              <select className="dropdown" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>

              </select>
            </td>
            <td className="text-nowrap">
              <BsFillCheckCircleFill onClick={updateUser}
                className="me-2 text-success fs-1 text" />
              <BsPlusCircleFill onClick={createUser}
                className="text-success fs-1 text" />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link className="no-underline" to={`/account/${user._id}`}>{user.username}</Link></td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button className="btn button me-2"><BsPencil style={{ color: 'yellow' }} onClick={() => selectUser(user)} /></button>
              </td>
              <td>
                <button className="btn button me-2" onClick={() => deleteUser(user)}><BsTrash3Fill style={{ color: 'red' }} /></button>
              </td>

            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;