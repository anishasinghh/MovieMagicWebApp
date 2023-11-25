// import logo from './logo.svg';
import './App.css';
import Project from './Project';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Signin from './Project/users/signin';
import Signup from './Project/users/signup';
import Account from './Project/users/account';
import UserTable from './Project/users/table';
import NavBar from './Project/nav/nav';

function App() { 
  return (
    <HashRouter>
         <div className="row">
        <div className="col-12">
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
    </HashRouter>
);


}

export default App;