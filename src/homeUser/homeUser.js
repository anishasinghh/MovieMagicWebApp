import { React, useState } from "react";

function HomeUser(
    { movies, movie, setMovie, users, user, setUser }
    ) {  
    const sortedMovies = [...movies].sort((a, b) => b.likes - a.likes);
        
    const top4Movies = sortedMovies.slice(0, 4);

    // const sortedUsers = [...users].sort((a, b) => (b.followers ? b.followers.length : 0) - (a.followers ? a.followers.length : 0));
    // const top4Users = sortedUsers.slice(0, 4);
    
    return (
      <div className="container-fluid">
        <div className="row row-title">
          <div className="col-12 top-title">
            Top Movies of 2023
            <hr className="top-line" />
            
            
          </div>
        </div>
        
        <div className="row row-dashboard flex-row flex-wrap d-flex">
        
  
          {top4Movies.map((movie) => (
            <div key={movie._id} className="col-12 col-md-6 col-xl-3">
              <div className="card" style={{ width: "18rem" }}>
                <img src={movie.posterUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Likes: {movie.likes}</p>
              
                </div>
              </div>
            </div>
          ))}
        </div>
{/* 
        <div className="row row-title">
          <div className="col-12 top-title">
            Top Movie Magic Users
            <hr className="top-line" />
            
            
          </div>
        </div>
        
        <div className="row row-dashboard flex-row flex-wrap d-flex">
        
  
          {top4Users.map((user) => (
            <div key={user._id} className="col-12 col-md-6 col-xl-3">
              <div className="card" style={{ width: "18rem" }}>
                <img src="/images/purple.png" className="card-img-top" alt="..." />
                <div className="card-body card-user">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">{user.followers ? user.followers.length : 0} Followers</p>
              
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    );
  }
  
  export default HomeUser;