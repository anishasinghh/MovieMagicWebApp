import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile({ user, isLoggedIn }) {
  const { username } = useParams();
  const [profile, setProfile] = useState({ username: "username", firstname: "first", followers: [], following: [], role: "" });
  const [currentUser, setCurrentUser] =  useState({ username: "username", firstname: "first", followers: [], following: [], role: "" });

  const findUserByUsername = async (username) => {
    console.log(username);
    const foundUser = await client.findUserByUsername(username);
    setProfile(foundUser);
    const current = await client.account();
    setCurrentUser(current);
    console.log(foundUser)
    console.log(currentUser);
  };

  const handleFollowButtonClick = async (usernameToAdd, currentUserName) => {
    try {
      await client.addFollowing(usernameToAdd, currentUserName);
      console.log('added follower')
      // Optionally, update the state or trigger a re-fetch of the user profile 
    } catch (error) {
      console.error('Error following user on:', error);
      console.log(usernameToAdd)
      console.log(currentUserName)

    }
  };

  useEffect(() => {
    if (username) {
      findUserByUsername(username);
    }
  }, [username]);

  return (
    <div>
      <h1 style={{ color: "white" }}>{profile.username}'s Profile</h1>
      <h1>{profile.firstName}</h1>
      <h2>{profile.username}</h2>
      <h2>{profile.email}</h2>
      <h2>{profile.role}</h2>

      <div>
        <h2>Followers:</h2>
        <ul>
        {profile.followers.map((follower, index) => (
            <li key={index}>
              <Link to={`/profile/${follower}`}>{follower}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Following:</h2>
        <ul>
        {profile.following.map((following, index) => (
            <li key={index}>
              <Link to={`/profile/${following}`}>{following}</Link>
            </li>
          ))}
        </ul>
      </div>
      <h2>{currentUser.firstName}</h2>
      <h2>{currentUser.username}</h2>
      <h2>{profile.username}</h2>
      <div>
      {currentUser.firstName !== profile.firstName && (
        <div>
          <button onClick={() => handleFollowButtonClick(profile.username, currentUser.username)}>
            Follow
          </button>
        </div>
      )}
      </div>
      <h2>
        {currentUser.role}
      </h2>
      {currentUser.role === "ADMIN" && (
        <div className="text-center mt-3">
          <Link to="/admin/users" className="btn btn-warning ">
            Manage Users
          </Link>
        </div>
      )}

    </div>
  )
}

export default Profile



