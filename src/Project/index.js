import Signin from "../Project/users/signin";
import UserTable from "../Project/users/table";
import { Routes, Route, Navigate } from "react-router-dom";
// import Nav from "./nav";
import Account from "../Project/users/account";
import Signup from "./users/signup";
import NavBar from "./nav/nav";
function Project() {
  return (
    <div className="row">
      <div className="col-10">
        <NavBar/>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/project/home" />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/admin/users" element={<UserTable />} />
        </Routes>
      </div>
    </div>
  );
}
export default Project;