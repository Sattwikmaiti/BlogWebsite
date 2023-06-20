import React,{useState,useEffect} from 'react'
import "./pages.css"
import {Link} from "react-router-dom"
import axios from "axios"
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
const api_base="http://localhost:5000/api"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${api_base}/auth/register`, {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div>
        <div style={{backgroundColor:'rgb(50, 91, 128)'}}>
        <div className="cont reg">
          <div className="box">
            <center>
            <h4 >Register</h4>
            </center>
            <div className="user">
                  <span className="icons"><AccountCircleIcon/></span>   <input  required type="text" placeholder="username"   onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="email">
                  <span className="icons"><EmailIcon /></span>   <input  required type="email" placeholder="email"   onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="password">
             <span className="icons"><KeyIcon /> </span> <input  required type="password" placeholder="password"   onChange={(e) => setPassword(e.target.value)} />
              </div>
              <center><button type="button" class="btn btn-outline-dark" onClick={handleSubmit}>Register</button>
              </center>

              <div className="dont" style={{margin:'0.1rem'}}>
                <p>Do  Have an account ? <Link to="/Login"  > Login</Link> </p>
              </div>
              {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
          </div>
        </div>
    </div>
    </div>
  )
}

export default Register
