const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const jwt=require("jsonwebtoken")
const JWT_SEC="mysecretkey101"
//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {

  const {token}=req.body
  
  const user = jwt.verify(token,JWT_SEC)

    const post = await Post.findById(req.params.id);
    if (post.username === user.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




router.put("/updatelikes/:id", async (req, res) => {
  
    const todo = await Post.findOneAndUpdate({_id: req.params.id},{new:true});
   todo.likes+=1;

      todo.save();
    
      res.json(todo);


});

router.put("/updateviews/:id", async (req, res) => {
  
  const post = await Post.findOneAndUpdate({_id: req.params.id},{new:true});
 post.views+=1;
 
    post.save();
  
    res.json(post);


});



//DELETE POST
router.delete("/:id", async (req, res) => {
  console.log("delete")
  try {
    const {token}=req.body
  //console.log(token)
  const user = jwt.verify(token,JWT_SEC)
  console.log(user)
  // header, payload, signature = token.split('.')

//Decode the Base64Url-encoded payload
// decoded_payload = jwt.utils.base64url_decode(payload.encode('utf-8')).decode('utf-8')
  
// //Parse the JSON
// payload_data = jwt.utils.json_loads(decoded_payload)
// console.log(payload_data)
    const post = await Post.findById(req.params.id);
    //console.log(req.body.username)
    if (post.username === user.username) {
     
      try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        console.log(`You can delete only your post! `)
        res.status(500).json(`You can delete only your post! `);
      }
    } else {
    
      res.status(401).json(`You can delete only your post! `);
    }
  } catch (err) {
  
    res.status(500).json(`You can delete only your post!`);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ?user=john&?cat=music
router.get("/", async (req, res) => {
    //query looks for ? in router.get("/")
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        //from categories array ...if inside it ..includes catname ...
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        // no category name no username ...fetch all posts 
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;