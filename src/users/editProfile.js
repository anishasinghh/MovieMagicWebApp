import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as client from "./client";
import "./editProfile.css"

function EditProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState({ username: "", firstName: "", email: "" });

  const fetchUserProfile = async () => {
    try {
      const user = await client.findUserByUsername(username);
      setProfile(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the updated profile details to the server
      await client.updateUserDetail(profile);
      console.log("user updated");
      // Optionally, redirect to the profile page or update the state
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div>
      <h1 className="heading" >Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username: 
          <input type="text" name="username" value={profile.username} readOnly />
        </label>
        <br />
        <label>
          First Name: 
          <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email: 
          <input type="text" name="email" value={profile.email} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
      <br />
      <Link to={`/profile/${username}`} style={{ textDecoration: 'none', color: '#CF9FFF', fontSize: 20, paddingLeft: 60}}>Back to Profile</Link>
    </div>
  );
}

export default EditProfile;
