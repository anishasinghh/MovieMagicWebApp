import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile({ }) {
    const { username } = useParams();
    const [profile, setProfile] = useState({ username: "username", firstname: "first"});

    const findUserByUsername = async (username) => {
        console.log(username);
        const user = await client.findUserByUsername(username);
        console.log(user);
        setProfile(user);
    };

    useEffect(() => {
        if (username) {
            findUserByUsername(username);
        }
    }, [username]);

    return (
        <div>
            <h1 style={{color:"white"}}>{profile.username}'s Profile</h1>
            <h1>{profile.firstName}</h1>
            <h2>{profile.username}</h2>

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
          {profile.following.map((followedUser, index) => (
            <li key={index}>
              <Link to={`/profile/${followedUser}`}>{followedUser}</Link>
            </li>
          ))}
        </ul>
      </div>
        </div>  
    )
}

export default Profile



