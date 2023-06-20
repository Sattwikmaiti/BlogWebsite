import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import "./pages.css"
import axios from "axios"
import demo1 from "../images/demo1.jpeg"

import { useLocation } from "react-router";
import { useContext } from 'react'

import {Context} from "../Context/Context.js"

const Home = () => {
  const api_base="http://localhost:5000/api"
  const PF = "http://localhost:5000/images/";
  const {user}=useContext(Context)
  const [data,setData]=useState([])
//console.log(user)
  const { search } = useLocation();
  
  useEffect(() =>{
//http://localhost:3000/?user=Sattwiki
   const fetchPosts=async()=>{
    const res=await axios.get(`${api_base}/posts/`+ search)
    console.log(res.data)
    //categories array
    //createdAt / updatedAt/username/desc/title/photo
     setData(res.data)
   }
   //use clean up function doubt 
   fetchPosts()
  // return (()=>fetchPosts())
  
  },[search])


  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${api_base}/categories/`);
      setCats(res.data);
    };
    
    return (()=>getCats())
  }, [cats]);

  return (
    <div className="section">

    
    <div className="posts">
      
        {
        data.map((e,i)=>
          {
            return (

              <div className="post " id={i}>
                 
                        <div className="img">
                       <img src={PF + e.photo}  />
                       </div>
                       <div className="info">
                      
                         <h5 className="title">{e.title}</h5>
                        <h4 className="desc">{e.desc.substr(0,100)}</h4>
                        <Link to={`/?user=${e.username}`}><h5 className="username">Author : {e.username}</h5></Link>   
                        <h5 className="date"> Updated: {new Date(e.updatedAt).toLocaleTimeString()} </h5>
                        <div className="categories">
                        {
                          e.categories.map((cat,i)=>
                          <div> <Link to={`/?cat=${cat}`}><div className="cat"> {cat} </div></Link></div>)
                        }
                        </div>
                        
                        <Link to={`/post/${e._id}`}><button className="btn">read more</button></Link>
                        </div>


              </div>
            )
          })
        }
      
        
         

      
    </div>
    <div className="aboutme">
      

      <div className="name">
        <div className="div">
        {user?.username}
        </div>
        
        <div className="div">
        {user?.email}
        </div>
        <div className="div">
        Since {user?.createdAt}
        </div>
        
      </div>

      <div className="Categories">
           <h4>Categories</h4>
           <div className="all">
           {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
           </div>
      </div>
       

    </div>
    </div>
  )
}

export default Home
