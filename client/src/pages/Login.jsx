import React from 'react'
import "./pages.css"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import { useContext, useRef } from "react";

import { Context } from "../Context/Context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
const Login = () => {
  const navigate=useNavigate()
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
const api_base="http://localhost:5000/api"
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${api_base}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      navigate('/')
      console.log("Logged in Successfully")
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log("Failure in Successfully")
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div style={{backgroundColor:'rgb(50, 91, 128)'}}>
        <div className="cont ">
          <div className="box">
            <center>
            <h4 >LOGIN PAGE</h4>
            </center>
            
              <div className="email">
                  <span className="icons"><AccountCircleIcon/></span>   <input type="email" placeholder="username" ref={userRef}/>
              </div>
              <div className="password">
             <span className="icons"><KeyIcon /> </span> <input type="password" placeholder="password" ref={passwordRef}/>
              </div>
              <center><button type="button" class="btn btn-outline-dark"   disabled={isFetching} onClick={handleSubmit}>login</button>
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
