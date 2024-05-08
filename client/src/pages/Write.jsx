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
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import { Context } from "../Context/Context";

const Write = () => {

  
  const api_base="https://blogwebsite-v0qg.onrender.com/api"
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
const [categories,setCategories] = useState([])
const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setCategories(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories
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
   
  
<>

 {user ? (<div>  <div className="container" style={{marginTop:'10rem',backgroundColor:'white',borderRadius:'10px'}}>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt=""  style={{height:'25rem',width:'25rem'}}/>
      )}
         <div className="add">
          
          <div className="contents">
          <div className="value">
             <div className="input">
                 <input type='text' value={title} placeholder="Enter Title Here" style={{width:'100%',height:'3rem'}}  onChange={e=>setTitle(e.target.value)} />
                 </div>
                 <div className="descriptions" >
            <ReactQuill theme="snow" value={desc}  onChange={(value)=>{console.log(ReactHtmlParser(value));setDesc((value))}} placeholder='Enter Your Description' style={{height:'40rem',overFlow:'scroll',border:'2px solid black',width:'50rem'}} />
            </div>
             </div>
            <div className="titled">
                 
                 <div className="steps">
                 
                  <div className="save">
                    {
                      title!=null && desc!=null && file!=null && categories.length>0 && (  <Button variant="contained" color="success" onClick={handleSubmit}>
                      Publish
                    </Button>)
                    }
                


    
                  </div>
                 
                  
                  <div className="imagefile">
                    <input type="file"   style={{height:'3rem'}}  onChange={(e) => setFile(e.target.files[0])}/>

                  </div>
                  <div className="categories">
              
              <Box sx={{ minWidth: 40 }}>
      <FormControl fullWidth style={{width:'10rem'}}>
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
        <Select
           labelId="demo-multiple-name-label"
           id="demo-multiple-name"
           multiple
          label="Age"
          value={categories}
          onChange={handleChange}
          
        >
          <MenuItem value={"Art"}>Art</MenuItem>
          <MenuItem value={"Science"}>Science</MenuItem>
          <MenuItem value={"Technology"}>Technology</MenuItem>
          <MenuItem value={"Cinema"}>Cinema</MenuItem>
          <MenuItem value={"Design"}>Design</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>

        </Select>
      </FormControl>
    </Box>
            </div>
            
                 </div>
                   

                
            </div>
           
            
            
          </div>
         </div>
      
    </div></div>):(<div className="logtowrite">Login to Write</div>)}
    </>            
  )
}

export default Write
