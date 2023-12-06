import { React, useState } from "react";
import "./homeUser.css"

function HomeUser(
    { movies, movie, setMovie, users, user, setUser }
    ) {  
    
    const sortedUsers = [...users].sort((a, b) => (b.followers ? b.followers.length : 0) - (a.followers ? a.followers.length : 0));
    const top4Users = sortedUsers.slice(0, 4);
    
    return (
      <div className="container-fluid">
        <div className="row row-title">
          <div className="col-12 top-title">
            Hi {user.firstName}!
            <hr className="top-line" />
            <h3 className="your-lm">Your Liked Movies</h3>
            
            
          </div>
        </div>
        <div className="row row-dashboard flex-row flex-wrap d-flex">
        {user.liked_movies.map((likedMovieId) => {
          const likedMovie = movies.find((movie) => movie.id === likedMovieId);

          if (likedMovie) {
            return (
              <div key={likedMovie._id} className="col-12 col-md-6 col-xl-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={likedMovie.posterUrl} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{likedMovie.title}</h5>
                    <p className="card-text">Likes: {likedMovie.likes}</p>
                  </div>
                </div>
              </div>
            );
          }
          return null; 
        })}
      </div>
       

        <div className="row row-title">
          <div className="col-12 top-title">
            <h3 className="fl">Follower Suggestions</h3>
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
        </div>
      </div>
    );
  }
  
  export default HomeUser;