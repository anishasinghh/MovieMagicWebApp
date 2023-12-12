import * as client from "./client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./profile.css"

function Profile({ movies, onLogout, onSignIn, isLoggedIn }) {
  const { username } = useParams();
  const [profile, setProfile] = useState({ username: "username", firstname: "first", followers: [], following: [], liked_movies: [], rewatched_movies: [], role: "" });
  const [currentUser, setCurrentUser] = useState({ username: "username", firstname: "first", followers: [], following: [], role: "" });
  const navigate = useNavigate();



  const findUserByUsername = async (username) => {
    console.log(username);
    const foundUser = await client.findUserByUsername(username);
    setProfile(foundUser);
    // setAppCurrentUser(foundUser);
    const current = await client.account();
    console.log("current username: " + current.username);
    setCurrentUser(current);
    // console.log(foundUser)
    console.log(currentUser);
    onSignIn(current);

  };

  const handleFollowButtonClick = async (usernameToAdd, currentUserName) => {
    try {
      // Check if the current user is already following the profile user
      const isFollowing = profile.followers.includes(currentUserName);

      if (isFollowing) {
        // If already following, unfollow
        await client.removeFollowing(usernameToAdd, currentUserName);
      } else {
        // If not following, follow
        await client.addFollowing(usernameToAdd, currentUserName);
      }

      // Optionally, update the state or trigger a re-fetch of the user profile 
      findUserByUsername(username);

    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  const signout = async () => {
    console.log(currentUser);
    await client.signout();
    onLogout();
    setCurrentUser({ username: "username", firstname: "first", followers: [], following: [], role: "" })
    console.log(currentUser);
    navigate("/signin");
  };

  useEffect(() => {
    isLoggedIn();
    if (username) {
      findUserByUsername(username);
    }
  }, [username]);



  return (
    <div className='row'>

      <div class='col-3'>
        <img className="align-self-end" src="../userIcon.png" alt="..." style={{ width: '275px', height: '275px' }} />
        <div>
          <h2 className="FollowerFollowingHeader">Followers</h2>
          <ul >
            {profile.followers.map((follower, index) => (
              <li key={index}>
                <Link className="FollowerFollowingList" to={`/profile/${follower}`}>{follower}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="FollowerFollowingHeader">Following</h2>
          <ul>
            {profile.following.map((following, index) => (
              <li key={index}>
                <Link className="FollowerFollowingList" to={`/profile/${following}`}>{following}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>



      <div class='col-9 '>

        <div className="row">
          <div className="col-md-2">
            <h2 className="name">{profile.firstName}</h2>
          </div>
          <div className="col-md-2 ">
            {currentUser.firstName === profile.firstName && (
              <div style={{ color: "white" }}>
                <Link to={`/editProfile/${currentUser.username}`}>
                  <button className="edit float-end">edit profile</button>
                </Link>
              </div>
            )}
          </div>

          {currentUser.firstName === profile.firstName && (
            <div className="col-md-2 ">
              <button className='edit float-right' onClick={signout}>
                sign out
              </button>
            </div>
          )}
          {/* <div className="col-md-1"> */}
          {currentUser.firstName !== profile.firstName && (
            <div className="col-md-2">
              <button className='edit float-left' onClick={() => handleFollowButtonClick(profile.username, currentUser.username)}>
                {profile.followers.includes(currentUser.username) ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          )}
          {/* </div> */}

        </div>
        <div className="row">
          <div className="col-4">
            <h2 className="followerFollowing">{profile.followers.length} Followers</h2>
          </div>
          <div className="col-4">
            <h2 className="followerFollowing">{profile.following.length} Following</h2>
          </div>
        </div>
        <h2 className="username">{profile.username}</h2>
        {currentUser.role === "ADMIN" && (
          <div className="col-md-3">
            <Link to="/admin/users" className="manage" >
              manage users
            </Link>
          </div>
        )}
        {(profile.followers.includes(currentUser.username) || (profile.username === currentUser.username)) && (


          <div className="container-fluid">
            <div className="row row-title">
              <div className="col-12 top-title">
                <hr className="top-line" />
                <h3 className="your-lm">Liked Movies</h3>


              </div>
            </div>
            <div className="row row-dashboard flex-row flex-wrap d-flex">
              {profile.liked_movies.map((likedMovieId) => {
                const likedMovie = movies.find((movie) => movie.id === likedMovieId);

                if (likedMovie) {
                  return (
                    <div key={likedMovie._id} className="col-12 col-md-6 col-xl-3">
                      <div className="card" style={{ width: "18rem" }}>
                        <img src={likedMovie.posterUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{likedMovie.title}</h5>
                          <p className="card-text">Likes: {likedMovie.likes}</p>

                          <button class="btn btn-outline-dark" >
                            <Link to={`/details/${likedMovie.imdbID}`} className="dtext">
                              Details
                            </Link>
                          </button>


                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}


        <div>
        </div>
      </div>



      {/* <div>
          <h2 style={{ color: "white" }}>Followers:</h2>
          <ul style={{ color: "white" }}>
            {profile.followers.map((follower, index) => (
              <li key={index}>
                <Link to={`/profile/${follower}`}>{follower}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 style={{ color: "white" }}>Following:</h2>
          <ul style={{ color: "white" }}>
            {profile.following.map((following, index) => (
              <li key={index}>
                <Link to={`/profile/${following}`}>{following}</Link>
              </li>
            ))}
          </ul>
        </div>
        <h2 style={{ color: "white" }}>{currentUser.firstName}</h2>
        <h2 style={{ color: "white" }}>{currentUser.username}</h2>
        <h2 style={{ color: "white" }}> {profile.username}</h2>
        <div>
          {currentUser.firstName !== profile.firstName && (
            <div>
              <button onClick={() => handleFollowButtonClick(profile.username, currentUser.username)}>
                {profile.followers.includes(currentUser.username) ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          )}
        </div>
        <h2 style={{ color: "white" }}>
          {currentUser.role}
        </h2>
        {currentUser.role === "ADMIN" && (
          <div style={{ color: "white" }}>
            <Link to="/admin/users" className="btn btn-warning ">
              Manage Users
            </Link>
          </div>
        )}

        {currentUser.firstName === profile.firstName && (
          <div style={{ color: "white" }}>
            <Link to={`/editProfile/${currentUser.username}`}>
              <button className="btn btn-secondary">Edit Profile</button>
            </Link>
          </div>
        )}

       
        */}
    </div >
  )
}

export default Profile



