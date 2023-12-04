// import logo from './logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Signin from './users/signin';
import Signup from './users/signup';
import Account from './users/account';
import UserTable from './users/table';
import NavBar from './nav/nav';
import MovieList from './search/movieList';
import MovieDetails from './details/movieDetails';

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
          <Route path="/search" element={<MovieList />} />
          <Route path="/details/:imdbId" element={<MovieDetails />} />
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