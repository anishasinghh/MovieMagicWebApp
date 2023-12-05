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
import axios from "axios";
import react, { useEffect } from "react";
import { useState } from "react";
import Home from './home/home';

function App() { 
  const [movie, setMovie] = useState({
    title: "New Movie",      likes: "New Number",
    posterUrl: "New URL",
  });

  const [movies, setMovies] = useState([]);

  const [user, setUser] = useState({
    username: "New Username", followers: 0
  });

  const [users, setUsers] = useState([]);


  const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000/api";
  
  
  const MOVIES_URL = `${API_BASE}/movies`

  const USERS2_URL = `${API_BASE}/USERusers`

  const findAllUSERUsers = async () => {
    console.log(USERS2_URL);
    const response = await axios.get(USERS2_URL);
    setUsers(response.data);
  };
  useEffect(() => {
    findAllUSERUsers();
  }, []);

  const findAllMovies = async () => {
    console.log(MOVIES_URL);
    const response = await axios.get(MOVIES_URL);
    setMovies(response.data);
  };
  useEffect(() => {
    findAllMovies();
  }, []);


  return (
    <HashRouter>
         <div className="row">
        <div className="col-12">
        <NavBar/>
        <Routes>
        <Route path="/home" element={<Home
              movies={movies}
              movie={movie}
              setMovie={setMovie}
              users={users}
              user={user}
              setUser={setUser}/>} />
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