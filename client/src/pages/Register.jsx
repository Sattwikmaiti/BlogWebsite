import React from 'react'
import "./pages.css"
import {Link} from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Register = () => {
  return (
    <div>
        <div style={{backgroundColor:'rgb(50, 91, 128)'}}>
        <div className="cont reg">
          <div className="box">
            <center>
            <h4 >Register</h4>
            </center>
            <div className="user">
                  <span className="icons"><AccountCircleIcon/></span>   <input  required type="text" placeholder="username" />
              </div>
              <div className="email">
                  <span className="icons"><EmailIcon /></span>   <input  required type="email" placeholder="email" />
              </div>
              <div className="password">
             <span className="icons"><KeyIcon /> </span> <input  required type="password" placeholder="password" />
              </div>
              <center><button type="button" class="btn btn-outline-dark">Register</button>
              </center>

              <div className="dont" style={{margin:'0.1rem'}}>
                <p>Do  Have an account ? <Link to="/Login"  > Login</Link> </p>
              </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Register
