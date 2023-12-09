import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile({ user, isLoggedIn }) {
  const { username } = useParams();
  const [profile, setProfile] = useState({ username: "username", firstname: "first", followers: [], following: [], role: "" });
  const [currentUser, setCurrentUser] = useState({ username: "username", firstname: "first", followers: [], following: [], role: "" });

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

  useEffect(() => {
    isLoggedIn();
    if (username) {
      findUserByUsername(username);
    }
  }, [username]);

  return (
    <div>
      <h1 style={{ color: "white" }}>{profile.username}'s Profile</h1>
      <h1 style={{ color: "white" }}>{profile.firstName}</h1>
      <h2 style={{ color: "white" }}>{profile.username}</h2>
      <h2 style={{ color: "white" }}>{profile.email}</h2>
      <h2 style={{ color: "white" }}>{profile.role}</h2>

      <div>
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

    </div>
  )
}

export default Profile



