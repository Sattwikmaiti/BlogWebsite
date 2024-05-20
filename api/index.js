const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const cloudinary = require('cloudinary').v2
const cors=require("cors");
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
 app.use(cors())
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
   
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const storagenew = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});
const uploadnew = multer({ storage: storagenew });

app.post('/api/electron/upload', uploadnew.single('file'), (req, res) => {

  res.json({ message: 'File uploaded successfully', filename: req.file.filename,fileSize:req.file.size });
});


app.post('/api/electron/uploadCloud',async (req, res) => {
 
  console.log("Upload")
      // Configuration
      cloudinary.config({ 
          cloud_name: "dfg4vmqky", 
          api_key: "938192236274369", 
          api_secret: "u4TdIqJlotzG9y7Bf8NbF17YCro" // Click 'View Credentials' below to copy your API secret
      });
      
      console.log("here")
      // Upload an image
      const uploadResult = await cloudinary.uploader.upload(req.file, {
          public_id: req.file.filename
      }).catch((error)=>{console.log(error) ; res.status(500).json("Error"); } );
      
      console.log(uploadResult);

      res.status(200).json(uploadResult);
      
      // Optimize delivery by resizing and applying auto-format and auto-quality
        

  
});



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});