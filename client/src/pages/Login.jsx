import React from 'react'
import "./pages.css"
import {Link} from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
const Login = () => {
  return (
    <div style={{backgroundColor:'rgb(50, 91, 128)'}}>
        <div className="cont ">
          <div className="box">
            <center>
            <h4 >LOGIN PAGE</h4>
            </center>
            
              <div className="email">
                  <span className="icons"><EmailIcon /></span>   <input type="email" placeholder="email" />
              </div>
              <div className="password">
             <span className="icons"><KeyIcon /> </span> <input type="password" placeholder="password" />
              </div>
              <center><button type="button" class="btn btn-outline-dark">login</button>
              </center>
              <div className="dont" style={{margin:'0.1rem'}}>
                <p>Don't Have an account ? <Link to="/Register"  > Register Now</Link> </p>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Login
