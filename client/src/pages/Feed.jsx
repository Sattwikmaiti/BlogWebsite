
import React,{useState,useEffect} from "react";
import {useLocation,Link} from "react-router-dom"
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditNoteIcon from "@mui/icons-material/EditNote";
import demo1 from "../images/demo1.jpeg";
import axios from "axios"
import profile1 from "../images/profile1.jpg";
import {useContext} from "react"
import { Context } from "../Context/Context";
import Menu from "./Menu"
import "./Feed.css"
const Feed = () => {
  const {user}=useContext(Context)
  const PF = "http://localhost:5000/images/";
  const api_base="http://localhost:5000/api"
  const location=useLocation()
  const path=location.pathname.split("/")[2];
  //console.log(location.pathname.split("/")[2])
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${api_base}/posts/` + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    return (()=>{
      getPost();

    })
    
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api_base}/posts/${post._id}`,{data:{
        username:user.username
      }}
       )
     
      window.location.replace("/");
    } catch (err) {
     
      console.log(user.username === post.username)
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${api_base}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };
console.log(post)
  return (

    /*
    <div className="single " style={{ marginTop: "4rem" }}>
      <div className="content">
        <div className="fullpost">
          <div className="image">
            <img src={PF+post.photo} />
          </div>
          <div className="author">
            <div className="written">
              <div className="profilephoto">
                <img src={profile1} />
              </div>
              <div className="details">
                <div className="name">{post.username}</div>
                <div className="time">{post.createdAt}</div>
              </div>
            </div>
            {post.username===user?.username && ( <div className="iconsoption">
              <DeleteSweepIcon sx={{fontSize:'35px'}} onClick={handleDelete}/>
              <EditNoteIcon sx={{fontSize:'35px'}}  onClick={() => setUpdateMode(true)}/>
            </div>)}
           
          </div>
          <div className="description">
            <div className="title">{title}</div>
            <div className="writeup">
              {desc}
            </div>
          </div>
        </div>
      </div>
      <div className="menu"><Menu /></div>
    </div>*/

    <div className="singlePost">
    <div className="singlePostWrapper">
      {post.photo && (
        <img src={PF + post.photo} alt="" className="singlePostImg" />
      )}
      {updateMode ? (
        <input
          type="text"
          value={title}
          className="singlePostTitleInput"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <EditNoteIcon sx={{fontSize:'35px'}}  onClick={() => setUpdateMode(true)}/>
              <DeleteSweepIcon sx={{fontSize:'35px'}} onClick={handleDelete}/>
            </div>
          )}
        </h1>
      )}
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Author:
          <Link to={`/?user=${post.username}`} className="link">
            <b> {post.username}</b>
          </Link>
        </span>
        <span className="singlePostDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      {updateMode ? (
        <textarea
          className="singlePostDescInput"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      ) : (
        <p className="singlePostDesc">{desc}</p>
      )}
      {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>
          Update
        </button>
      )}
    </div>
  </div>
  );
};

export default Feed;
