import React from 'react';
import HomeAdmin from "./homeAdmin/homeAdmin";
import HomeUser from "./homeUser/homeUser";
import Home from "./home/home";

function HomeMain({ isLoggedIn, user, movies, movie, setMovie, users, setUser }) {
  console.log(isLoggedIn);
  console.log(user);
    if (isLoggedIn) {
      if (user.role === "ADMIN") {
          console.log(user);
          console.log(user.role);
          console.log(user.username);
        return <HomeAdmin isLoggedIn={isLoggedIn} user={user} movies={movies} movie={movie} setMovie={setMovie} users={users} setUser={setUser} />;
      } else if (user.role === "USER") {
        console.log(user);
        console.log(user.role);
        console.log(user.username);
        return <HomeUser isLoggedIn={isLoggedIn} user={user} movies={movies} movie={movie} setMovie={setMovie} users={users} setUser={setUser} />;
      }
    }
    console.log(user);
    console.log(user.role);
    console.log(user.username);
    return <Home isLoggedIn={isLoggedIn} user={user} movies={movies} movie={movie} setMovie={setMovie} users={users} setUser={setUser}/>;
  }
  
  export default HomeMain;