import Signin from "./users/signin";
import UserTable from "./users/table";
import { Routes, Route, Navigate } from "react-router-dom";
// import Nav from "./nav";
import Account from "./users/account";
import Signup from "./users/signup";
import NavBar from "./nav/nav";
import MovieDetails from "./details/movieDetails";
function Components() {
  return (
    <div className="row">
      <div className="col-10">
        <NavBar/>
        <Routes>
          
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/admin/users" element={<UserTable />} />
        </Routes>
      </div>
    </div>
  );
}
export default Components;