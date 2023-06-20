/*import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import p1 from "../images/profile1.jpg"
const Profile = () => {
  return (
    
      
      <div className="container" style={{marginTop:'1rem'}}>
           
            <div className="box">
                <div className="profilepic" style={{display:'flex'}}>
                    <img src={p1}  style={{height:'6rem',width:'6rem',margin:'1rem'}}/>
                    <span> 
                        <div className="meta" style={{display:'flex',flexDirection:'row',padding:'2rem'}}>
                            <div className="i1">
                                <DeleteIcon />
                            </div>
                            <div className="i2">
                                <UpgradeIcon />
                            </div>
                        </div>
                    </span>
                </div>
                <center>
                <div className="username">
                  <input type="text" placeholder="username" />
                </div>
                <div className="email">
                        <input type="email" placeholder="email" />
                </div>
                <div className="password">
                     <input type="password" placeholder="password" />
                </div>
                </center>

            </div>
      </div>
   
  )
}

export default Profile
*/


import "./Profile.css";

import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
const api_base = "http://localhost:5000/api"
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`${api_base}/upload`, data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(`${api_base}/users/` + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
       
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          
        </div>
      </div>
      
    </div>
  );
}