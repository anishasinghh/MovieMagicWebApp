// import logo from './logo.svg';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
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
import HomeUser from './homeUser/homeUser';
import HomeMain from './homeMain';
import Profile from './users/profile';
import EditProfile from './users/editProfile';
import * as client from "./users/client";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "username", firstname: "first", followers: [], following: [], role: "" });

  const findCurrentUser = async () => {
    const current = await client.account();
    setCurrentUser(current);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // findCurrentUser();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [movie, setMovie] = useState({
    title: "New Movie", likes: "New Number",
    posterUrl: "New URL", id: 0, imdbID: "",
  });


  const [movies, setMovies] = useState([]);

  const [user, setUser] = useState({
    username: "New Username", firstName: "New First Name", followers: 0, liked_movies: []
  });

  const [users, setUsers] = useState([]);

  const [allUser, setAllUser] = useState({
    username: "New Username", firstName: "New First Name", followers: 0, role: "New Role", liked_movies: []
  });

  const [allUsers, setAllUsers] = useState([]);

  const handleUser = (allUser) => {
    setAllUser(allUser);
  };

  const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";


  const MOVIES_URL = `${API_BASE}/api/movies`

  const USERS_URL = `${API_BASE}/api/users`

  const USERS2_URL = `${API_BASE}/api/USERusers`

  const findAllUsers = async () => {
    console.log("in findAllUsers in app");
    // console.log(USERS_URL);
    const response = await axios.get(USERS_URL);
    setAllUsers(response.data);

    // setIsLoggedIn(true);
  };

  useEffect(() => {
    findAllUsers();
  }, []);

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
    console.log("in use effect find all movies")
    findAllMovies();
  }, []);

  // useEffect(() => {
  //   findMovieByIMDB();
  // }, []);



  return (

    <HashRouter>
      <div className="row">
        <div className="col-12">
          <NavBar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path='/'
              element={<HomeMain
                isLoggedIn={isLoggedIn}
                user={allUser}
                movies={movies}
                movie={movie}
                setMovie={setMovie}
                users={users}
                setUser={setUser} />}
            />
            <Route
              path="/home"
              element={<HomeMain
                isLoggedIn={isLoggedIn}
                user={allUser}
                movies={movies}
                movie={movie}
                setMovie={setMovie}
                users={users}
                setUser={setUser} />}
            />
            {/* {isLoggedIn ? (
              <Route path="/home" element={<HomeUser
                movies={movies}
                movie={movie}
                setMovie={setMovie}
                users={users}
                user={user}
                setUser={setUser}/>}  />
            ) : (
              <Route path="/home" element={<Home 
                movies={movies}
                movie={movie}
                setMovie={setMovie}
                users={users}
                user={user}
                setUser={setUser}/>} />
            )} */}
            {/* <Route path="/home" element={<Home isLoggedIn={isLoggedIn} handleLogin={handleLogin}
              movies={movies}
              movie={movie}
              setMovie={setMovie}
              users={users}
              user={user}
              setUser={setUser}/>} /> */}
            {/* <Route path="/signin" element={<Signin />} /> */}
            <Route
              path="/signin"
              element={<Signin onLogin={handleLogin} />}
            />
          <Route path="/signup" element={<Signup onLogin={handleLogin}/>} />
          <Route path="/search" element={<MovieList />} />
          <Route path="/details/:imdbId" element={<MovieDetails user={user} isLoggedIn={isLoggedIn}/>} />
          <Route path="/account" element={<Account onLogout={handleLogout} onSignIn={handleUser} />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/admin/users" element={<UserTable />} />
          <Route path="/editProfile/:username" element={<EditProfile />} />
          <Route path="/profile/:username" element={<Profile onSignIn={handleUser} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>} />
          
        </Routes>
      </div>
      </div>
    </HashRouter>
    


  );


}

export default App;