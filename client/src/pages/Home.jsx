import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import "./pages.css"
import axios from "axios"
import demo1 from "../images/demo1.jpeg"
import ReactHtmlParser from 'react-html-parser';
import { useLocation } from "react-router";
import { useContext } from 'react'
import android from"../images/android.jpg"
import {Context} from "../Context/Context.js"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Home = () => {
  const api_base="https://blogwebsite-v0qg.onrender.com/api"
  const PF = "https://blogwebsite-v0qg.onrender.com/images/";
  const {user}=useContext(Context)
  const [data,setData]=useState([])
//console.log(user)
  const { search } = useLocation();
  



  useEffect(() =>{
//http://localhost:3000/?user=Sattwiki
   const fetchPosts=async()=>{
    const res=await axios.get(`${api_base}/posts/`+ search)
   //console.log(res.data)
    //categories array
    //createdAt / updatedAt/username/desc/title/photo
     setData(res.data)
   }
   //use clean up function doubt 
   fetchPosts()
  // return (()=>fetchPosts())
  
  },[search,data])


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

              <div className="post " id={i} key={i}>
                 
                        <div className="img">
                       <img src={PF + e.photo}  />
                       </div>
                       <div className="info">
                      
                         <h5 className="title">{e.title}</h5>
                         <div className="totalcover">
                        <h4 className="desc">{ReactHtmlParser(e.desc.substr(0,200))}...</h4>
                        <Link to={`/?user=${e.username}`}><h5 className="username">Author : {e.username}</h5></Link>   
                        <h5 className="date"> Updated: {new Date(e.updatedAt).toLocaleTimeString()} </h5>
                        <div className="categories">
                        {
                          e.categories.map((cat,i)=>
                          <div> <Link to={`/?cat=${cat}`}><div className="cat"> {cat} </div></Link></div>)
                        }
                        </div>
                       
                        
                        <Link to={`/post/${e._id}`}><button className="btn" onClick={async()=>{
                          console.log(e._id);
                          await axios.put(`${api_base}/posts/updateviews/${e._id}`)
                        }}>read more</button></Link>
                         </div>
                        <div className="stats">
                          <div className="views" >
                            <RemoveRedEyeIcon /> {e.views}
                          </div>
                          <div className="likes"  onClick={async()=>{
                          console.log(e._id);
                          await axios.put(`${api_base}/posts/updatelikes/${e._id}`)
                        }}>
                            <FavoriteIcon /> {e.likes}
                          </div>
                        </div>
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
          Joined Since :{user!=null?new Date(user?.createdAt).toLocaleTimeString():""}
        
        
        </div>
        
      </div>

      {/*<div className="Categories">
           <h4>Categories</h4>
           <div className="all">
           {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
           ))}
           </div>
      </div> */}
       

    </div>
    </div>
  )
}

export default Home
