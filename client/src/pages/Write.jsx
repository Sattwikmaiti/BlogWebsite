import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useContext} from "react";

import axios from "axios";
import { Context } from "../Context/Context";

const Write = () => {

  
  const api_base="http://localhost:5000/api"
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`${api_base}/upload`, data);
      } catch (err) {}
    }
    try {
      const res = await axios.post(`${api_base}/posts`, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="container" style={{marginTop:'10rem',backgroundColor:'white',borderRadius:'10px'}}>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt=""  style={{height:'25rem',width:'25rem'}}/>
      )}
         <div className="add">
          <div className="contents">
          <div className="value">
             <div className="input">
                 <input type='text' value={title} placeholder="Enter Title Here" style={{width:'100%',height:'3rem'}}  onChange={e=>setTitle(e.target.value)}/>
                 </div>
                 <div className="descriptions" >
            <textarea  type="textarea" value={desc}  onChange={e=>setDesc(e.target.value)} placeholder='Enter Your Description' style={{height:'20rem',overFlow:'scroll',border:'2px solid black',width:'50rem'}} />
            </div>
             </div>
            <div className="titled">
                 
                 <div className="steps">
                 
                  <div className="save">
                  <Button variant="contained" color="success" onClick={handleSubmit}>
        Publish
      </Button>
                  </div>
                 
                  
                  <div className="imagefile">
                    <input type="file"   style={{height:'3rem'}}  onChange={(e) => setFile(e.target.files[0])}/>

                  </div>
                  <div className="categories">
              
              <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          label="Age"
          
        >
          <MenuItem value={"art"}>Art</MenuItem>
          <MenuItem value={"science"}>Science</MenuItem>
          <MenuItem value={"education"}>Education</MenuItem>
        </Select>
      </FormControl>
    </Box>
            </div>
            
                 </div>
                   

                
            </div>
           
            
            
          </div>
         </div>
      
    </div>
  )
}

export default Write
